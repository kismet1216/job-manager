import { CARD_ADD, CARD_EDIT, PROCEDURE_ADD, PROCEDURES_SET, CARD_DELETE,  CARD_MOVE } from '../../constants';
import { produce } from 'immer';

const proceduresReducer = (state = [], action) => {
  switch (action.type) {
    case PROCEDURES_SET:
      return action.payload;
    case PROCEDURE_ADD:
      return [...state, action.payload];
    case CARD_EDIT:
      return editCard(state, action.payload);
    case CARD_ADD:
      return addCard(state, action.payload);
    case CARD_DELETE:
      return deleteCard(state, action.payload);
    case CARD_MOVE:
      return moveCard(state, action.payload);
    default:
      return state;
  }
};


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
    const procedure = draft.find( p => p.id === pid );
    procedure.cards = procedure.cards.filter(c => c.id !== cid);
  });
}

const moveCard = (procedures, {cid, opid, npid}) => {
  if (!npid) {
    npid = procedures[procedures.findIndex( p => p.id === opid) + 1].id;
  }
  if (npid !== opid) {
    return produce(procedures, draft => {
      let procedure = draft.find( p => p.id === opid);      //find current procedure ID
      let card = procedure.cards.find(c => c.id === cid);   //find card
      draft.find(p => p.id === npid).cards.push(card);      //find target procedure ID and push card
      procedure.cards = procedure.cards.filter(c => c.id !== cid);
    })
  }

  return procedures;
}


export default proceduresReducer;
