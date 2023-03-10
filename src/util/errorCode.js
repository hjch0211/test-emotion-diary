const HttpError = require("../util/httpError");

module.exports = ERROR = {
  BAD_REQUEST: new HttpError(400, "요청 형식이 올바르지 않습니다."),
  DUPLICATE_EMAIL: new HttpError(400, "이메일이 중복되었습니다."),
  INVALID_USERDATA: new HttpError(400, "유저 정보가 없습니다."),
  INVALID_TOKEN: new HttpError(400, "토큰이 유효하지 않습니다."),
  INVALID_USER: new HttpError(400, "사용자를 찾을 수 없습니다."),
  EXCEEDED_REQUEST: new HttpError(400, "요청 수가 초과되었습니다. 잠시 후에 다시 요청해주세요."),
  DEPRECATED: new HttpError(400, "새로운 버전이 나왔습니다. 새로운 버전을 사용하세요."),
};
