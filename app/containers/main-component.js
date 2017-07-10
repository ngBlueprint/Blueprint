import React, { Component } from 'react';
import { render } from 'react-dom';
import SubComponent from './sub-component.js'
import ObjectExplorerComponent from './objectExplorer-component.js';
import ComponentsContainerComponent from './componentsContainer-component.js';
import { List, ListItem } from 'material-ui/List';
import NodeExplorer from '../utils/nodeExplorer.js'
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

class MainComponent extends Component {
  constructor(props) {
    super(props)
    this.nodeExplorer = new NodeExplorer();
    this.refreshComponents = this.refreshComponents.bind(this);
    this.state = {
      raw: '',
      componentsArray: [],
      componentList: [],
      serviceList: [],
      selectedElement: 'Show All',
    }

    // create a connection to the background page
    const backgroundPageConnection = chrome.runtime.connect({
      name: 'panel',
    });
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    // alert('in react main.js!')

    backgroundPageConnection.onMessage.addListener(this.onConnect)

    backgroundPageConnection.onMessage.addListener((message) => {
      // Handle responses from the background page, if any
      // alert('message received: ' + JSON.stringify(message));
      // alert('old state' + JSON.stringify(this.state));
      const components = this.parseComponents(message.data);
      this.setState({
        raw: message.data,
        components: components,

      });
      // this.parseComponents(message.data);
      // alert('new state' + JSON.stringify(this.state));

      // alert('new state: ' + JSON.stringify(this.state.data));
    });

    this.refreshComponents();
  }

  //componentInstance (HeroDetailComponent)
  // hero: Object
  // heroSerivce: HeroService

  // ngProbe.childNodes[6].componentInstance
  // ngProbe.childNodes[6].componentInstance.constructor.name
  // "HeroDetailComponent"
  // ngProbe.childNodes[6].componentInstance.hero.constructor.name
  // "Object"
  // ngProbe.childNodes[6].componentInstance.heroService.constructor.name
  // "HeroService"


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

          node.innerHTML = ele.nativeElement.innerHTML;
          node.innerText = ele.nativeElement.innerText;

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

      function processContext(context, processParent = true){
        var obj = {};

        // obj.parentComponent = '';

        if(processParent)
          obj.parentComponent = context.constructor.name;

        for(var prop in context) {
          if(Array.isArray(context[prop])){
            obj[prop] = context[prop];
          } else if (typeof context[prop] === 'function') {
            // obj[prop] = context[prop].toString();
          } else if (typeof context[prop] === 'object') {
            var object = context[prop];
            var constructor = object.constructor.name;
            // obj[prop] = 'OBJECT';

            switch(constructor) {
              case 'Router':
              case 'parentComponent':
              case 'Subject':
              case 'AnonymousSubject':
                break;
              default:
                if (constructor.includes('Service')){
                  obj[prop] = parseService(object);
                }
                else{
                  obj[prop] = object;
                }
                break;
            }
          } else if(prop !== '__proto__' 
          && typeof context[prop] !== 'function' 
          && typeof context[prop] !== 'object'
          // && prop !== 'router'
          )
            obj[prop] = context[prop];
        }

        return obj;
      }

      function parseService(object) {
        // var obj = {};

        // obj.service = 'yes';

        // return obj;
        // if(object.__proto__)
        //   return object.__proto__;
        // else
        //   return 'no name'
        return parseObject(object.__proto__, ['constructor', '__proto__']);
      }

