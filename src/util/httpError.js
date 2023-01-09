module.exports = class CoreError extends Error {
  constructor(status = 500, message = "internal error") {
    super(message);
    this.status = status;
    this.message = message;
  }
};
