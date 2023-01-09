const MetaData = require("../util/metaData");

module.exports = class ResponseData {
  /**
   * @param {{ [key : any] : any }} data
   * @param { MetaData } metaData
   */
  constructor(data = {}, metaData = new MetaData(200, "success")) {
    this.data = data;
    this.metaData = metaData;
  }
};
