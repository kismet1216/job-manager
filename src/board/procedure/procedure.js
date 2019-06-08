import React from 'react';
import Card from './card/card';
import Modal from '../../shared/modal/modal';
import './procedure.scss';

/**
 * props: {
 *  info: any,
 *  onDrop: () => {},
 *  onChangeTitle: () => {}
 * }
 */
export default class Procedure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      isEditTitle: false,
    };

    this.drop = this.drop.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.onToggleTitle = this.onToggleTitle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal(open) {
    return () => this.setState({showModal: open});
  }

  onToggleTitle() {
    this.setState(prev => {
      return {
        isEditTitle: !prev.isEditTitle
      };
    });
  }

  changeTitle(e) {
    this.props.onChangeTitle(e.target.value);
  }

  render() {
    const {title, cards} = this.props.info;
    return (
      <div className="procedure border rounded text-center">
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-link"><i className="fa fa-plus" /></button>
          {this.state.isEditTitle ?
            <div>
              <input type="text" value={title} onChange={this.changeTitle} autoFocus={true} />
              <button className="btn btn-outline-primary" onClick={this.onToggleTitle}>
                ok
              </button>
            </div>
            :
            <div onClick={this.onToggleTitle}>
              {title}
            </div>
          }
          <button className="btn btn-link"><i className="fa fa-bars" /></button>
        </div>

        <div className="cards-container" onDragOver={this.allowDrop} onDrop={this.drop}>
          {(cards || []).map(card =>
            <Card info={card} key={card.id} onClick={this.toggleModal(true)} />
          )}
        </div>

        <Modal show={this.state.showModal} title="详情" onClose={this.toggleModal(false)}>sdf</Modal>
      </div>
    );
  }
}
