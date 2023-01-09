module.exports = class MetaData {
  constructor(status = 500, message = "internal error") {
    this.status = status;
    this.message = message;
  }
};
