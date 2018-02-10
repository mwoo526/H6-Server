import { mysqlUtil } from '../../../packages/utils/mysql.util';

const conn = mysqlUtil.conn;

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
			await conn.query(`INSERT INTO users SET ?`, [userData], async function (err) {
				if (err) {
					reject(err);
				} else {
					resolve(userData);
				}
			});
			await conn.query(`INSERT INTO usersValidation (userId) VALUES ('${userData.userId}')`, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve(userData);
				}
			});
		})
	}
}
export const signUp: SignUp = new SignUp();