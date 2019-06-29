import { call, put, select } from 'redux-saga/effects';
import moveCardApi from '../../shared/api/move-card.api';
import { PROCEDURES_SET } from '../../constants';

export default function* fetchMoveCard({payload}) {
  try {
    const oldProcedures = yield select((store) => store.proceduresState);

    // drag && drop
    let npid = payload.npid;  

    // move right or move left
    if (!npid) {
      if (payload.opid === oldProcedures[oldProcedures.length - 1].id && !payload.moveLeft) {
        // 旧ID是最后一个并且右移
        return;
      } else if (payload.opid === oldProcedures[0].id && payload.moveLeft) {
        // 旧ID是第一个并且左移
        return;
      } else if (payload.moveLeft) {
        npid = oldProcedures[oldProcedures.findIndex(p => p.id === payload.opid) - 1].id;
      } else {
        npid = oldProcedures[oldProcedures.findIndex(p => p.id === payload.opid) + 1].id;
      }
    }
    const procedures = yield call(moveCardApi, payload.cid, npid);
    yield put({type: PROCEDURES_SET, payload: procedures});
  } catch {
  }
}
