# densanken.com

CCS の公式サイト（[https://densanken.com](https://densanken.com)）のリポジトリです。

## セットアップ

[mise](https://mise.jdx.dev/getting-started.html) を使用することを推奨します。

使用しない場合は次のツールをインストールしてください。

- Node.js ([.nvmrc](./.nvmrc) に記載のバージョン)
- [corepack](https://github.com/nodejs/corepack#readme)

```bash
# mise セットアップ
mise trust
mise install

# pnpm セットアップ (mise を使用している場合は不要)
corepack enable

# 依存関係インストール
pnpm i

# 開発サーバー起動
pnpm dev
```
