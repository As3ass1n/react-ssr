import React, { Component } from "react";
import Link from "next/link";

// const Index = () => {
//   return (
//     <div>
//       <Link href="/about">
//         <button>About Page</button>
//       </Link>
//       <p>Hello Next.js</p>
//     </div>
//   );
// };

class Index extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0
    };

    this.clickEvent = this.clickEvent.bind(this);
  }

  clickEvent() {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1
    });
  }

  render() {
    console.log(this.state.counter);
    return (
      <div>
        <button onClick={this.clickEvent}>click me</button>
      </div>
    );
  }
}

export default Index;
