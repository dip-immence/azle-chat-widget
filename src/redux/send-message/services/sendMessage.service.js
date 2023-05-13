import { LIVE_CHAT_SEND_MESSAGE } from '../../../api/api-end-point';
import commonAPI from '../../../api/common';
import { API_URL, API_VERSION } from '../../../utils/const';

class sendMessageService {
  postSendMessage(data) {
    return commonAPI.post(`${API_URL}${API_VERSION}${LIVE_CHAT_SEND_MESSAGE}`, data);
  }
}

export default new sendMessageService();
