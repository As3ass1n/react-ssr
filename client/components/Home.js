import React, { Component } from "react";

module.exports =  class Home extends Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    console.log("aaaa");
  }

  render() {
    return (
      <div>
        <button onClick={this.click}>按钮</button>
      </div>
    );
  }
}
