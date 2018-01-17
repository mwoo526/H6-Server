import * as mysql from 'mysql';

export module mysqlResource {
	export const conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '1234',
		database : 'h6'
	});
}