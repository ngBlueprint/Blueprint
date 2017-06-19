import React, { Component } from 'react';
import { render } from 'react-dom';



class MainComponent extends Component{
  constructor(props) {
    super(props)
  }

  render(){
    const comps = ['hero', 'dash', 'watcher'];
    const compsCollection = [];
    for (let i = 0; i < comps.length; i ++) {
      compsCollection.push(<li><button onClick ={this.props.handleClick} value={comps[i]}>{comps[i]}</button></li> );
    }
      return (
        <div style = {page}>
            <h1>Component List</h1>
            <br />
            <br />
            <ul>{compsCollection}</ul>
            <br />
            <br />
            {this.props.selectedComponent}
        </div>
      )
  }
}

const page = {
   border: '4px black solid',
}
module.exports = MainComponent;