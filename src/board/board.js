import React from 'react';
import Procedure from './procedure/procedure';
import axios from 'axios';
import { END_POINT } from '../constants';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.min.css';
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

  dragulaDecorator(componentBackingInstance) {
    if (componentBackingInstance) {
      Dragula([componentBackingInstance], {
        direction: 'horizontal'
      });
    }
  }

  render() {
    return (
      <div className="board container-fluid">
        <div className="procedures-container" ref={this.dragulaDecorator}>
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
