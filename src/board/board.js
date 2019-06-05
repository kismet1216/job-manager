import React from 'react';
import Procedure from './procedure/procedure';
import axios from 'axios';
import { END_POINT } from '../constants/constants';
import './board.scss';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      procedures: [{ id: '1' }, { id: '2' }, { id: '3' }]
    };
  }

  componentDidMount() {
    axios.get(END_POINT + 'user/1/procedures').then(res => {
      this.setState({ procedures: res.data })
    });
  }

  render() {
    return (
      <div className="board container-fluid">
        <div className="procedures-container">
          {this.state.procedures.map(p => (
            <div className="mr-5 d-inline-block">
              <Procedure key={p.id} info={p} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
