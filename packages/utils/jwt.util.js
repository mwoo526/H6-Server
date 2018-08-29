"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var jwtToken;
(function (jwtToken) {
  jwtToken.secret = 'MySecret';
  jwtToken.algorithm = 'HS256';
  jwtToken.expiresln = '24h';
})(jwtToken = exports.jwtToken || (exports.jwtToken = {}));
//# sourceMappingURL=jwt.util.js.map