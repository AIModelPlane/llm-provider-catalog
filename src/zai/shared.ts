import { ProviderUsageResult, QuotaWindow } from '../types';

// ---------------------------------------------------------------------------
// Z.ai / GLM quota parsing
// API: GET /api/monitor/usage/quota/limit
// Auth: Authorization: {key}  (no Bearer prefix)
// The public OpenAPI spec does not expose a currency balance endpoint. This
// monitor endpoint returns rolling quota windows used by the Z.ai dashboard.
// Shared by zai, zhipu, zai-coding, zhipu-coding.
// ---------------------------------------------------------------------------

interface ZaiLimit {
  type: 'TOKENS_LIMIT' | 'TIME_LIMIT';
  unit: number; // 3 = hours, 6 = weeks
  number: number; // quantity of units (5 for 5h, 1 for 1w)
  usage?: number; // total quota — omitted by API when percentage=0
  currentValue?: number; // amount used — omitted by API when percentage=0
  remaining?: number; // remaining — omitted by API when percentage=0
  percentage: number; // used percentage 0-100
  nextResetTime?: number; // ms epoch
  usageDetails?: { modelCode: string; usage: number }[];
}

interface ZaiQuotaResponse {
  code: number;
  msg?: string;
  data?: { limits?: ZaiLimit[] };
  success: boolean;
}

export async function fetchZaiQuotas(
  apiKey: string,
  endpoint: string,
  provider: string,
): Promise<ProviderUsageResult> {
  const res = await fetch(endpoint, {
    headers: {
      Authorization: apiKey,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return {
      ok: false,
      provider,
      error: `HTTP ${res.status}`,
    };
  }

  const json = (await res.json()) as ZaiQuotaResponse;
  if (!json.success) {
    return {
      ok: false,
      provider,
      error:
        json.msg ?? `Quota query failed${json.code ? ` (${json.code})` : ''}`,
    };
  }

  const limits = json.data?.limits;
  if (!Array.isArray(limits)) {
    return {
      ok: false,
      provider,
      error: 'Invalid quota response',
    };
  }

  return {
    ok: true,
    provider,
    quotas: parseZaiQuotas(limits),
  };
}

export function parseZaiQuotas(limits: ZaiLimit[]): {
  '5h'?: QuotaWindow;
  '1w'?: QuotaWindow;
} {
  const result: { '5h'?: QuotaWindow; '1w'?: QuotaWindow } = {};

  for (const limit of limits) {
    if (limit.type !== 'TOKENS_LIMIT') continue;
    const window = toZaiQuotaWindow(limit);
    // unit=3 (hours), number=5 → 5-hour window
    if (limit.unit === 3 && limit.number === 5) {
      result['5h'] = window;
    }
    // unit=6 (weeks), number=1 → 1-week window
    if (limit.unit === 6 && limit.number === 1) {
      result['1w'] = window;
    }
  }

  return result;
}

function toZaiQuotaWindow(limit: ZaiLimit): QuotaWindow {
  // When usage=0%, the API omits absolute numbers — build a percent-only window
  const hasAbsolute =
    limit.usage !== undefined &&
    limit.currentValue !== undefined &&
    limit.remaining !== undefined;
  return {
    total: hasAbsolute ? limit.usage! : (undefined as any),
    used: hasAbsolute ? limit.currentValue! : (undefined as any),
    remaining: hasAbsolute ? limit.remaining! : (undefined as any),
    usagePercent: limit.percentage,
    resetAt: limit.nextResetTime
      ? new Date(limit.nextResetTime).toISOString()
      : undefined,
  };
}
