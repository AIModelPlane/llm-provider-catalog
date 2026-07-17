/**
 * Real-API usage tests — requires tests/live/.usage-creds.json with actual API
 * keys. Copy .usage-creds.json.example → .usage-creds.json and fill in the
 * keys. Individual cases are skipped (not failed) if their key is missing.
 *
 * Not run by default `npm test` / CI — invoke explicitly via
 * `npm run test:live`.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { getCatalogProvider } from '../../src/index';

const credsPath = join(__dirname, '.usage-creds.json');
const creds: Record<string, string> = existsSync(credsPath)
  ? JSON.parse(readFileSync(credsPath, 'utf8'))
  : {};

function withKey(keyField: string, fn: (key: string) => Promise<void>) {
  return async () => {
    const key = creds[keyField];
    if (!key) {
      console.log(`  skipped — no ${keyField} in .usage-creds.json`);
      return;
    }
    await fn(key);
  };
}

describe('provider fetchUsage — live API', () => {
  jest.setTimeout(15000);

  it(
    'openai: attempts balance query (unofficial endpoint, may 403 for project keys)',
    withKey('openai', async (key) => {
      const cat = getCatalogProvider('openai')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log('openai usage:', JSON.stringify(result, null, 2));
      // Unofficial endpoint — 403 is expected for org/project API keys
      if (result.ok) {
        expect(result.balance).toBeDefined();
        expect(typeof result.balance!.remaining).toBe('number');
      } else {
        expect(result.error).toBeDefined();
      }
    })
  );

  it(
    'openrouter: returns balance with remaining credit',
    withKey('openrouter', async (key) => {
      const cat = getCatalogProvider('openrouter')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log('openrouter usage:', JSON.stringify(result, null, 2));
      expect(result.ok).toBe(true);
      expect(result.balance).toBeDefined();
      expect(typeof result.balance!.remaining).toBe('number');
      expect(result.balance!.currency).toBe('USD');
    })
  );

  it(
    'novita-ai: returns balance in USD',
    withKey('novita_ai', async (key) => {
      const cat = getCatalogProvider('novita-ai')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log('novita-ai usage:', JSON.stringify(result, null, 2));
      expect(result.ok).toBe(true);
      expect(result.balance).toBeDefined();
      expect(typeof result.balance!.remaining).toBe('number');
      expect(result.balance!.currency).toBe('USD');
    })
  );

  it(
    'zai-coding: returns 5h and/or 1w quota windows',
    withKey('zai_coding', async (key) => {
      const cat = getCatalogProvider('zai-coding')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log('zai-coding usage:', JSON.stringify(result, null, 2));
      expect(result.ok).toBe(true);
      expect(result.quotas).toBeDefined();
      const has5h = result.quotas?.['5h'] !== undefined;
      const has1w = result.quotas?.['1w'] !== undefined;
      expect(has5h || has1w).toBe(true);
      // API omits absolute values when usage=0%; only usagePercent is guaranteed
      if (has5h)
        expect(typeof result.quotas!['5h']!.usagePercent).toBe('number');
      if (has1w)
        expect(typeof result.quotas!['1w']!.usagePercent).toBe('number');
    })
  );

  it(
    'zhipu-coding: returns quota windows',
    withKey('zhipu_coding', async (key) => {
      const cat = getCatalogProvider('zhipu-coding')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log('zhipu-coding usage:', JSON.stringify(result, null, 2));
      expect(result.ok).toBe(true);
      expect(result.quotas).toBeDefined();
    })
  );

  it(
    'minimax-coding-global: returns 5h and 1w quota windows',
    withKey('minimax_coding_global', async (key) => {
      const cat = getCatalogProvider('minimax-coding-global')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log(
        'minimax-coding-global usage:',
        JSON.stringify(result, null, 2)
      );
      expect(result.ok).toBe(true);
      expect(result.quotas).toBeDefined();
      const has5h = result.quotas?.['5h'] !== undefined;
      const has1w = result.quotas?.['1w'] !== undefined;
      expect(has5h || has1w).toBe(true);
      if (has5h)
        expect(typeof result.quotas!['5h']!.usagePercent).toBe('number');
      if (has1w)
        expect(typeof result.quotas!['1w']!.usagePercent).toBe('number');
    })
  );

  it(
    'minimax-coding-china: returns quota windows',
    withKey('minimax_coding_china', async (key) => {
      const cat = getCatalogProvider('minimax-coding-china')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log(
        'minimax-coding-china usage:',
        JSON.stringify(result, null, 2)
      );
      expect(result.ok).toBe(true);
      expect(result.quotas).toBeDefined();
    })
  );

  it(
    'deepseek: returns balance in CNY',
    withKey('deepseek', async (key) => {
      const cat = getCatalogProvider('deepseek')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log('deepseek usage:', JSON.stringify(result, null, 2));
      expect(result.ok).toBe(true);
      expect(result.balance).toBeDefined();
      expect(typeof result.balance!.remaining).toBe('number');
      expect(typeof result.balance!.currency).toBe('string'); // USD or CNY depending on account
    })
  );

  it(
    'zai: does not support usage query (no public balance API for pay-as-you-go accounts)',
    withKey('zai', async () => {
      const cat = getCatalogProvider('zai')!;
      expect(cat.fetchUsage).toBeDefined();
      await expect(cat.fetchUsage!('any-key')).rejects.toThrow(
        'zai does not support usage query'
      );
    })
  );

  it(
    'zhipu: returns quota windows',
    withKey('zhipu', async (key) => {
      const cat = getCatalogProvider('zhipu')!;
      expect(cat.fetchUsage).toBeDefined();
      const result = await cat.fetchUsage!(key);
      console.log('zhipu usage:', JSON.stringify(result, null, 2));
      expect(result.provider).toBe('Zhipu / BigModel (China)');
      if (result.ok) {
        expect(result.quotas).toBeDefined();
      } else {
        expect(result.error).toBeDefined();
      }
    })
  );
});
