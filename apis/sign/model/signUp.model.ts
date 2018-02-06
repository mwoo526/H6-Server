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
				await connection.query(`INSERT INTO users SET ?`, [userData], function (err) {
					if (err) {
                        connection.release();
                        reject(err);
					} else {
                        connection.release();
                        resolve(userData);
					}
				})
			})
		})
	}
}
export const signUp: SignUp = new SignUp();