import { encriptionPw } from '../../../packages/utils/encryption.util';
import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class User {
	constructor() {
	}

	/**
	 * model: user 생성
	 * @param userData
	 * @returns {Promise<any>}
	 */
	createUser(userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO user SET ?`, [userData], function(err) {
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

	/**
	 * model: userLog 생성
	 * @param userLogData
	 * @returns {Promise<any>}
	 */
	createUserLog(userLogData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO userLog SET ?`, [userLogData], function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(userLogData);
					}
				})
			})
		})
	}

	/**
	 * model: user 리스트 조회
	 * @returns {Promise<any>}
	 */
	listUser(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM user`, function(err, rows) {
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
	 * model: user page 리스트 조회
	 * @returns {Promise<any>}
	 */
	pageListUser(page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT * FROM user ORDER BY userIndex ASC LIMIT ${start}, ${count}`, function(err, rows) {
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
	 * model: user userId 조회
	 * @param {number} userId
	 * @returns {Promise<any>}
	 */
	getUser(userId: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM user WHERE userId = ?`, [userId], function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						if (rows == '') {
							reject('The ID does not exist');
						}
						connection.release();
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: user 업데이트
	 * @param {number} userId
	 * @param userData
	 * @returns {Promise<any>}
	 */
	updateUser(userId: string, userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE user SET ? WHERE userId = ?`, [userData, userId], function(err, rows) {
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
	 * model: user 비밀번호 조회
	 * @param {string} userId
	 * @param userPw
	 * @returns {Promise<any>}
	 */
	getUserPassword(userId: string, userPw: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * from user WHERE userId = ?`, [userId], async function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						if (rows[0].userPw === await encriptionPw.getHash(userPw)) {
							connection.release();
							resolve(rows);
						} else {
							await connection.release();
							return reject('The password is incorrect');
						}
					}
				})
			})
		})
	}

	/**
	 * model: user 비밀번호 업데이트
	 * @param {string} userId
	 * @param userPw
	 * @returns {Promise<any>}
	 */
	updateUserPassword(userId: string, userPw: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				userPw = encriptionPw.getHash(userPw);
				await connection.query(`UPDATE user SET userPw=? WHERE userId=?`, [userPw, userId], function(err, rows) {
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
	 * model: user 삭제
	 * @param {number} userId
	 * @returns {Promise<any>}
	 */
	deleteUser(userId: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`DELETE FROM user WHERE userId = ?`, [userId], function(err, rows) {
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
	 * model: 인증여부 업데이트
	 * @param {string} userId
	 * @returns {Promise<any>}
	 */
	updateIsValidation(userId: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE user set isValidation = '${1}' WHERE userId = ?`, [userId], (err, rows) => {
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
	 * model: 인증기간 검증
	 * @param year
	 * @param month
	 * @param day
	 * @returns {boolean}
	 */
	isValidOnData(uvUpdatedAt: any): boolean {
		uvUpdatedAt = JSON.stringify(uvUpdatedAt);
		uvUpdatedAt = uvUpdatedAt.split('"')[3];

		let uvDate = uvUpdatedAt.split('T')[0].split('-');
		let year = parseInt(uvDate[0]);
		let month = parseInt(uvDate[1]);
		let day = parseInt(uvDate[2]);

		let date = new Date();
		let curYear = date.getFullYear();
		let curMonth = date.getMonth() + 1;
		let curDay = date.getDate();

		let diffYear = curYear - year;
		let diffMonth = curMonth - month;
		let diffDay = curDay - day;

		if (diffYear == 1 && curMonth == 1 && curDay == 1) {
			return true;
		}
		if (diffYear == 0) {
			if (diffMonth == 1 && curDay == 1) {
				return true;
			}
			if (diffMonth == 0 && diffDay <= 1) {
				return true;
			}
		}
		return false;
	}
}

export const user: any = new User();