import { emailUtil } from '../../../packages/utils/email.util';
import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class UserValidation {
	constructor() {
	}

	/**
	 * verify: 인증코드 생성
	 * @param {string} userId
	 * @param {string} email
	 * @param validationCode
	 * @returns {Promise<any>}
	 */
	createValidationCode(userId: string, email: string, validationCode: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await emailUtil.sendEmail('kingdom0608@gmail.com', `${email}@naver.com`, 'test', validationCode);
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE usersValidation SET validationCode = '${validationCode}' WHERE userId = '${userId}'`, function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(validationCode);
					}
				})
			})
		})
	}

	/**
	 * verify: 인증코드 조회
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
	 * verify: 인증코드 체크
	 * @param {string} userId
	 * @param userData
	 * @param validationCode
	 * @returns {Promise<any>}
	 */
	checkValidationCode(userId: string, userData: any, validationCode: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			const getValidationCode: any = await this.getValidationCode(userId);
			if (userData[0].email == null) {
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
	 * verify: 인증여부 업데이트
	 * @param {string} userId
	 * @returns {Promise<any>}
	 */
	updateIsValidation(userId: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE usersValidation SET isValidation = true WHERE userId = '${userId}'`, function(err) {
					if (err) {
						console.log(err);
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(userId);
					}
				})
			})
		})
	}
}

export const userValidation: UserValidation = new UserValidation();
