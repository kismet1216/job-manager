import React from 'react';
import Procedure from './procedure/procedure';
import axios from 'axios';
import { END_POINT } from '../constants';
import './board.scss';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      procedures: []
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
            <div key={p.id} className="mr-5 d-inline-block">
              <Procedure info={p} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
