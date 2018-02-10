import * as mysql from 'mysql';

/** MySQL DB 연결 */
export module mysqlUtil {
	export const conn = mysql.createConnection({
        host     : 'h6.cpgkhytb1iav.ap-northeast-2.rds.amazonaws.com',
        user     : 'h6_root',
        password : 'h6mysqldb',
        database : 'h6',
        timezone : 'UTC'
	});
	conn.connect();
}