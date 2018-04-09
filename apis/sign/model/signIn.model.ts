import * as jwt from 'jsonwebtoken';
import { encriptionPw } from '../../../packages/utils/encryption.utli';
import { jwtToken } from '../../../packages/utils/jwt.util';
import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

class SignIn {
	/**
	 * tokenVerify: 로그인
	 * @param userData
	 * @returns {Promise<any>}
	 */
	getUser(userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * from users WHERE userId = ?`, [userData.userId], function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						let err = {
							message: 'The ID does not exist'
						};
						if (rows.length === 0) {
							connection.release();
							reject(err);
						} else {
							if (rows[0].userPw === encriptionPw.getHash(userData.userPw)) {
								connection.release();

								jwt.sign(
									{
										tokenIndex:rows[0].userIndex,
										tokenId: rows[0].userId,
										tokenNickname: rows[0].userNickName,
										tokenEmail:rows[0].email,
										tokenMajor:rows[0].major,
										tokenMinor:rows[0].minor,
										tokenDoubleMajor : rows[0].doubleMajor,
										tokenConnectedMajor : rows[0].connectedMajor,
										tokenAdmissionYear : rows[0].year
									},
									jwtToken.secret,
									{
										algorithm: jwtToken.algorithm,
										expiresIn: jwtToken.expiresln
									}, (err, token) => {
										if (err) {
											throw new Error('The jwt is incorrect');
										}
										resolve(token)
									})
							} else {
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
