import { mysqlResource } from '../../../resource/mysql.resource';

const conn = mysqlResource.conn;
conn.connect();

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
			await conn.query(`INSERT INTO users SET ?`, [userData], function (err) {
				if (err) {
					reject(err);
				} else {
					resolve(userData);
				}
			})
		})
	}

	/**
	 * model: user 리스트 조회
	 * @returns {Promise<any>}
	 */
	listUser(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await conn.query(`SELECT * FROM users`, function (err, rows) {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})
		})
	}

	/**
	 * model: user studentId 조회
	 * @param {number} studentId
	 * @returns {Promise<any>}
	 */
	getUser(studentId: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await conn.query(`SELECT * FROM users WHERE studentId=?`, [studentId], function (err, rows) {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})
		})
	}

	/**
	 * model: user 업데이트
	 * @param {number} studentId
	 * @param userData
	 * @returns {Promise<any>}
	 */
	updateUser(studentId: number, userData: any): Promise<any> {
		return new Promise(async(resolve, reject) => {
			await conn.query(`UPDATE users SET name='${userData.name}' WHERE studentId=${studentId}`, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve(userData);
				}
			})
		})
	}

	/**
	 * model: user 삭제
	 * @param {number} studentId
	 * @returns {Promise<any>}
	 */
	deleteUser(studentId: number): Promise<any> {
		return new Promise(async(resolve, reject) => {
			await conn.query(`DELETE FROM users WHERE studentId=${studentId}`, function(err, rows) {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})
		})
	}
}

export const user: any = new User();