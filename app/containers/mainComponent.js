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
          <br />
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

module.exports = MainComponent;