      function parseObject(object, ignoreKeys = []) {
        var obj = {};

        for(var key in object) {
          if(ignoreKeys.indexOf(key) === -1){
            if (typeof object[key] === 'function') {
              obj[key] = object[key].toString();
              // obj[key] = 'func';
            }
          }
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
          // alert('eval ran!');
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


    const processContext = (context) => {
      var obj = {};
      for (var prop in context) {
        if (Array.isArray(context[prop])) {
          obj[prop] = context[prop];
        } else if (typeof context[prop] === 'function') {
          // obj[prop] = context[prop].toString();
        } else if (typeof context[prop] === 'object') {
          var object = context[prop];
          var constructor = object.constructor.name;
          // obj[prop] = 'OBJECT';

          switch (constructor) {
            case 'Router':
            case 'parentComponent':
              break;
            default:
              if (prop.includes('Service')) {
                obj[prop] = object;
                // obj[prop] = 'SERVICE';
                const oldServiceList = this.state.serviceList;
                if (oldServiceList.indexOf(prop) === -1)
                  oldServiceList.push(prop);
                this.setState({ serviceList: oldServiceList });
              }
              else {
                // alert(JSON.stringify(processContext(object,false)));
                // obj[prop] = processContext(object, false);
                // obj[prop] = JSON.stringify(object);
                obj[prop] = object;
              }
              break;
          }
        } else if (prop !== '__proto__'
          && typeof context[prop] !== 'function'
          && typeof context[prop] !== 'object'
          && prop !== 'parentComponent'
          // && prop !== 'router'
        )
          obj[prop] = context[prop];
        // if (Array.isArray(context[prop]))
        //   obj[prop] = context[prop];
        // if (prop !== '__proto__' &&
        //   typeof context[prop] !== 'function' &&
        //   typeof context[prop] !== 'object' &&
        //   prop !== 'parentComponent')
        //   obj[prop] = context[prop];
      }

      return obj;
    }

    if (componentList.indexOf(name) === -1) {
      const componentTree = {};
      componentList.push(name);
      this.setState({ componentList: componentList });
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

  }
  
  getComponent(name) {
    return name;
    // return this.state.components.hasOwnProperty(name.replace(' ', ''));
  }

  render() {

    const componentListItems = this.state.componentList.map((curr, index) => {
      return <ListItem
        key={index}
        primaryText={curr}
        style={curr === this.state.selectedElement ? styles.listItem : null}
        onTouchTap={() => this.setState({ selectedElement: curr })}
      />
    });

    const serviceListItems = this.state.serviceList.map((curr, index) => {
      return <ListItem
        key={index}
        primaryText={curr}
        style={curr === this.state.selectedElement ? styles.listItem : null}
        onTouchTap={() => this.setState({ selectedElement: curr })}
      />
    });

    return (
      <Paper style={styles.container} zDepth={1} rounded={false}>
        {/*<AppBar
          title="ngPulse"
          style={{ 
            'height': '2rem',
            'padding': '0' 
            }}
          titleStyle={{ 
            //'height': '0.6rem', 
            'margin': '0',
            padding: '0',
            top: '0',
            position: 'relative',
            }}
          showMenuIconButton={false}
        />*/}
        {/*<Paper style={styles.container} zDepth={1} rounded={false} />*/}
        <div style={styles.splitPane}>
          <div style={styles.splitPaneLeft}>
            {/*<h1>Angular Items</h1>*/}
            <List>
              {/*<Subheader>Nested List Items</Subheader>*/}
              <ListItem
                primaryText="Show All"
                style={'Show All' === this.state.selectedElement ? styles.listItem : null}
                onTouchTap={() => this.setState({ selectedElement: 'Show All' })}
              />
              <ListItem
                primaryText="Components"
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={componentListItems}
              />
              <ListItem
                primaryText="Services"
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={serviceListItems}
              />
            </List>
            {/*<ObjectExplorerComponent data={this.state.components} />*/}

            {/*<ObjectExplorerComponent data={this.state.raw} />*/}
            <br />
            {/*<button onClick={this.refreshComponents}>Refresh Components</button>*/}
          </div>
          <div style={styles.splitPaneRight}>
            {/*<ObjectExplorerComponent data={this.props.data} />*/}

            <ComponentsContainerComponent data={this.state.components} />
            Component Selected: 
            {/*{this.getComponent(this.state.selectedElement)}*/}
            {/*{JSON.stringify(this.state.components['AppComponent'])}*/}
          </div>

        </div>
      </Paper>
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
  container: {
    'height': '100%',
    'width': '100%',
    margin: 4,
    // textAlign: 'center',
    display: 'block',
  },
  listItem: {
    'color': 'black',
    'font-weight': 'bold',
  },
  splitPane: {
    width: '100%',
    height: '100%',
    // minHeight: '700px',
    background: ''
  },
  splitPaneLeft: {
    display: 'block',
    float: 'left',
    width: '25%',
    height: '100%',
    minHeight: '700px',
    background: '#FFFFFF',
    // border: '3px solid #DDDDDD',
    // paddingLeft: '10px'
  },
  splitPaneRight: {
    display: 'block',
    float: 'left',
    width: '70%',
    height: '100%',
    minHeight: '700px',
    background: '#FFFFFFF',
    // border: '3px solid #DDDDDD',
    paddingLeft: '10px'
  },
};

module.exports = MainComponent;


// var ngRootEl = window.getAllAngularRootElements()[0];
// var rootNgProbe = window.ng.probe(ngRootEl);


// var ngZone = rootNgProbe.injector.get(window.ng.coreTokens.NgZone);
// ngZone.onStable.subscribe(function() { console.log('Angular did some work (STABLE'); });
// ngZone.onUnstable.subscribe(function() { console.log('Angular did some work (UNSTABLE'); });

