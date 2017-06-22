import React, { Component } from 'react';
import { render } from 'react-dom';
import SubComponent from './subComponent.js'




class MainComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const comps = ['heroesComponent', 'dashBoardComponent', 'watcherComponent'];
    const compsCollection = [];
    for (let i = 0; i < comps.length; i++) {
      compsCollection.push(<div><button onClick={this.props.handleClick} value={comps[i]}>{comps[i]}</button></div>);
    }
    return (
      <div style={styles.splitPane}>
        <div style={styles.splitPaneLeft}>
          <h1>Component List</h1>
          <hr />
          <hr />
          <br />
          {compsCollection}
        </div>
        <div style={styles.splitPaneRight}>
          < SubComponent data={this.props.data} selectedComponent={this.props.selectedComponent}/>
        </div>
      </div>
    )
  }
}

const styles = {
  splitPane: {
    width: '100%',
    height: '100%',
    minHeight: '700px',
    background: ''
  },
  splitPaneLeft: {
    display: 'block',
    float: 'left',
    width: '25%',
    height: '100%',
    minHeight: '700px',
    background: '#FFFFFF',
    border: '3px solid #DDDDDD',
    paddingLeft: '10px'
  },
  splitPaneRight: {
    display: 'block',
    float: 'left',
    width: '70%',
    height: '100%',
    minHeight: '700px',
    background: '#FFFFFFF',
    border: '3px solid #DDDDDD',
    paddingLeft: '10px'
  },
};

module.exports = MainComponent;