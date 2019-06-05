import React from 'react';
import Procedure from './procedure/procedure';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      procedures: [{ id: '1' }, { id: '2' }, { id: '3' }]
    };
  }

  render() {
    return (
      <div className="row">
        {this.state.procedures.map(p => (
          <div className="col">
            <Procedure key={p.id} id={p.id} />
          </div>
        ))}
      </div>
    );
  }
}
