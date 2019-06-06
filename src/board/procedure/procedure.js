import React from 'react';
import Card from './card/card';
import axios from 'axios';
import { END_POINT } from '../../constants';
import './procedure.scss';

export default class Procedure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    axios.get(END_POINT + 'procedure/' + this.props.info.id).then(res => {
      this.setState({ cards: res.data });
    });
  }

  render() {
    return (
      <div className="procedure border rounded text-center">
        <div className="procedure-header">
          <button className="btn btn-link"><i className="fa fa-plus"/></button>
          {this.props.info.title}
          <button className="btn btn-link"><i className="fa fa-bars"/></button>
        </div>

        {this.state.cards.map(card =>
          <Card info={card} key={card.id} />
        )}
      </div>
    );
  }
}
