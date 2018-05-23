import React, { Component } from 'react';

import PageA from './containers/PageA';

export default class Index extends Component {
  static loadPageC() {
    const PageC = require.ensure(['./containers/pageC'], (require) => {
      console.log(require('./containers/PageC'));
    });
    console.log(PageC);
  }

  static loadPageB() {
    console.log('bbb');
    const PageB = require.ensure(['./containers/pageC'], (require) => {
      console.log(require('./containers/PageB'));
    });
    console.log(PageB);
  }
  render() {
    console.log(PageA);

    return (
      <div>
        <div><button onClick={Index.loadPageC}>load page caaaa</button></div>
        <div><button onClick={Index.loadPageB}>load page b</button></div>
      </div>
    );
  }
}
