import {invokeApi,request} from "../utils/apiUtils";
import { forceLogout } from '../utils/authority';
let bangXepHangApi = {};

bangXepHangApi.getRank = function getRank(callback) {
  let request = {
    url: 'https://misappmobile.000webhostapp.com/Bangxephang/bangxephang.php',
    config: {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
    }
  };

  return invokeApi(request, callback);
}

export default bangXepHangApi;
