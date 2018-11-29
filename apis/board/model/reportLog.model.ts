import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class ReportLog {

	/**
	 * model: reportLog 생성
	 * @param : reportLogData
	 * @returns {Promise<void>}
	 */
	createReportLog(reportLogData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO reportLog SET ?`, [reportLogData], async (err) => {
					await connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(reportLogData);
					}
				})
			})
		});
	}

    /**
     * model:
     * @param :
     * @returns {Promise<any>}
     */
    getReportLogCount(boardIndex: number): Promise<any> {
    	return new Promise(async (resolve, reject) => {
    		await pool.getConnection(async (err, connection) => {
    			await connection.query(`SELECT boardIndex, count(*) as reportCount 
    			from reportLog where boardIndex=? group by boardIndex`, [boardIndex], (err, data) => {
    				connection.release();
    				if(err) {
    					reject(err);
					}
					else {
    					resolve(data);
					}
				})
			})
		});
	}

	/**
	 * model : ReportLogInfo 리스트 조회
	 * @returns {Promise<void>}
	 */
	listReportLogInfo(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT t1.reportLogIndex, t1.reportLogTitle, t1.createdAt, t2.userNickName 
                 FROM reportLog AS t1
                 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                 ORDER BY t1.boardIndex`, (err, data) => {
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
	 * model : reportLogInfo page 리스트 조회
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	pageListReportLogInfo(page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}

				await connection.query(`SELECT t1.reportLogIndex, t1.reportLogTitle, t1.createdAt, t2.userNickName 
                 FROM reportLog AS t1
                 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                 ORDER BY t1.reportLogIndex LIMIT ?, ?`, [start, count], (err, data) => {
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
	 * model : reportLog Content 조회
	 * @param {number} reportLogIndex
	 * @returns {Promise<void>}
	 */
	getReportLogContent(reportLogIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM reportLog WHERE reportLogIndex=?`, [reportLogIndex], (err, data) => {
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
	 * model: reportLogIndex 조회
	 * @param : reportLogIndex
	 * @returns {Promise<void>}
	 */
	getReportLogIndex(reportLogIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM reportLog WHERE reportLogIndex=?`, [reportLogIndex], (err, data) => {
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
	 * model: reportLog 업데이트
	 * @param : reportLogIndex, reportLogData
	 * @returns {Promise<void>}
	 */
	updateReportLog(reportLogIndex: number, reportLogData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE reportLog SET ? WHERE reportLogIndex=?`, [reportLogData, reportLogIndex], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(reportLogData);
					}
				})
			})
		});
	}

	/**
	 * model: reportLog 삭제
	 * @param reportLogIndex
	 * @returns {Promise<void>}
	 */
	deleteReportLog(reportLogIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM reportLog WHERE reportLogIndex=?`, [reportLogIndex], (err, data) => {
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

export const reportLog: any = new ReportLog();