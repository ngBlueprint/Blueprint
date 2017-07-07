import React, { Component } from 'react';
import { Render } from 'react-dom';
import KeyValuePairComponent from './keyValuePair-component.js';
import ComponentsContainerComponent from './componentsContainer-component.js';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ComponentExplorerComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      card: {
        margin: '1rem',
        color: 'red',
      },
      componentView: {
        h3: {
          color: 'red',
          margin: '0',
        },
      arrowRight: {
        'border': 'solid black',
        'border-width': '0 2px 2px 0',
        'display': 'inline-block',
        'padding': '2px',
        'transform': 'rotate(45deg)',
        '-webkit-transform': 'rotate(45deg)',
      },
      arrowDown: {
        'border': 'solid black',
        'border-width': '0 2px 2px 0',
        'display': 'inline-block',
        'padding': '2px',
        'transform': 'rotate(-45deg) translateY(-3px)',
        '-webkit-transform': 'rotate(-45deg) translateY(-3px)',
      },

        // color: 'red',
        border: 'solid 1px black',
        'max-width': '112rem',
        padding: '1rem 2rem',
        margin: '1rem',
      }
    }
    const { data } = this.props;
    const componentNames = [];

    for (var componentName in data) {
      componentNames.push(componentName);
    }

    const components = componentNames.map((componentName) => {
      const component = data[componentName];
      const props = Object.entries(component.state)
      const propItems = props.map((prop) => {
        const key = prop[0];
        const value = prop[1];
        return (

          <KeyValuePairComponent keyPair={key} value={value} />
        );
      });

      return (
        <div >
          <Card
            expanded={true}
            style={styles.card}
          >
            <CardHeader
              title={componentName}
              //subtitle="Subtitle"

              actAsExpander={true}
              showExpandableButton={false}
            />
            <CardText expandable={true}>
              {propItems}
            </CardText>
          </Card>
          {component.children ?
            <ComponentsContainerComponent data={component.children} /> :
            null
          }
        </div>
        /*<div>
          <div
            className='componentView'
          //style={styles.componentView}
          >
            <h3 style={styles.componentView.h3}>
              {componentName}
            </h3>
            {propItems}
          </div>
          {component.children ?
            <ComponentsContainerComponent data={component.children} /> :
            null
          }
        </div>*/
      )
    }
    )

    return (
      <div>
        {components ? components : null}
      </div>
    )
  }
}

export default ComponentExplorerComponent;