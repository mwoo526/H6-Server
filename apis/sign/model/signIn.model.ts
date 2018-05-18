import * as jwt from 'jsonwebtoken';
import { encriptionPw } from '../../../packages/utils/encryption.utli';
import { jwtToken } from '../../../packages/utils/jwt.util';
import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

class SignIn {
	/**
	 * model: 로그인
	 * @param userData
	 * @returns {Promise<any>}
	 */
	getUser(userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * from users WHERE userId = ?`, [userData.userId], async function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						let err = 'The ID does not exist';
						if (rows.length === 0) {
							await connection.release();
							return reject(err);
						} else {
							if (rows[0].userPw === encriptionPw.getHash(userData.userPw)) {
								connection.release();

								jwt.sign(
									{
										tokenIndex:rows[0].userIndex,
										tokenId: rows[0].userId,
										tokenNickname: rows[0].userNickName,
										tokenMajor:rows[0].major,
										tokenMinor:rows[0].minor,
										tokenDoubleMajor : rows[0].doubleMajor,
										tokenConnectedMajor : rows[0].connectedMajor,
										tokenAdmissionYear : rows[0].year,
										tokenInValidation : rows[0].isValidations
									},
									jwtToken.secret,
									{
										algorithm: jwtToken.algorithm,
										expiresIn: jwtToken.expiresln
									}, (err, token) => {
										if (err) {
											return reject('The jwt is incorrect');
										}
										resolve(token)
									})
							} else {
								await connection.release();
								return reject('The password is incorrect');
							}
						}
					}
				})
			})
		})
	}
}

export const signIn: SignIn = new SignIn();
