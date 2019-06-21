import React from 'react';
import Card from './card/card';
import Modal from '../../../shared/components/modal/modal';
import './procedure.scss';
import ProcedureMenu from './procedure-menu/procedure-menu';
import EditCard from './edit-card/edit-card';
import { CARD_MOVE } from '../../../constants';
import { connect } from 'react-redux';
import CardEntity from '../../../shared/entities/card.entity';
import http from '../../../shared/services/http';
import { setProcedureAction } from '../../../redux/actions/set-procedure.action';
import Popover from '../../../shared/components/popover/popover';

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
      localTitle: this.props.info.title,
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
    this.props.onDrop(parseInt(cidAndPid[0], 10), parseInt(cidAndPid[1], 10), this.props.info.id);
  }

  toggleModal(card) {
    const modalContent = card ? {card, pid: this.props.info.id} : null;
    return () => this.setState({modalContent});
  }

  onToggleTitle() {
    this.setState(prev => {
      if (prev.isEditTitle) {
        http.post('/procedure', {...this.props.info, title: prev.localTitle}).then(newProcedure => {
          this.props.updateProcedure(newProcedure);
        });
      }
      return {
        isEditTitle: !prev.isEditTitle
      };
    });
  }

  changeTitle(e) {
    this.setState({localTitle: e.target.value});
  }

  render() {
    const {cards, id} = this.props.info;
    return (
      <div className="procedure border rounded text-center">
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-link" onClick={this.toggleModal(new CardEntity())}><i className="fa fa-plus" /></button>

          {this.state.isEditTitle ?
            <div>
              <input type="text" value={this.state.localTitle} onChange={this.changeTitle} autoFocus={true} />
              <button className="btn btn-outline-primary" onClick={this.onToggleTitle}>
                ok
              </button>
            </div>
            :
            <div onClick={this.onToggleTitle}>
              {this.state.localTitle}
            </div>
          }
          <Popover width="200px" trigger={<button className="btn btn-link"><i className="fa fa-bars" /></button>}>
            <ProcedureMenu pid={id} />
          </Popover>
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
    updateProcedure: (procedure) => {
      dispatch(setProcedureAction(procedure));
    },
    onDrop: function (cid, opid, npid) {
      dispatch({
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