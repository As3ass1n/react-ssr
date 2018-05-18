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
      </div>
    );
  }
};
