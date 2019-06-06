import React from 'react';
import Procedure from './procedure/procedure';
import axios from 'axios';
import './board.scss';
import { END_POINT } from '../constants';
import produce from 'immer';

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
      this.setState({ procedures: res.data })
    });
  }

  addCardById(oldCardId, currentProcedureId) {
    this.setState(
      produce(prevState => {
        const procedures = prevState.procedures;
        let foundCard;
	      for (let i = 0; i < procedures.length; i++) {
	        foundCard = procedures[i].cards.find(card => card.id === oldCardId);
	        if (foundCard) {
		        procedures[i].cards = procedures[i].cards.filter(card => card.id !== oldCardId);
	          break;
          }
	      }

	      const currProcedure = procedures.find(p => p.id === currentProcedureId);
	      currProcedure.cards.push(foundCard);
      })
    );
  }

  render() {
    return (
      <div className="board container-fluid">
        <div className="procedures-container">
          {this.state.procedures.map(p => (
            <div key={p.id} className="mr-5 d-inline-block align-top">
              <Procedure info={p} onDrop={this.addCardById} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
