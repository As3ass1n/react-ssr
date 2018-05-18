const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const staticServer = require('koa-static');

const string = require('./transpile');

const app = new Koa();
const router = new Router();


app.use(staticServer(path.resolve(__dirname, '../client')));

router.get('/', (ctx) => {
  ctx.body = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <div id="root">${string}</div>
    <script src="/bundle.js"></script>
  </body>
  </html>`;
});

app.use(router.routes());
app.listen(process.env.PORT || 3000);
