import React from 'react';
import Procedure from './procedure/procedure';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <Procedure />
        </div>
        <div className="col">
          <Procedure />
        </div>
        <div className="col">
          <Procedure />
        </div>
      </div>
    );
  }
}
