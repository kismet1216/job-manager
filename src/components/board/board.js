import React from 'react';
import Procedure from './procedure/procedure';
import axios from 'axios';
import './board.scss';
import { END_POINT, PROCEDURES_SET } from '../../constants';
import produce from 'immer';
import AddProcedure from './add-procedure/add-procedure';
import { getProcedures } from '../../redux/selectors/procedures.selector';
import { connect } from 'react-redux';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.moveCardById = this.moveCardById.bind(this);
  }

  componentDidMount() {
    axios.get(END_POINT + 'user/1/procedures').then(res => {
      this.props.setProcedures(res.data);
    });
  }

  moveCardById(oldCardId, currentProcedureId) {
    this.setState(
      // immer's usage in setState
      produce(prevState => {
        const procedures = prevState.procedures;
        let foundCard;
        for (let i = 0; i < procedures.length; i++) {
          // loop this procedure's cards list
          foundCard = procedures[i].cards.find(card => card.id === oldCardId);
          if (foundCard) {
            // if found, delete this card from its list
            procedures[i].cards = procedures[i].cards.filter(card => card.id !== oldCardId);
            break;
          }
        }
        // find dest procedure and add card to it
        const currProcedure = procedures.find(p => p.id === currentProcedureId);
        currProcedure.cards.push(foundCard);
      })
    );
  }

  changeProcedureTitle(procedure) {
    return (value) => {
      this.setState(
        produce(draft => {
          const curr = draft.procedures.find(p => p.id === procedure.id);
          curr.title = value;
        })
      );
    };
  }

  render() {
    return (
      <div className="board container-fluid">
        <div className="procedures-container">
          {this.props.procedures.map(p => (
            <div key={p.id} className="mr-5 d-inline-block align-top">
              <Procedure info={p} onDrop={this.moveCardById} onChangeTitle={this.changeProcedureTitle(p)} onChangeCard={this.onChangeCard} />
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
  setProcedures: (procedures) => dispatch({type: PROCEDURES_SET, payload: procedures})
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
