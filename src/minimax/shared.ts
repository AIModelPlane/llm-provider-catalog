import { QuotaWindow } from '../types';

// ---------------------------------------------------------------------------
// MiniMax token plan quota parsing
// API: GET /v1/token_plan/remains
// Auth: Authorization: Bearer {key}
//
// Response structure (per model entry):
//   current_interval_remaining_percent  — remaining% for 5h window (remaining, NOT used)
//   current_weekly_remaining_percent    — remaining% for 1w window
//   current_interval_total_count        — total tokens (0 = unlimited)
//   current_interval_usage_count        — tokens used
//   current_weekly_total_count / current_weekly_usage_count
//   end_time / weekly_end_time          — ms epoch timestamps
//
// Shared by minimax-coding-global, minimax-coding-china.
// ---------------------------------------------------------------------------

interface MinimaxModelRemain {
  model_name?: string;
  current_interval_remaining_percent?: number;
  current_weekly_remaining_percent?: number;
  current_interval_total_count?: number;
  current_interval_usage_count?: number;
  current_weekly_total_count?: number;
  current_weekly_usage_count?: number;
  end_time?: number; // ms epoch
  weekly_end_time?: number; // ms epoch
  [key: string]: unknown;
}

export function parseMinimaxQuotas(json: Record<string, unknown>): {
  '5h'?: QuotaWindow;
  '1w'?: QuotaWindow;
} {
  const remains = (json.model_remains ?? json.modelRemains) as
    MinimaxModelRemain[] | undefined;
  if (!Array.isArray(remains) || remains.length === 0) return {};

  // Prefer 'general' model entry; fall back to first
  const item = remains.find((r) => r.model_name === 'general') ?? remains[0];

  const result: { '5h'?: QuotaWindow; '1w'?: QuotaWindow } = {};

  const intervalRemainingPct = item.current_interval_remaining_percent;
  if (intervalRemainingPct !== undefined) {
    result['5h'] = minimaxPercentWindow(
      intervalRemainingPct,
      item.current_interval_total_count,
      item.current_interval_usage_count,
      item.end_time,
    );
  }

  const weeklyRemainingPct = item.current_weekly_remaining_percent;
  if (weeklyRemainingPct !== undefined) {
    result['1w'] = minimaxPercentWindow(
      weeklyRemainingPct,
      item.current_weekly_total_count,
      item.current_weekly_usage_count,
      item.weekly_end_time,
    );
  }

  return result;
}

// MiniMax returns remaining%, so usedPct = 100 - remainingPct.
// total_count=0 means unlimited — omit absolute values in that case.
function minimaxPercentWindow(
  remainingPct: number,
  total?: number,
  used?: number,
  resetEpochMs?: number,
): QuotaWindow {
  const usedPct = 100 - remainingPct;
  const hasAbsolute = total !== undefined && total > 0;
  return {
    total: hasAbsolute ? total! : (undefined as any),
    used: hasAbsolute ? (used ?? 0) : (undefined as any),
    remaining: hasAbsolute ? total! - (used ?? 0) : (undefined as any),
    usagePercent: usedPct,
    resetAt: resetEpochMs ? new Date(resetEpochMs).toISOString() : undefined,
  };
}
