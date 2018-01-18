import { mysqlResource } from '../../../resource/mysql.resource';

const conn = mysqlResource.conn;

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
			await conn.query(`INSERT INTO users SET ?`, [userData], function (err) {
				if (err) {
					reject(err);
				} else {
					resolve(userData);
				}
			})
		})
	}
}
export const signUp: SignUp = new SignUp();