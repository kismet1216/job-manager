import { CARD_MOVE } from '../../constants';
import { takeEvery } from 'redux-saga/effects';
import fetchMoveCard from './move-card.saga';

export default function* mySaga() {
  yield takeEvery(CARD_MOVE, fetchMoveCard);
}
