import { LIVE_CHAT_CHECK_CUSTOMER } from '../../../api/api-end-point';
import commonAPI from '../../../api/common';
import { API_URL, API_VERSION } from '../../../utils/const';

class checkCustomerService {
  postCheckCustomer(data) {
    return commonAPI.post(`${API_URL}${API_VERSION}${LIVE_CHAT_CHECK_CUSTOMER}`, data);
  }
}

export default new checkCustomerService();
