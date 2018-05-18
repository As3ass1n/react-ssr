
const Koa = require('koa');
const Router = require('koa-router');

const string = require('./transpile');

const app = new Koa();
const router = new Router();

// const string = reactDOMServer.renderToString(<div>hhdhdhd</div>);


// router.get('/', (ctx) => {
// ctx.body = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <title>Document</title>
// </head>
// <body>
//   <div id="root">${reactDOMServer.renderToString(<App />)}</div>
// </body>
// </html>
// `;
// });

app.use((ctx) => {
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
  </body>
  </html>
  `;
});
app.listen(process.env.PORT || 3000);
