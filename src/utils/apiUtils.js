import axios from "axios";
import {forceLogout, getAccessToken} from "./authority";
let lang = "vi";

let token = getAccessToken();

export const request = (request, callback) =>{
  let config = {
    method: request.method,
    headers:  {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept-Language": lang
    },
    body: JSON.stringify(request.body)
    // body: request.body
  }
  return fetch(request?.url,config)
    .then(async response => {
      return response.json()
    })
    .then((res) => {
      callback(res);
    });
};

// export const requestUpload = (request, callback) =>{
//   let config = {
//     method: request.method,
//     headers: {
//       // "Authorization": "Bearer " + token,
//       // "Content-Type": "multipart/form-data",
//       "Accept-Language": lang
//     },
//     // body: JSON.stringify(request.body)
//     body: request.body
//   }
//   return fetch(request?.url,config)
//     .then(async response => {
//       if (response?.status == 401) {
//         await forceLogout();
//       }
//       return response.json()
//     })
//     .then((res) => {
//       callback(res);
//     });
// };


