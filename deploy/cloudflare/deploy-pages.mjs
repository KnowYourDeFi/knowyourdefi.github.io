/*
 * 文件说明: 加载本地发布凭据，使用项目 Wrangler 将构建产物发布到 Pages。
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const frontend = fileURLToPath(new URL('../../frontend/', import.meta.url));
process.loadEnvFile(`${frontend}.env`);
for (const key of ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_PAGES_BRANCH']) {
  if (!process.env[key]) throw new Error(`Missing ${key} in frontend/.env`);
}
execFileSync(fileURLToPath(new URL('./node_modules/.bin/wrangler', import.meta.url)), [
  'pages', 'deploy',
  '--branch', process.env.CLOUDFLARE_PAGES_BRANCH,
], { cwd: fileURLToPath(new URL('./', import.meta.url)), stdio: 'inherit' });
