import React, { Component } from 'react';
import { render } from 'react-dom'
import MainComponent from './main-component.js'
import SubComponent from './sub-component.js'
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.onConnect = this.onConnect.bind(this)


    this.state = {
      selectedComponent: "",
      componentList: [],
      perfData: {},
      data: {
        heroesComponent: [
          {
            selectedHero: "Windstorm",
            heroes: ["Windstorm", "Mr. Nice", "Narco", "Bombasto", "Celeritas", "Magneta", "RubberMan", "Dynama", "Dr IQ", "Magma", "Tornado"],
            heroService: "heroService function",
          },
          {
            selectedHero: "Narco",
            heroes: ["Windstorm", "Mr. Nice", "Narco", "Bombasto", "Celeritas", "Magneta", "RubberMan", "Dynama", "Dr IQ", "Magma", "Tornado"],
            heroService: "heroService function",
          },
          {
            selectedHero: "Magneta",
            heroes: ["Windstorm", "Mr. Nice", "Narco", "Bombasto", "Celeritas", "Magneta", "RubberMan", "Dynama", "Dr IQ", "Magma", "Tornado"],
            heroService: "heroService function",
          },
          {
            selectedHero: "Dr IQ",
            heroes: ["Windstorm", "Mr. Nice", "Narco", "Bombasto", "Celeritas", "Magneta", "RubberMan", "Dynama", "Dr IQ", "Magma", "Tornado"],
            heroService: "heroService function",
          },
          {
            selectedHero: "Windstorm",
            heroes: ["Windstorm", "Mr. Nice", "Narco", "Bombasto", "Celeritas", "Magneta", "RubberMan", "Dynama", "Dr IQ", "Magma", "Tornado"],
            heroService: "heroService function",
          }
        ],
        dashBoardComponent: [
          {
            linkOne: "google.com",
            linkTwo: "github.com",
            linkService: "linkService function"
          },
          {
            linkOne: "facebook.com",
            linkTwo: "github.com",
            linkService: "linkService function"
          },
          {
            linkOne: "google.com",
            linkTwo: "reddit.com",
            linkService: "linkService function"
          }
        ],
        watcherComponent: [
          {
            data: "dataWatcher",
            link: "linkWatcher"
          }
        ]
      },
    }
  this.listenForPerfs();
}

  onConnect(message) {
        // this.haveReceivedPerfs = true;
        // this.hasRenderBeenDetected = styles.renderDetected;
        this.setState({ data: message }, function(){
          alert(JSON.stringify(this.state.data))
        });
    };


  listenForPerfs() {
    // create a connection to the background page
    const backgroundPageConnection = chrome.runtime.connect({
      name: 'panel',
    });
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    alert('in react main.js!!')

    // 
    backgroundPageConnection.onMessage.addListener(this.onConnect)
  }


  handleClick(e) {
    this.setState({ selectedComponent: e.target.value })
  }

  render() {

    return (
      <div>
        <MainComponent handleClick={this.handleClick} selectedComponent={this.state.selectedComponent} componentList={this.state.componentList} data={this.state.data} />
      </div>
    );
  }
}



export default Main;






