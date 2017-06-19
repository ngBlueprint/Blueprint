import React, { Component } from 'react';
import { render } from 'react-dom'
import MainComponent from './mainComponent.js'

class Main extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)

        this.state = {
            selectedComponent: "hello world",
            componentList: []
        }
    }

handleClick(e){
    console.log(e)
    this.setState({ selectedComponent: e.target.value})
}


  render() {

    return (
      <div>
        <MainComponent handleClick = {this.handleClick} selectedComponent = {this.state.selectedComponent} componentList = {this.state.componentList}/>
      </div>
    );
  }
}

const pstyle = {
    color: 'red'
};


export default Main;






