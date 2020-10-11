const getResponse = (status, message, data = null, other = null) => {
  let response = {};
  response.status = status;
  response.message = message;
  if (data !== null) {
    response.data = data;
  }
  if (other !== null) {
    response.other = other;
  }
  return response;
};

const validateParams = (request, feilds) => {
  var postKeys = [];
  var missingFeilds = [];
  for (var key in request.body) {
    postKeys.push(key);
  }
  for (var i = 0; i < feilds.length; i++) {
    if (postKeys.indexOf(feilds[i]) >= 0) {
      if (
        request.body[feilds[i]] === "" ||
        request.body[feilds[i]] === undefined
      )
        missingFeilds.push(feilds[i]);
    } else {
      missingFeilds.push(feilds[i]);
    }
  }
  if (missingFeilds.length > 0) {
    let response = getResponse(
      false,
      `Following fields are required : ${missingFeilds}`
    );
    return response;
  }
  let response = getResponse(true, ``);
  return response;
};

const validateData = (request, feilds) => {
  var postKeys = request.body;
  var missingFeilds = [];
  if (!feilds.sell_type.includes(postKeys.sell_type)) {
    missingFeilds.push(`sell_type`);
  }
  if (!feilds.asset_type.includes(postKeys.asset_type)) {
    missingFeilds.push("asset_type");
  }
  if (missingFeilds.length > 0) {
    let response = getResponse(
      false,
      `Required data is missing in field : ${missingFeilds}`
    );
    return response;
  }
  let response = getResponse(true, ``);
  return response;
};

module.exports = {
  validateParams,
  getResponse,
  validateData,
};
