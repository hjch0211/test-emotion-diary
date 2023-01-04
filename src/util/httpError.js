module.exports = class CoreError extends Error {
  status = 500;
  message = "internal error";
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
};

class WhatError extends CoreError {
  constructor(status = "300", message = "what") {
    super(status, message);
  }
}

throw new WhatError();
