import React from 'react';
import Card from './card/card';
import Modal from '../../../shared/modal/modal';
import './procedure.scss';
import ProcedureMenu from './procedure-menu/procedure-menu';
import EditCard from './edit-card/edit-card';

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
      modalContent: null,
      isEditTitle: false,
    };

    this.drop = this.drop.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.onToggleTitle = this.onToggleTitle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitCard = this.submitCard.bind(this);
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

  toggleModal(cardInfo) {
    return () => this.setState({modalContent: cardInfo});
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

  submitCard(updatedCard, isNew) {
    this.props.onChangeCard(updatedCard, isNew);
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
          <ProcedureMenu />
        </div>
        <div className="cards-container" onDragOver={this.allowDrop} onDrop={this.drop}>
          {(cards || []).map(card =>
            <Card info={card} key={card.id} onClick={this.toggleModal(card)} />
          )}
        </div>

        <Modal show={this.state.modalContent} title="详情" onClose={this.toggleModal(null)}>
          <EditCard card={this.state.modalContent} onSubmit={this.submitCard} />
        </Modal>
      </div>
    );
  }
}
