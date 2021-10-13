# react-rails-app_client

## 概要

api を使ったアプリを作れる最小構成のボイラープレートです。
react-rails-app_backend の api と連携させて使うことを想定しています。
公開 api を利用するも良し。

## あらかじめ導入されているもの

- React
- Typescript
- sass
- axios
- react-router-dom
- ant design (モーダル作成時に使用してください)
- babel の類
- webpack の類

## 使い方

ローカルにひっぱってきたら

```
yarn install
yarn start

or

npm i
npm start
```

http://localhost:3500
で立ち上がります。

### 環境変数

.env で管理します

- `REACT_APP_AUTH_API_HOST`: 認証用の API のホストを入れてください
- `REACT_APP_APPLICATION_API_HOST`: アプリケーションサービスを提供する API のホストを入れてください

上記の２つはもちろん一緒のホストになることもあります。
それ以外にも API を接続する場合や、環境変数で管理したい他の値は随時`.env`に以下のように値を追加してください。

```dotenv
REACT_APP_XXXXXX=value
```

### フォルダ構造(src 内)

<pre>
.
├── src
 ├── App.scss
 ├── App.test.tsx
 ├── App.tsx
 ├── components: 使い回すことのできる要素を置く
  └── RecruitmentCard
      ├── index.tsx
      └── style.module.scss
 ├── data: バックエンドと通信するときに使う
 ├── hooks: 複数のcomponentで使われる関数を置く
 ├── index.scss
 ├── react-app-env.d.ts
 ├── scenes: 各ページの呼び出し先
 ├── serviceWorker.ts
 └── utilities: tsx内で使用する変数、定数など、全体で使用する要素を置く

</pre>
