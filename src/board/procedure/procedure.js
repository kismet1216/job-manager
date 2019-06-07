import React from 'react';
import Card from './card/card';
import Modal from '../../shared/modal/modal';
import './procedure.scss';

/**
 * props: {
 *  info: any,
 *  onDrop()
 * }
 */
export default class Procedure extends React.Component {
	constructor(props) {
		super(props);

		this.drop = this.drop.bind(this);
	}

	componentDidMount() {
	}

	allowDrop(e) {
		e.preventDefault();
	}

	drop(e) {
		e.preventDefault();
		const cardId = e.dataTransfer.getData('text/plain');
    // leverage logic to parent
		this.props.onDrop(cardId, this.props.info.id);
	}

	render() {
		const {title, cards} = this.props.info;
		return (
			<div className="procedure border rounded text-center">
				<div className="procedure-header">
					<button className="btn btn-link"><i className="fa fa-plus" /></button>
					{title}
					<button className="btn btn-link"><i className="fa fa-bars" /></button>
				</div>

				<div className="cards-container" onDragOver={this.allowDrop} onDrop={this.drop}>
					{(cards || []).map(card =>
						<Card info={card} key={card.id} />
					)}
				</div>

        <Modal show={true}>sdf</Modal>
			</div>
		);
	}
}
