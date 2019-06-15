import React from 'react';
import { CARD_DELETE, CARD_PROMOTE } from '../../../../constants';
import { connect } from 'react-redux';

const Card = ({info, pid, onOpenModal, deleteCard, promoteCard}) => {
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  }

  function cardDelete(e) {
    deleteCard(info.id, pid);
    e.stopPropagation();
  }

  function cardPromote(e) {
    promoteCard(info, pid);
    e.stopPropagation();
  }

  return (
    <div className="card m-1" draggable="true" onDragStart={dragStart} id={info.id} onClick={onOpenModal}>
      <div className="card-body">
        <h5 className="card-title">{info.dest}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{info.pos} {info.date}</h6>
        <p className="card-text">{info.contact.recruiter} / {info.contact.phone} / {info.contact.email}</p>
        <button className="btn btn-outline-primary">简历</button>
        <a href={info.submittedUrl} className="card-link ml-2">投递网站</a>
      </div>
      <div className="d-flex justify-content-between">
        <i className="fa fa-trash text-danger m-1" onClick={cardDelete}/>
        <i className="fa fa-hand-o-right text-primary m-1" onClick={cardPromote}/>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => (
  {
    deleteCard(cid, pid) {
      dispatch({type: CARD_DELETE, payload: {cid, pid}});
    },
    promoteCard(card, pid) {
      dispatch({type: CARD_PROMOTE, payload: {card, pid}});
    }
  }
)

export default connect(
  null,
  mapDispatchToProps
)(Card);