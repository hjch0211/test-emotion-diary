module.exports = class CoreError extends Error {
  /**
   * @param {{status : number; message : string}} metaData
   */
  constructor(metaData) {
    super(message);
    this.status = metaData.status;
    this.message = message;
  }
};
