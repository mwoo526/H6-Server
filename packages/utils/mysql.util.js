"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
/** MySQL DB 연결 */
var mysqlResource;
(function (mysqlResource) {
    mysqlResource.pool = mysql.createPool({
        host: 'h6.cpgkhytb1iav.ap-northeast-2.rds.amazonaws.com',
        user: 'h6_root',
        password: 'h6mysqldb',
        database: 'h6',
        timezone: 'UTC',
        connectionLimit: 50,
        waitForConnections: true
    });
})(mysqlResource = exports.mysqlResource || (exports.mysqlResource = {}));
//# sourceMappingURL=mysql.util.js.map