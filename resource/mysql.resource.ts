import * as mysql from 'mysql';

export module mysqlResource {
	export const conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'ajs141749',
		database : 'h6'
	});
}