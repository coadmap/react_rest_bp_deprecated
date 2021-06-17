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
- ress
- babelの類
- webpackの類

## 使い方

ローカルにひっぱってきたら

```
yarn install
yarn start
```

http://localhost:3500
で立ち上がります。

### 環境変数
.envで管理します
* `REACT_APP_AUTH_API_HOST`: 認証用のAPIのホストを入れてください
* `REACT_APP_APPLICATION_API_HOST`: アプリケーションサービスを提供するAPIのホストを入れてください

上記の２つはもちろん一緒のホストになることもあります。
それ以外にもAPIを接続する場合や、環境変数で管理したい他の値は随時`.env`に以下のように値を追加してください。
```dotenv
REACT_APP_XXXXXX=value
```
