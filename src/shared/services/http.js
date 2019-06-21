import axios from 'axios';
import { END_POINT } from '../../constants';

const http = {
  get(url) {
    return axios.get(END_POINT + url)
                .then(res => res.data);
  },
  post(url, req) {
    return axios.post(END_POINT + url, req)
                .then(res => res.data);
  },
  put(url, req) {
    return axios.put(END_POINT + url, req)
                .then(res => res.data);
  },
  delete(url) {
    return axios.delete(END_POINT + url)
                .then(res => res.data);
  }
};

export default http;
