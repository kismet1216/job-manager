import { CARD_ADD, CARD_EDIT } from '../../constants';

export const doCardAction = (card, pid, isNew) => {
  if (isNew) {
    return {type: CARD_ADD, payload: {card, pid}};
  }
  return {type: CARD_EDIT, payload: {card, pid}};
};
