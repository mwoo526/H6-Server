import { emailUtil } from '../../../packages/utils/email.util';
import { encriptionPw } from '../../../packages/utils/encryption.util';
import { mysqlUtil } from '../../../packages/utils/mysql.util';
import { user } from '../../user/model/user.model';
import smtpTransport = emailUtil.smtpTransport;

const pool = mysqlUtil.pool;

export class UserValidation {
	constructor() {
	}

	/**
	 * model: userValidation 생성
	 * @param userData
	 * @returns {Promise<any>}
	 */
	createUserValidation(userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO usersValidation SET ?`, [userData], async function(err, rows) {
					if (err) {
						await connection.release();
						return reject(err);
					} else {
						await connection.release();
						return resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: 인증코드 조회
	 * @param {string} userId
	 * @returns {Promise<any>}
	 */
	getValidationCode(userId: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM usersValidation WHERE userId=?`, [userId], function(err, rows) {
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

	/**
	 * model: 인증코드 체크
	 * @param {string} userId
	 * @param userData
	 * @param validationCode
	 * @returns {Promise<any>}
	 */
	checkValidationCode(userId: string, userData: any, validationCode: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			const getValidationCode: any = await this.getValidationCode(userId);
			if (userData[0].userEmail == null) {
				throw new Error('The email does not exist.');
			}
			else {
				const result = await userValidation.getValidationCode(userId);
				if (result[0].validationCode == validationCode) {
					const result: any = await userValidation.updateIsValidation(userId);
					resolve(result);
				}
				else if (getValidationCode[0].isValidation == true) {
					reject('This validation Code is already verified');
				}
				else {
					reject('The validation Code does not correct');
				}
			}
		})
	}

	/**
	 * model: 아이디 중복 검사
	 * @param {string} userId
	 * @returns {Promise<any>}
	 */
	checkUserId(userId: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM users WHERE userId = '${userId}'`, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						if (rows[0] != null) {
							connection.release();
							return reject('Id already exists');
						} else {
							connection.release();
							return resolve(rows);
						}
					}
				})
			})
		})
	}

	/**
	 * model: 닉네임 중복검사
	 * @param {string} userNickName
	 * @returns {Promise<any>}
	 */
	checkUserNickName(userNickName: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM users WHERE userNickName = '${userNickName}'`, async function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						if (rows[0] != null) {
							await connection.release();
							return reject('NickName already exists');
						} else {
							await connection.release();
							return resolve(rows);
						}
					}
				})
			})
		})
	}

	/**
	 * model: 비밀번호 중복검사
	 * @param {string} userPw
	 * @returns {Promise<any>}
	 */
	checkUserPw(userId: string, userPw: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				userPw = await encriptionPw.getHash(userPw);
				await connection.query(`SELECT * FROM users WHERE userId = '${userId}' AND userPw = '${userPw}'`, async function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						if (rows[0] == null) {
							reject('The ID does not exist');
						}
						await connection.release();
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: DB usersValidation 테이블에 uuid 저장하기
	 * @param userId
	 * @param uuid
	 * @returns {Promise<any>}
	 */
	setUuid(userId: any, uuid: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE usersValidation set validationCode='${uuid}' WHERE userId = ?`, [userId], (err, rows) => {
					connection.release();
					if (err) {
						reject('setUuid query error');
					}
					else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: 새로운 비밀번호 발송
	 * @param mailOptions
	 * @returns {Promise<any>}
	 */
	sendPasswordMail(mailOptions: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await smtpTransport.sendMail(mailOptions, (err, res) => {
				if (err) {
					reject('sendPasswordMail error');
				} else {
					resolve('send ok');
				}
			})
		});
	}

	/**
	 * model: 인증메일 발송
	 * @param mailOptions
	 * @returns {Promise<any>}
	 */
	sendValidationMail(mailOptions: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await smtpTransport.sendMail(mailOptions, (err, res) => {
				if (err) {
					reject('sendValidationMail error');
				}
				else {
					resolve('send ok');
				}
			});
		})
	}

	/**
	 * model: uuid 를 통해 DB에 저장된 userId 가져오기
	 * @param uuid
	 * @returns {Promise<any>}
	 */
	getUserIdData(uuid: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT userId FROM usersValidation where validationCode=?`, [uuid], (err, rows) => {
					connection.release();
					if (err) {
						reject(err);
					}
					else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: 최근에 업데이트된 날짜 가져오기
	 * @param userId
	 * @returns {Promise<any>}
	 */
	getUpdatedAt(userId: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT updatedAt FROM usersValidation where userId=?`, [userId], (err, rows) => {
					connection.release();
					if (err) {
						reject(err);
					}
					else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: 인증여부 업데이트
	 * @param userId
	 * @returns {Promise<any>}
	 */
	updateIsValidation(userId: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE users set isValidation='${1}' WHERE userId=?`, [userId], (err, rows) => {
					connection.release();
					if (err) {
						reject(err);
					}
					else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: userValidation 삭제
	 * @param {string} userId
	 * @returns {Promise<any>}
	 */
	deleteUsersValidation(userId: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM usersValidation WHERE userId=?`, [userId], (err, rows) => {
					connection.release();
					if (err) {
						reject(err);
					}
					else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: 인증코드 검증
	 * @param req
	 * @param res
	 * @returns {Promise<void>}
	 */
	verifyValidation(verifiedUuid: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				let uvUserId = await this.getUserIdData(verifiedUuid);
				uvUserId = JSON.stringify(uvUserId);

				/** 해당 데이터가 없으면 [] */
				if (uvUserId == '[]') {
					reject('Unvalidated code Error!');
				}

				let userId = uvUserId.split('"')[3];
				let uvUpdatedAt = await this.getUpdatedAt(userId);

				if (user.isValidOnData(uvUpdatedAt)) {
					await this.updateIsValidation(userId);
					await this.deleteUsersValidation(userId);
					await user.updateIsValidation(userId);
					resolve('Email is been Successfully verified');
				}
				else {
					reject('Validation date expired.');
				}
			} catch (err) {
				reject(err);
			}
		})
	}
}

export const userValidation: UserValidation = new UserValidation();


