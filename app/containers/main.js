import React, { Component } from 'react';
import { render } from 'react-dom'
import MainComponent from './mainComponent.js'
import SubComponent from './subComponent.js'
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      selectedComponent: "",
      componentList: [],
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
  }

  handleClick(e) {
    console.log(e)
    this.setState({ selectedComponent: e.target.value })
  }

  handleData() {
    axios.post('/update');
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






