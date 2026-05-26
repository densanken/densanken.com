# densanken.com

CCS の公式サイト（[https://densanken.com](https://densanken.com)）のリポジトリです。

## セットアップ

[mise](https://mise.jdx.dev/getting-started.html) を使用することを推奨します。

### 1-1. mise を使用する場合

```bash
# mise セットアップ
mise trust
mise install
```

### 1-2. それ以外の場合

mise を使用しない場合は次のツールをインストールしてください。

- Node.js ([.nvmrc](./.nvmrc) に記載のバージョン)
- [corepack](https://github.com/nodejs/corepack#readme)

```bash
# pnpm セットアップ
corepack enable
```

### 2. 依存関係のインストールと開発サーバーの起動

```bash
# 依存関係インストール
pnpm i

# 開発サーバー起動
pnpm dev
```
