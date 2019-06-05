import React from 'react';
import Card from './card/card';
import axios from 'axios';
import { END_POINT } from '../../constants/constants';

export default class Procedure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    axios.get(END_POINT + 'procedure/1').then(cards => {
      this.setState({cards});
    });
  }

  render() {
    return (
      <div className="container-fluid border rounded">
        {this.state.cards.map(card =>
          <Card info={card} key={card.id} />
        )}
      </div>
    );
  }
}
