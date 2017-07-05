import React, { Component } from 'react';
import { Render } from 'react-dom';
import ComponentExplorerComponent from './componentExplorer-component.js';

class ComponentsContainerComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      'margin': '1rem',
    }
    return (
      <div className='componentsView' >
        {
          this.props.data ?
            <ComponentExplorerComponent data={this.props.data} /> :
            null
        }
      </div>
    )
  }
}

export default ComponentsContainerComponent;