import React, { Component } from 'react';
import { Render } from 'react-dom';
import ObjectExplorerComponent from './objectExplorer-component.js';
import ExpandObjectComponent from './expandObject-component.js';

class KeyValuePairComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true
    }
    this.expand = () => {
      const isExpanded = !this.state.isExpanded;
      this.setState({ isExpanded: isExpanded });
    }
  }

  render() {
    const { keyPair, value } = this.props;
    
    const procVal = (val) => {
      if (Array.isArray(val)) {
        return this.state.isExpanded ?
          <ObjectExplorerComponent data={val} /> :
          '[ ... ]'
      }
      else if (typeof val === 'object')
        return this.state.isExpanded ?
          <ObjectExplorerComponent data={val} /> :
          '{ ... }'
      else
        return JSON.stringify(val)
    }

    const style = {
      'margin-left': '16px',
      'position': 'relative',
    }

    return (
      <div style={style} >
        {
          typeof value === 'object' ?
            <ExpandObjectComponent
              isExpanded={this.state.isExpanded}
              onClick={this.expand} /> :
            null
        } <span>{keyPair}</span> : {procVal(value)}
      </div>
    )
  }
}

export default KeyValuePairComponent;