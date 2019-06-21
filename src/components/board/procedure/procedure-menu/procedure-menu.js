import React from 'react';
import http from '../../../../shared/services/http';
import { connect } from 'react-redux';
import { setProcedureAction } from '../../../../redux/actions/set-procedure.action';

class ProcedureMenu extends React.Component {
  constructor(props) {
    super(props);

    this.clear = this.clear.bind(this);
  }

  clear() {
    http.delete(`/procedure/cards/${this.props.pid}`).then(procedure => {
      this.props.setProcedure(procedure);
      this.props.close();
    })
  }

  render() {
    return (
      <div className="list-group list-group-flush">
        <button className="list-group-item list-group-item-action">左移</button>
        <button className="list-group-item list-group-item-action">右移</button>
        <button className="list-group-item list-group-item-action">时间先后排序</button>
        <button className="list-group-item list-group-item-action">时间先后逆序</button>
        <button className="list-group-item list-group-item-action">优先级排序</button>
        <button className="list-group-item list-group-item-action list-group-item-danger" onClick={this.clear}>清空</button>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    setProcedure: (procedure) => {
      dispatch(setProcedureAction(procedure))
    }
  })
)(ProcedureMenu);
