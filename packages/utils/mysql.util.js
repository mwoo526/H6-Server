"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const mysql = require("mysql");
/** MySQL DB 연결 */
var mysqlUtil;
(function (mysqlUtil) {
  mysqlUtil.pool = mysql.createPool({
    host: 'h6.cpgkhytb1iav.ap-northeast-2.rds.amazonaws.com',
    user: 'h6_root',
    password: 'h6mysqldb',
    database: 'h6',
    timezone: 'UTC',
    connectionLimit: 50,
    waitForConnections: true
  });
})(mysqlUtil = exports.mysqlUtil || (exports.mysqlUtil = {}));
//# sourceMappingURL=mysql.util.js.map