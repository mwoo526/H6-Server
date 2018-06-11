import { encriptionPw } from '../../../packages/utils/encryption.utli';
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
				await connection.query(`INSERT INTO users SET ?`, [userData], function(err) {
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
	 * model: user 리스트 조회
	 * @returns {Promise<any>}
	 */
	listUser(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM users`, function(err, rows) {
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
				await connection.query(`SELECT * FROM users ORDER BY userIndex ASC LIMIT ${start}, ${count}`, function(err, rows) {
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
	 * model: user studentId 조회
	 * @param {number} studentId
	 * @returns {Promise<any>}
	 */
	getUser(userId: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM users WHERE userId = ?`, [userId], function(err, rows) {
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
	 * model: user 업데이트
	 * @param {number} studentId
	 * @param userData
	 * @returns {Promise<any>}
	 */
	updateUser(userId: string, userData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE users SET ? WHERE userId = ?`, [userData, userId], function(err, rows) {
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
				await connection.query(`SELECT * from users WHERE userId = ?`, [userId], async function(err, rows) {
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
				await connection.query(`UPDATE users SET userPw=? WHERE userId=?`, [userPw, userId], function(err, rows) {
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
	 * @param {number} studentId
	 * @returns {Promise<any>}
	 */
	deleteUser(userId: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`DELETE FROM users WHERE userId = ?`, userId, function(err, rows) {
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
	 * model: 인증기간 검증
	 * @param year
	 * @param month
	 * @param day
	 * @returns {boolean}
	 */
	isValidOnDate(year, month, day) {
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