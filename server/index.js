const React = require("react");
const ReactDOMServer = require("react-dom/server");

const Home = require("../client/components/Home");
const string = ReactDOMServer.renderToString(<Home />);

module.exports = string;
