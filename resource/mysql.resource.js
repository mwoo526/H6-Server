"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
/** MySQL DB 연결 */
var mysqlResource;
(function (mysqlResource) {
    mysqlResource.conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'h6'
    });
    mysqlResource.conn.connect();
})(mysqlResource = exports.mysqlResource || (exports.mysqlResource = {}));
//# sourceMappingURL=mysql.resource.js.map