const MetaData = require("../../util/metaData");
const ResponseData = require("../../util/ResponseData");

const exceptError = (err, req, res, next) => {
  const response = new ResponseData({}, new MetaData(err.status, err.message));
  res.status(err.status).json(response);
};

module.exports = exceptError;
