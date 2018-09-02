"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const mysql = require("mysql");
/** MySQL DB 연결 */
var mysqlUtil;
(function (mysqlUtil) {
    const file = './packages/utils/config/mysql.json';
    let mysqlData = fs.readFileSync(file, 'utf8');
    mysqlData = JSON.parse(mysqlData);
    mysqlUtil.pool = mysql.createPool({
        host: mysqlData.host,
        user: mysqlData.user,
        password: mysqlData.password,
        database: mysqlData.database,
        timezone: mysqlData.timezone,
        connectionLimit: mysqlData.connectionLimit,
        waitForConnections: mysqlData.waitForConnections
    });
})(mysqlUtil = exports.mysqlUtil || (exports.mysqlUtil = {}));
//# sourceMappingURL=mysql.util.js.map