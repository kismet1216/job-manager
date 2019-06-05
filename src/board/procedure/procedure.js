import React from 'react';
import Card from './card/card';

export default class Procedure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [
        { title: 'senior developer', dest: 'amz', date: '6/5/2019', resume: 'r1.pdf', contact: { recruiter: 'Wang', phone: '978234223', email: 'ff@gmail.com' } },
        { title: 'web developer', dest: 'baidu', date: '6/6/2019', resume: 'r5.pdf', contact: { recruiter: 'Li', phone: '1784567894', email: 'gf@gmail.com' } },
        { title: 'manager', dest: 'fb', date: '6/1/2019', resume: 'r2.pdf', contact: { recruiter: 'Tu', phone: '966234223', email: 'gg@gmail.com' } }
      ]
    }
  }

  componentDidMount() {
    // todo call api to get cards
  }

  render() {
    return (
      <div className="container-fluid border rounded">
        {this.state.cards.map(card =>
          <Card info={card} />
        )}
      </div>
    );
  }
}
