import { mysqlUtil } from '../../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class BadLog {

	/**
	 * model : badLog 생성
	 * @param badLodData
	 * @returns {Promise<void>}
	 */
	createBadLog(badLodData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO badLog SET ?`, [badLodData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(badLodData);
					}
				});
			});
		});
	}

	/**
	 * model : badLog 중복검사
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	checkBadLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM badLog WHERE boardIndex = ? AND userIndex = ?`, [boardIndex,
					userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else if (data[0] != null) {
						reject(`This is badLog is not exist`);
					} else {
						resolve(data);
					}
				});
			});
		});
	}
}

export const badLog: BadLog = new BadLog();