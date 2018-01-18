import * as mysql from 'mysql';

/** MySQL DB 연결 */
export module mysqlResource {
	export const conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '1234',
		database : 'h6'
	});

	conn.connect();
}