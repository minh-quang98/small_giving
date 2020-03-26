import axios from "axios";
import {forceLogout, getAccessToken} from "./authority";

let lang = "vi";

let token = getAccessToken();

export const request = (request, callback) =>{
  return fetch(request?.url,request.config)
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      console.log(request.url,">>>>>",JSON.stringify(res));
      callback(res);
    });
};

export const invokeApi = (request, callback) =>{
  console.log("request>>>>>",request);
  return fetch(request?.url,request.config)
    .then(async response => {
      if (response?.status == 401) {
        //TODO: call dispatch logout
        await forceLogout();
      }
      console.log("response>>>>>",response);
      return response.json()
    })
    .then((res) => {
      console.log(request.url,">>>>>",JSON.stringify(res));
      callback(res);
    });
};


// export const requestUpload = (request, callback) =>{
//   let config = {
//     method: request.method,
//     headers: {
//       "Authorization": "Bearer " + token,
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
//
// export const requestv2 = (request, callback) =>{
//   let config = {
//     headers: {
//       "Authorization": "Bearer " + token,
//       "Content-Type": "application/json; charset=UTF-8"
//     }
//   }
//   // return axios.get(request?.url, request?.config).then((res) => {
//   return axios.get(request?.url, config).then((res) => {
//     // if (thrown?.response?.status == 401) {
//     //TODO: call dispatch logout
//     // await forceLogout();
//     // }
//     console.log(`response ${request?.url}>>>`,res.data)
//     callback(res.data);
//   }).catch(function (thrown) {
//     if (axios.isCancel(thrown)) {
//       console.log('First request canceled', thrown?.message);
//     } else {
//       // handle error
//       if (thrown?.response?.status == 401) {
//         //TODO: call dispatch logout
//         forceLogout();
//       }
//
//       console.log('thrown>>>>>>>>>',"URL:"+request.url, thrown.message)
//     }
//   });
// };
