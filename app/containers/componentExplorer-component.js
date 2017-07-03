import React, { Component } from 'react';
import { Render } from 'react-dom';
import KeyValuePairComponent from './keyValuePair-component.js';

class ComponentExplorerComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const props = [];

    for (var prop in data) {
      props.push(prop);
    }

    const propItems = props.map((key) =>
      <KeyValuePairComponent keyPair={key} value={data[key]} />
    )

    return (
      <span>
        { Array.isArray(data) ? "[" : "{" }
        { propItems ? propItems : null }
        { Array.isArray(data) ? "]" : "}" }
      </span>
    )
  }
}

export default ComponentExplorerComponent;