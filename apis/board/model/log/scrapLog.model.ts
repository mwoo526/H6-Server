import { mysqlUtil } from '../../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class ScrapLog {

	/**
	 * model : recommendLog 생성
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	createScrapLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO scrapLog SET boardIndex = ?, userIndex = ?`, [boardIndex, userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model : recommendLog 중복검사
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	checkScrapLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT isScrap FROM scrapLog WHERE boardIndex = ? AND userIndex = ?`, [boardIndex, userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else if (data[0] == null) {
						reject('This ScrapLog is not exist');
					} else {
						resolve(data[0]);
					}
				});
			});
		});
	}

	/**
	 * model : recommendLog isRecommend 업데이트
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	updateScrapLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE scrapLog SET isScrap = IF(isScrap=FALSE,TRUE,FALSE) WHERE boardIndex = ? AND userIndex = ?`, [boardIndex, userIndex],(err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

}

export const scrapLog: ScrapLog = new ScrapLog();
