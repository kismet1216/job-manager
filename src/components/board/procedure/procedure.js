import React from 'react';
import Card from './card/card';
import Modal from '../../../shared/components/modal/modal';
import './procedure.scss';
import ProcedureMenu from './procedure-menu/procedure-menu';
import EditCard from './edit-card/edit-card';
import { CARD_MOVE } from '../../../constants';
import { connect } from 'react-redux';
import CardEntity from '../../../shared/entities/card.entity';

/**
 * props: {
 *  info: any,
 *  onDrop: () => {},
 *  onChangeTitle: () => {}
 * }
 */
class Procedure extends React.Component {
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
  }

  componentDidMount() {
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drop(e) {
    e.preventDefault();
    const draggedCardIdAndPid = e.dataTransfer.getData('text/plain');
    // [0] is cid, [1] is pid
    const cidAndPid = draggedCardIdAndPid.split('-');
    // leverage logic to parent
    this.props.onDrop(cidAndPid[0], cidAndPid[1], this.props.info.id);
  }

  toggleModal(card) {
    const modalContent = card ? {card, pid: this.props.info.id} : null;
    return () => this.setState({modalContent});
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
          <button className="btn btn-link" onClick={this.toggleModal(new CardEntity())}><i className="fa fa-plus" /></button>

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
            <Card info={card} key={card.id} pid={this.props.info.id} onOpenModal={this.toggleModal(card)} />
          )}
        </div>

        <Modal show={this.state.modalContent} title="详情" onClose={this.toggleModal(null)}>
          <EditCard info={this.state.modalContent} />
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onDrop: function (cid, opid, npid) {
      dispatch( {
        type: CARD_MOVE,
        payload: {cid, opid, npid}
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Procedure);