import React, { Component } from 'react';
import { render } from 'react-dom';



class SubComponent extends Component{
  constructor(props) {
    super(props)
  }

  render(){
   
    
      return (
        <div>
            <h1>SubComponent List</h1>
            <p>Mock Data goes here</p>
        </div>
      )
    }
}

module.exports = SubComponent;