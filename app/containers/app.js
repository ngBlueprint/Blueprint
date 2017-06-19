import React, { Component } from 'react';
import { render } from 'react-dom'

class App extends Component {

  render() {

    return (
      <div>
        <p style={pstyle}>I am in a React Component!!!</p>
      </div>
    );
  }
}

const pstyle = {
    color: 'red',
    backgroundcolor: 'green'
};


export default App;






