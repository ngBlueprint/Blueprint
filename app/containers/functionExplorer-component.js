import React, { Component } from 'react';
import { Render } from 'react-dom';

class FunctionExplorerComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <span>
        { data }
      </span>
    )
  }
}

export default FunctionExplorerComponent;