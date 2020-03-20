import {request} from "../utils/apiUtils";

export async function getRank(callback) {
    return request({
      url:`https://misappmobile.000webhostapp.com/Bangxephang/bangxephang.php`,
      method: 'GET'
    }, callback)
}
