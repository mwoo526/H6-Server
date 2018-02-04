import { encriptionPw } from '../../../packages/utils/encryption.utli';
import { mysqlResource } from '../../../packages/utils/mysql.util';

const conn = mysqlResource.conn;

class SignIn{
	/**
	 * model: 로그인
	 * @param userData
	 * @returns {Promise<any>}
	 */
	getUser(userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await conn.query(`SELECT * from users where userId=?`, [userData.userId], function (err, rows) {
				if (err) {
					reject(err);
				} else {
					let err = {
						message: 'The ID does not exist'
					};
					if (rows.length === 0){
						reject(err);
					} else {
						if (rows[0].userPw === encriptionPw.getHash(userData.userPw)){
							resolve(rows);
						} else{
							err.message = 'The password is incorrect';
							reject(err);
						}
					}
				}
			})
		})
	}
}

export const signIn: SignIn = new SignIn();