import http from '../services/http';

export default function moveCardApi(cid, npid) {
  return http.get(`/card/move/${cid}/${npid}`);
}

