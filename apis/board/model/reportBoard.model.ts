import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class ReportBoard {

	/**
	 * model: reportBoard 생성
	 * @param : reportBoardData
	 * @returns {Promise<void>}
	 */

	createReportBoard(reportBoardData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO reportBoard SET ?`, reportBoardData, async (err) => {
					await connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(reportBoardData);
					}
				})
			})
		});
	}

	/**
	 * model : boardInfo 리스트 조회
	 * @returns {Promise<void>}
	 */

	listReportBoardInfo(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT t1.reportBoardIndex, t1.reportBoardTitle, t1.createdAt, t2.userNickName 
                 FROM reportBoard AS t1
                 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                 ORDER BY t1.boardIndex`, (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						if (data.length == 0) {
							reject('No Contents');
						} else {
							resolve(data);
						}
					}
				})
			})
		})
	}

	/**
	 * model : reportBoardInfo page 리스트 조회
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<void>}
	 */

	pageListReportBoardInfo(page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}

				await connection.query(`SELECT t1.reportBoardIndex, t1.reportBoardTitle, t1.createdAt, t2.userNickName 
                 FROM reportBoard AS t1
                 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                 ORDER BY t1.reportBoardIndex LIMIT ${start}, ${count}`, (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				})
			})
		});
	}

	/**
	 * model : reportBoard Content 조회
	 * @param {number} reportBoardIndex
	 * @returns {Promise<void>}
	 */
	getReportBoardContent(reportBoardIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM reportBoard WHERE reportBoardIndex=${reportBoardIndex}`, (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						if (data.length == 0) {
							reject('No Content');
						} else {
							resolve(data);
						}
					}
				})
			})
		});
	}

	/**
	 * model: reportBoardIndex 조회
	 * @param : reportBoardIndex
	 * @returns {Promise<void>}
	 */

	getReportBoardIndex(reportBoardIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM reportBoard WHERE reportBoardIndex=${reportBoardIndex}`, (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						if (data.length == 0) {
							reject('No Content');
						} else {
							resolve(data);
						}
					}
				})
			})
		});
	}

	/**
	 * model: reportBoard 업데이트
	 * @param : reportBoardIndex, reportBoardData
	 * @returns {Promise<void>}
	 */

	updateReportBoard(reportBoardIndex: number, reportBoardData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE reportBoard SET ? WHERE reportBoardIndex=${reportBoardIndex}`, reportBoardData, (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(reportBoardData);
					}
				})
			})
		});
	}

	/**
	 * model: reportBoard 삭제
	 * @param reportBoardIndex
	 * @returns {Promise<void>}
	 */
	deleteReportBoard(reportBoardIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM reportBoard WHERE reportBoardIndex=${reportBoardIndex}`, (err, data) => {
					connection.release();
					if (err) {
						reject(err)
					} else {
						resolve(data);
					}
				})
			})
		});
	}

}

export const reportBoard: any = new ReportBoard();