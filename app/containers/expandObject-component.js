import React, { Component } from 'react';
import { Render } from 'react-dom';
import ObjectExplorerComponent from './objectExplorer-component.js';

class ExpandObjectComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      'cursor': 'pointer',
      'position': 'absolute',
      'left': '-12px',
      // 'font-size': '0.4rem'

      arrowUp: {
        'border': 'solid black',
        'border-width': '0 2px 2px 0',
        'display': 'inline-block',
        'padding': '2px',
        'transform': 'rotate(-135deg)',
        '-webkit-transform': 'rotate(-135deg)',
      },
      arrowDown: {
        'border': 'solid black',
        'border-width': '0 2px 2px 0',
        'display': 'inline-block',
        'padding': '2px',
        'transform': 'rotate(45deg) translateY(-3px)',
        '-webkit-transform': 'rotate(45deg) translateY(-3px)',
      }
    }

    return (
      <span style={style} onClick={this.props.onClick}>
        {this.props.isExpanded ? <i style={style.arrowUp}></i> : <i style={style.arrowDown}></i>}
      </span>
    )
  }
}

export default ExpandObjectComponent;