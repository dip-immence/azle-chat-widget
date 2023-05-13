import axios from 'axios';
import { API_URL, API_VERSION } from '../utils/const';

export default axios.create({
  baseURL: `${API_URL}${API_VERSION}`,
  headers: {},
});
