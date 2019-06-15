import { CARD_ADD, CARD_EDIT, PROCEDURE_ADD, PROCEDURES_SET, CARD_DELETE, CARD_PROMOTE } from '../../constants';
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
    case CARD_PROMOTE:
      return promoteCard(state, action.payload); 
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
    draft.find( p => p.id === pid )
          .cards
          .splice(cid, 1);
  });
}

const promoteCard = (procedures, {card, pid}) =>  (
  produce(procedures, draft => {
    draft[draft.findIndex(p => p.id === pid) + 1]
        .cards
        .push(card);
    const cards = draft.find( p => p.id === pid ).cards;
    cards.splice(cards.findIndex(c => c.id === card.id), 1);
  })
)


export default proceduresReducer;
