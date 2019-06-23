import { call, put, select } from 'redux-saga/effects';
import moveCardApi from '../../shared/api/move-card.api';
import { PROCEDURES_SET } from '../../constants';

export default function* fetchMoveCard({payload}) {
  try {
    const oldProcedures = yield select((store) => store.procedures);
    let npid = payload.npid;
    if (!npid) {
      npid = oldProcedures[oldProcedures.findIndex(p => p.id === payload.opid) + 1].id;
    }
    const procedures = yield call(moveCardApi, payload.cid, npid);
    yield put(PROCEDURES_SET, procedures);
  } catch {
  }
}
