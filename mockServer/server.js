const jsonServer = require("json-server");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

/*
  JSON Server(https://github.com/typicode/json-server#filter)の問題点
  - 画像の追加，更新などはできなそう (base64を使用した文字列ベースの更新しかできなさそう)
  https://github.com/typicode/json-server/issues/651
  - 認証周りだけこっちでエンドポイントを作成してあげる必要がありそう
*/

const middlewares = jsonServer.defaults()
const server = jsonServer.create();
const router = jsonServer.router("./mockServer/db.json");

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// 署名
const JWT_SECRET = "jwt_json_server";
// 有効時間
const EXPIRATION = "1h";
const db = JSON.parse(fs.readFileSync("./mockServer/db.json", "UTF-8"));

server.post("/sign_in", (req, res) => {
  const { email, password } = req.body.account;
  const account = db.accounts.find(account => account.email === email && account.password === password)
  // ログイン検証
  if (!account) {
    res.status(401).json("Unauthorized");
    return;
  }

  // ログイン後、アクセストークンの生成
  const token = jwt.sign({ email, password }, JWT_SECRET, {
    expiresIn: EXPIRATION,
  });

  res.status(200).json({ account, token });
});

server.post("/auth", (req, res) => {
  const { token } = req.body;
  try {
    const decode = jwt.verify(
      token,
      JWT_SECRET
    )
    const { email, password } = decode;
    const account = db.accounts.find(account => account.email === email && account.password === password)
    res.status(200).json({ account });
  } catch (e) {
    res.status(401).json("Unauthorized");
    return;
  }
})

server.use(router);

server.listen(8000, () => {
  console.log("JSON Server Start http://localhost:8000/");
});
