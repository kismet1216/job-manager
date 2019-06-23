import { CARD_ADD, CARD_EDIT, PROCEDURE_ADD, PROCEDURES_SET, CARD_DELETE, PROCEDURE_SET } from '../../constants';
import { produce } from 'immer';

const proceduresReducer = (state = [], action) => {
  switch (action.type) {
    case PROCEDURES_SET:
      return action.payload;
    case PROCEDURE_SET:
      return setProcedure(state, action.payload);
    case PROCEDURE_ADD:
      return addProcedure(state, action.payload);
    case CARD_EDIT:
      return editCard(state, action.payload);
    case CARD_ADD:
      return addCard(state, action.payload);
    case CARD_DELETE:
      return deleteCard(state, action.payload);
    default:
      return state;
  }
};

const setProcedure = (procedures, procedure) => {
  return produce(procedures, draft => {
    draft[draft.findIndex(p => p.id === procedure.id)] = procedure;
  });
};

const addProcedure = (procedures, procedure) => [...procedures, procedure];

const editCard = (procedures, {card, pid}) => (
  produce(procedures, draft => {
    const oldCard = draft.find(p => p.id === pid)
                         .cards
                         .find(c => c.id === card.id);
    Object.assign(oldCard, card);
  })
);

const addCard = (procedures, {card, pid}) => (
  produce(procedures, draft => {
    draft.find(p => p.id === pid)
         .cards
         .push(card);
  })
);

const deleteCard = (procedures, {cid, pid}) => {
  return produce(procedures, draft => {
    const procedure = draft.find(p => p.id === pid);
    procedure.cards = procedure.cards.filter(c => c.id !== cid);
  });
};

export default proceduresReducer;
