module.exports = class ResponseData {
  /**
   * @param {{ [key : any] : any }} data
   * @param { MetaData } metaData
   */
  constructor(data = {}, metaData) {
    this.data = data;
    this.metaData = metaData;
  }
};
