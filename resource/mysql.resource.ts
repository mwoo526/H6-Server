import * as mysql from 'mysql';

/** MySQL DB 연결 */
export module mysqlResource {
	export const conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'ajs141749',
		database : 'h6'
	});

	conn.connect();
}