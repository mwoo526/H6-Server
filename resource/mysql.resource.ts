import * as mysql from 'mysql';

export module mysqlResource {
	export const conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'h6'
	});
}