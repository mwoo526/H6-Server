import * as mysql from 'mysql';

/** MySQL DB 연결 */
export module mysqlResource {
	export const pool = mysql.createPool({
        host     : 'h6.cpgkhytb1iav.ap-northeast-2.rds.amazonaws.com',
        user     : 'h6_root',
        password : 'h6mysqldb',
        database : 'h6',
        timezone : 'UTC',
        connectionLimit:50,
        waitForConnections:true
    });
}