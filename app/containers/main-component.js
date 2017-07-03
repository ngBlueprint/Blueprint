import React, { Component } from 'react';
import { render } from 'react-dom';
import SubComponent from './sub-component.js'
import ObjectExplorerComponent from './objectExplorer-component.js';
import ComponentExplorerComponent from './componentExplorer-component.js';

import NodeExplorer from '../utils/nodeExplorer.js'

class MainComponent extends Component {
  constructor(props) {
    super(props)
    this.nodeExplorer = new NodeExplorer();
    this.refreshComponents = this.refreshComponents.bind(this);
    this.state = {
      raw: '',
      components: ''
    }

    // create a connection to the background page
    const backgroundPageConnection = chrome.runtime.connect({
      name: 'panel',
    });
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    alert('in react main.js!')

    backgroundPageConnection.onMessage.addListener(this.onConnect)

    backgroundPageConnection.onMessage.addListener((message) => {
      // Handle responses from the background page, if any
      // alert('message received: ' + JSON.stringify(message));
      // alert('old state' + JSON.stringify(this.state));
      this.setState({ raw: message.data, components: this.parseComponents(message.data) });
      // this.parseComponents(message.data);
      // alert('new state' + JSON.stringify(this.state));

      // alert('new state: ' + JSON.stringify(this.state.data));
    });

    this.refreshComponents();
  }

  refreshComponents() {
    chrome.devtools.inspectedWindow.eval(
      `
      if(typeof ngProbe === 'undefined') {
        var ngProbe = window.ng.probe(window.getAllAngularRootElements()[0]);
        var ngZone = ngProbe.injector.get(window.ng.coreTokens.NgZone);
        
        // var ngZone = window.ng.probe(window.getAllAngularRootElements()[0]).injector.get(window.ng.coreTokens.NgZone);

        // ngZone.onStable.subscribe(function() { 
        //   console.log('Angular did some work (STABLE'); 
        //   window.postMessage({data: getContext(ngProbe), type:"message"},'*');
        // });
        ngZone.onStable.subscribe(function() { 
          // alert('Angular did some work (UNSTABLE'); 
          
          window.postMessage({data: getContext(ngProbe), type:"message"},'*');
        });

        console.log('done');
      }
      else{
        // ngProbe = window.ng.probe(window.getAllAngularRootElements()[0]);
        // appRef = ngProbe.injector.get(window.ng.coreTokens.ApplicationRef);
        // ngZone = ngProbe.injector.get(window.ng.coreTokens.NgZone);
      }
                  window.postMessage({data: getContext(ngProbe), type:"message"},'*');


      function getContext(ele, contexts = {}){
        if(typeof ele.nativeElement !== 'undefined'){
          var node = {}

          node.name = ele.name;
          node.context = processContext(ele.componentInstance);

          if(ele.childNodes) {
            node.childNodes = [];

            for(var i = 0; i < ele.childNodes.length; i++) {
              var childNode = ele.childNodes[i];

              if(typeof childNode.nativeElement !== 'undefined')
                node.childNodes.push(getContext(childNode));
            }
          }
        }        

        return node;
      }

      function processContext(context){
        var obj = {};

        obj.parentComponent = context.constructor.name;

        for(var prop in context) {
          if(Array.isArray(context[prop]))
            obj[prop] = context[prop];
          if(prop !== '__proto__' 
          && typeof context[prop] !== 'function' 
          && typeof context[prop] !== 'object'
          // && prop !== 'router'
          )
            obj[prop] = context[prop];
        }

        return obj;
      }      
      `,

      //name:ele
      //nativeNode:nativeElement: selecttor


      (result, isException) => {
        // alert('eval start! ' + JSON.stringify(isException));
        if (isException)
          alert('exception thrown! ' + JSON.stringify(isException));
        else {
          alert('eval ran!');
          // const strResult = JSON.stringify(result);
          // // alert('ngRoot : ' + strResult);
          // const comps = this.parseComponents(result);
          // // alert(comps);
          // this.setState({
          //   raw: result,
          //   components: comps
          // });
          // this.setState({ ngRootNode: strResult });
          // alert('new state: ' + this.state);
          // parseComponents(result);
        }
      }
    );
  }
  

  parseComponents(node, componentList = []) {
    // IGF NgIfContext drill down for state (hero detail view)
    //Use component instance??
    const name = node.context.parentComponent;
    // componentTree.name = name;
    if (componentList.indexOf(name) === -1) {
      const componentTree = {};
      componentList.push(name);
      componentTree[name] = {};
      componentTree[name].state = processContext(node.context);

      if (typeof node.childNodes !== 'undefined') {
        componentTree[name].children = {};

        for (let i = 0; i < node.childNodes.length; i++) {
          const child = this.parseComponents(node.childNodes[i], componentList);
          if (typeof child !== 'undefined') {
            const childName = node.childNodes[i].context.parentComponent;
            componentTree[name].children[childName] = child[childName];
          }
        }
      }
      return componentTree;
    }

    function processContext(context) {
      var obj = {};
      for (var prop in context) {
        if (Array.isArray(context[prop]))
          obj[prop] = context[prop];
        if (prop !== '__proto__' &&
          typeof context[prop] !== 'function' &&
          typeof context[prop] !== 'object' &&
          prop !== 'parentComponent')
          obj[prop] = context[prop];
      }

      return obj;
    }

  }

  render() {
    return (
      <div style={styles.splitPane}>
        <div style={styles.splitPaneLeft}>
          <h1>Component List</h1>
          <hr />
          <hr />
          <ObjectExplorerComponent data={this.state.raw} />
          <br />
          {/*<button onClick={this.refreshComponents}>Refresh Components</button>*/}
        </div>
        <div style={styles.splitPaneRight}>
          {/*<ObjectExplorerComponent data={this.props.data} />*/}
          
          <ComponentExplorerComponent data={this.state.components} />

        </div>
      </div>
    )
    /*const comps = ['heroesComponent', 'dashBoardComponent', 'watcherComponent'];
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
    )*/
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


// var ngRootEl = window.getAllAngularRootElements()[0];
// var rootNgProbe = window.ng.probe(ngRootEl);


// var ngZone = rootNgProbe.injector.get(window.ng.coreTokens.NgZone);
// ngZone.onStable.subscribe(function() { console.log('Angular did some work (STABLE'); });
// ngZone.onUnstable.subscribe(function() { console.log('Angular did some work (UNSTABLE'); });

