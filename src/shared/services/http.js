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
  }
};

export default http;
