const register = require('babel-register');

register({
  presets: ['react', 'env'],
  extensions: ['.js'],
});

const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const staticServer = require('koa-static');

const string = require('./src/server/transpile');

const app = new Koa();
const router = new Router();

// const apppath = path.join(__dirname, "client");

// reactView(app, {
//   views: `${__dirname}/app`,
//   extname: "js"
// });

app.use(staticServer(path.join(__dirname, 'dist')));

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
    <script src="client/bundle.js"></script>
  </body>
  </html>`;
});

app.use(router.routes());
app.listen(3001);
