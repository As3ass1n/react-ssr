const React = require('react');
const reactDOMServer = require('react-dom/server');
const App = require('../public/App');

const string = reactDOMServer.renderToString(<App />);
console.log(string);

module.exports = string;
