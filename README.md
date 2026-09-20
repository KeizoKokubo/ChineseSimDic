# 日中漢字ことば辞典

日本人中国語学習者向けの、日中同形・類似漢字語を学ぶReact + TypeScriptアプリです。

## 開発

```bash
npm ci
npm run dev
```

## デプロイ

このプロジェクトはGitHub Pagesへ自動公開されます。`main` ブランチへのpush、またはGitHub Actions画面からの手動実行で、次の処理が行われます。

1. `npm ci`
2. `npm run build`
3. `dist/` をPages artifactとしてアップロード
4. GitHub Pagesへデプロイ

`dist/` はGitで管理しません。公開にはPersonal Access Tokenではなく、GitHub Actions標準の`GITHUB_TOKEN`を使用します。
