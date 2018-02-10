import { encriptionPw } from '../../../packages/utils/encryption.utli';
import { mysqlUtil } from '../../../packages/utils/mysql.util';
const pool = mysqlUtil.pool;

class SignIn{
	/**
	 * model: 로그인
	 * @param userData
	 * @returns {Promise<any>}
	 */
	getUser(userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * from users WHERE userId = ?`, [userData.userId], function (err, rows) {
					if (err) {
                        connection.release();
                        reject(err);
					} else {
                        let err = {
                            message: 'The ID does not exist'
                        };
                        if (rows.length === 0){
                            connection.release();
                            reject(err);
                        } else {
                            if (rows[0].userPw === encriptionPw.getHash(userData.userPw)){
                                connection.release();
                                resolve(rows);
                            } else{
                                err.message = 'The password is incorrect';
                                connection.release();
                                reject(err);
                            }
                        }
					}
				})
			})
		})
	}
}

export const signIn: SignIn = new SignIn();