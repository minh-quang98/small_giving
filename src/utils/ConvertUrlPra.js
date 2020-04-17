let covnert = {};

covnert.urlParams = (url) => {
  return JSON.parse('{"' + decodeURI(url.replace("?","").replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
};


export default covnert;
