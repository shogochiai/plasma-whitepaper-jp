# 注意
- 本文中の半角記号はエスケープが必要なケースが多いです。
  - `-_%$\#` が特にURLに含まれるとエラーが貧弱なので気づきにくいです
  - `\section{}` `\subsection` の見出しは個数に敏感なので原文の章立てを崩さないように注意してください

# セットアップ
- 以下は `MacOS Sierra 10.12` 環境において動作確認されました
- TexShop for MacOSをインストールし、`pdflatex` コマンドを入手してください（インストール後、反映にターミナルの再起動が必要） https://www.latex-project.org/get/
- `git clone https://github.com/zr-tex8r/BXjscls.git` ののちに手順にしたがってインストールしてください
  - `texmf` というフォルダが必要になるので、こちらに従って用意してください https://tex.stackexchange.com/a/10256
    - `mkdir -p ~/Library/texmf/tex/latex/bxjscls ~/Library/texmf/source/latex/bxjscls ~/Library/texmf/doc/latex/bxjscls` が必要です
- [tex/00a_Header](./tex/00a_Header#L1)の一行目`\documentclass[12pt,twoside,a4paper,pdflatex,ja=standard]{bxjsarticle}`が日本語の有効化の役割を担っています。そのまま`node index.js`の実行で日本語PDFが生成されます
