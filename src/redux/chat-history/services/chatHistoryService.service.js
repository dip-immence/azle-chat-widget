import { LIVE_CHAT_HISTORY } from '../../../api/api-end-point';
import commonAPI from '../../../api/common';
import { API_VERSION, API_URL } from '../../../utils/const';

class chatHistoryService {
  getChatHistory(data) {
    return commonAPI.get(
      `${API_URL}${API_VERSION}${LIVE_CHAT_HISTORY}?businessOwnerId=${data.businessOwnerId}&customerId=${data.customerId}`
    );
  }
}

export default new chatHistoryService();
