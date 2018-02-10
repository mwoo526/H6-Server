import { mysqlResource } from '../../../packages/utils/mysql.util';
const pool = mysqlResource.pool;

export class SignUp{
	constructor() {
	}

	/**
	 * model: 회원가입
	 * @param userData
	 * @returns {Promise<any>}
	 */
	createUser(userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO users SET ?`, [userData], function (err, rows) {
					if (err) {
                        connection.release();
                        reject(err);
					} else {
                        connection.release();
                        resolve(rows);
					}
				})
			})
		})
	}
}
export const signUp: SignUp = new SignUp();