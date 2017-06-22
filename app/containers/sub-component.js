import React, { Component } from 'react';
import { render } from 'react-dom';



class SubComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props.data;
    const selectedComponent = this.props.selectedComponent;
    let arr = [];
    if (selectedComponent !== "") {
      for (let i = 0; i < data[selectedComponent].length; i++) {
        const keys = Object.keys(data[selectedComponent][i]);
        for (let j in keys) {
          arr.push(<div><span>{keys[j]}</span> : <span>{JSON.stringify(data[selectedComponent][i][keys[j]])}</span></div> );
        }
        arr.push(<div><br/><hr /><br/></div>);
        // arr.push(<div><p>{JSON.stringify(data[selectedComponent][i])}</p><br /><br /></div>);
      }
    }
    return (
      <div>
        <h1>{selectedComponent}</h1>
        <hr />
        <hr />
        <br />
        {arr}
      </div>
    )
  }
}

const styles = {
  splitPane: {
    width: '100%',
    height: '100%',
    background: 'green'
  },
  splitPaneLeft: {
    float: 'left',
    width: '40%',
    height: '100%'
  },
  splitPaneRight: {
    float: 'left',
    width: '60%',
    height: '100%'
  },
};

module.exports = SubComponent;