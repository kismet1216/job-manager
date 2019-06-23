import React from 'react';
import { connect } from 'react-redux';
import http from '../../../../shared/services/http';
import { setProcedureAction } from '../../../../redux/actions/set-procedure.action';
import { CARD_MOVE } from '../../../../constants';

const Card = ({info, pid, onOpenModal, updateProcedure, moveCard}) => {
  function dragStart(e) {
    const draggedCardIdAndPid = e.target.id + '-' + pid;
    e.dataTransfer.setData('text/plain', draggedCardIdAndPid);
  }

  function cardDelete(e) {
    http.delete(`/card/${info.id}`).then(procedure => {
      updateProcedure(procedure);
    });
    e.stopPropagation();
  }

  function cardPromote(e) {
    moveCard(info.id, pid);
    e.stopPropagation();
  }

  function showResume(e) {
    e.stopPropagation();
    http.get(`/download/${info.resumeId}`).then();
  }

  return (
    <div className="card m-1" draggable="true" onDragStart={dragStart} id={info.id} onClick={onOpenModal}>
      <div className="card-body">
        <h5 className="card-title">{info.company}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{info.position} {info.date}</h6>
        <p className="card-text">{info.contact.recruiter} / {info.contact.phone} / {info.contact.email}</p>
        <button className="btn btn-outline-primary" onClick={showResume}>简历</button>
        <a href={info.submittedUrl} className="card-link ml-2">投递网站</a>
      </div>
      <div className="d-flex justify-content-between">
        <i className="fa fa-trash text-danger m-1" onClick={cardDelete} />
        <i className="fa fa-hand-o-right text-primary m-1" onClick={cardPromote} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => (
  {
    updateProcedure(newProcedure) {
      dispatch(setProcedureAction(newProcedure));
    },
    moveCard(cid, opid) {
      dispatch({type: CARD_MOVE, payload: {cid, opid}});
    }
  }
);

export default connect(
  null,
  mapDispatchToProps
)(Card);