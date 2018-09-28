import { mysqlUtil } from '../../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class RecommendLog {

	/**
	 * model : recommendLog 생성
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	createRecommendLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO recommendLog SET boardIndex = ?, userIndex = ?`, [boardIndex,
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
	 * model : recommendLog 중복검사
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	checkRecommendLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT isRecommend FROM recommendLog WHERE boardIndex = ${boardIndex} AND userIndex = ${userIndex}`, (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else if (data[0] == null) {
						reject('This RecommendLog is not exist');
					} else {
						resolve(data[0]);
					}
				})
			})
		})
	}

	/**
	 * model : recommendLog isRecommend 업데이트
	 * @param {number} boardIndex
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	updateRecommendLog(boardIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE recommendLog SET isRecommend = IF(isRecommend=FALSE,TRUE,FALSE) WHERE boardIndex = ${boardIndex} AND userIndex = ${userIndex}`, (err, data) => {
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

}

export const recommendLog: RecommendLog = new RecommendLog();
