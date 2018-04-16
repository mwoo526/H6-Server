import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class SignUp {
	constructor() {
	}

	/**
	 * verify: 회원가입
	 * @param userData
	 * @returns {Promise<any>}
	 */
	createUser(userData: any): Promise<any> {
		let result: any;
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO users SET ?`, [userData], async function(err, rows) {
					if (err) {
						await connection.release();
						result = {
							success: false,
							statusCode: 409,
							message: 'createUser: 회원가입 실패'
						};
						reject(err);
					} else {
						await connection.release();
						result = {
							success: true,
							statusCode: 200,
							message: 'createUser: 회원가입 성공'
						};
						resolve(result);
					}
				});
			})
		})
	}
}

export const signUp: SignUp = new SignUp();
