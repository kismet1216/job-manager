import React from 'react';
import Procedure from './procedure/procedure';
import axios from 'axios';
import './board.scss';
import { END_POINT } from '../../constants';
import produce from 'immer';
import AddProcedure from './add-procedure/add-procedure';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      procedures: []
    };

    this.addCardById = this.addCardById.bind(this);
  }

  componentDidMount() {
    axios.get(END_POINT + 'user/1/procedures').then(res => {
      this.setState({procedures: res.data})
    });
  }

  addCardById(oldCardId, currentProcedureId) {
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

  onChangeCard(updatedCard, isNew) {
    if (isNew) {
      // to do, refactor with redux
    } else {}
  }

  render() {
    return (
      <div className="board container-fluid">
        <div className="procedures-container">
          {this.state.procedures.map(p => (
            <div key={p.id} className="mr-5 d-inline-block align-top">
              <Procedure info={p} onDrop={this.addCardById} onChangeTitle={this.changeProcedureTitle(p)} onChangeCard={this.onChangeCard} />
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
