## react服务端渲染学习总结

### 1.__为什么要用服务端渲染？__

服务端渲染其实主要解决了这两个问题：
1. __SEO__  
  其实这个主要是因为一些搜索引擎是不会去执行请求到的js的。所以就需要服务端直接返回一些必要的html以供搜索引擎进行爬取。
2. __首屏性能问题__  
  客户端渲染的话它的具体流程如下：
  ![Client][https://cloud.githubusercontent.com/assets/10385585/15772984/0cc47cfe-29a7-11e6-94ad-3cd4b82daabb.png]
  服务端渲染流程：
  ![Server][https://images2015.cnblogs.com/blog/1060770/201707/1060770-20170706133929925-1128607920.png]  
  对比一下的话其实就是把前后端分离的模式改成了使用node作为中间层去获取数据并将数据生成到html上然后返回给前端。这样也就减少了js文件的加载时间。

### 2.项目搭建

#### 2.1 初始化项目
新建一个react-ssr项目
```
mkdir react-ssr && cd react-ssr
npm init -y
```

安装项目需要的依赖
```
npm i -S koa koa-router koa-static react react-dom babel-register
npm i -D webpack webpack-cli babel-cli babel-core babel-loader babel-preset-env babel-preset-react
```
#### 2.2 webpack.config.js的配置
webpack.config.js中客户端代码配置如下:
```js
const BrowserConfig = {
  entry: './src/client/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: { presets: ['react', 'env'] },
        },
      },
    ],
  },
}
```

服务端配置:
```js
const ServerConfig = {
  entry: './src/server/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server.js',
    libraryTarget: 'commonjs2', // 通过配置不同的libraryTarget生成不同的umd代码，commonjs2表示模块用于commonjs环境
  },
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react', 'env'] },
      },
    ],
  },
  externals: /node_modules/, // 告知webpack在打包过程中，遇到externals中声明的模块不用处理
  /**
   * 打包后生成的代码，__dirname,__filename输出全部都是/，主要是因为这两个变量在webpack中做了一些自定义处理，正确使用的话需要加上下面这些参数
   * 参考连接：https://zhuanlan.zhihu.com/p/20782320
   */
  context: __dirname,
  node: {
    __dirname: false,
    __filename: false,
  },
}
```
导出的话 webpack支持多配置导出（此功能只支持Webpack 3.1.0以上）,可以直接导出一个数组，webpack会根据数组中的每一项配置进行构建:
```js
module.exports = [BrowserConfig,ServerConfig]
```

#### 2.3 demo代码
客户端代码：
```js
import React from 'react';
import { render } from 'react-dom';

import App from '../public/App';

render(<App />, document.querySelector('#root'));
```
公共代码：
```js
import React, { Component } from 'react';

module.exports = class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
    this.click = this.click.bind(this);
  }

  click() {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1,
    });
  }

  render() {
    return (
      <div>
        Click:<button onClick={this.click}>click me</button>
        <div>num: {`${this.state.counter}`}</div>
      </div>
    );
  }
};

```
服务端代码:
```js
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
```

项目启动:
```
node dist/server/server.js
```
