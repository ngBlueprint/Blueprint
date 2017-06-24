import React, { Component } from 'react';
import { Render } from 'react-dom';
import KeyValuePairComponent from './keyValuePair-component.js';

class ObjectExplorerComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      root: {
        // 'display': 'inline-block',
        // 'border': 'solid red 1px'
      },
      propItem: {
        'padding-left': '16px',
        // 'border': 'solid 1px green'
      }
    }
    // const propVal = (key) => {
    //   if (Array.isArray(data[key]))
    //     return processArray(data[key]);
    //   else if (typeof data[key] === 'object')
    //     return <ObjectExplorerComponent data={data[key]} />
    //   else
    //     return JSON.stringify(data[key])
    // }

    const processArray = (array) => {
      const output = array.map((ele) =>
        <div style={styles.propItem}>
          {ele}
        </div>
      );
      return '[' + output + ']';
    }

    const { data } = this.props;
    const props = [];

    for (var prop in data) {
      props.push(prop);
    }

    const propItems = props.map((key) =>
      <KeyValuePairComponent keyPair={key} value={data[key]} />
    )

    return (
      <span style={styles.root}>
        {/*{JSON.stringify(data)}*/}
        {Array.isArray(data) ? "[" : "{"}
        {propItems ? propItems : null}
        {Array.isArray(data) ? "]" : "}"}
      </span>
    )
  }
}

export default ObjectExplorerComponent;