import React from 'react';
import Procedure from './procedure/procedure';
import './board.scss';
import AddProcedure from './add-procedure/add-procedure';
import { getProcedures } from '../../redux/selectors/procedures.selector';
import { connect } from 'react-redux';
import http from '../../shared/services/http';
import { setProceduresAction } from '../../redux/actions/set-procedures.action';

class Board extends React.Component {
  componentDidMount() {
    http.get('/procedures').then(procedures => {
      this.props.setProcedures(procedures);
    });
  }

  render() {
    return (
      <div className="board container-fluid">
        <div className="procedures-container">
          {this.props.procedures.map(p => (
            <div key={p.id} className="mr-5 d-inline-block align-top">
              <Procedure info={p} onChangeCard={this.onChangeCard} />
            </div>
          ))}
          <div className="d-inline-block align-top">
            <AddProcedure />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  procedures: getProcedures(state)
});

const mapDispatchToProps = dispatch => ({
  setProcedures: (procedures) => dispatch(setProceduresAction(procedures))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
