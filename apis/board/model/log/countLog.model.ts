import { mysqlUtil } from '../../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class CountLog {

	/**
	 * model : countLog 생성
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	createCountLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO countLog SET boardIndex = ? , userIndex = ?`, [boardIndex,
					userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				})
			})
		})
	}

	/**
	 * model : countLog 중복검사
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	checkCountLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM countLog WHERE boardIndex = ${boardIndex} AND userIndex = ${userIndex}`, (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else if (data[0] == null) {
						reject('This UserLog is not exist');
					} else {
						resolve(data[0]);
					}

				})
			})
		})
	}

}

export const countLog: CountLog = new CountLog();