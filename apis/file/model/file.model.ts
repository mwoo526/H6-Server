import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class File {
	/**
	 * model: file 생성
	 * @param fileData
	 * @returns {Promise<void>}
	 */
	createFile(fileData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO file SET ?`, [fileData], function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(fileData);
					}
				})
			})
		})
	}

	/**
	 * model: file 리스트 조회
	 * @returns {Promise<void>}
	 */
	listFile(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT fileName FROM file  ORDER BY boardFileIndex`, (err, data) => {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(data);
					}

				})
			})
		})
	}

	/**
	 * model: file Index 조회
	 * @param {number} fileIndex
	 * @returns {Promise<any>}
	 */
	getFileIndex(fileIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM file WHERE boardFileIndex = ?`, [fileIndex], function(err, rows) {
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
	 * model: file Index 조회
	 * @returns {Promise<any>}
	 * @param boardIndex
	 */
	getBoardIndex(boardIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT boardFileIndex FROM file WHERE boardIndex = ?`, [boardIndex], function(err, rows) {
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

	/** model : file 업데이트
	 * @returns {Promise<void>}
	 */
	updateFile(fileIndex: number, fileDate: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE file SET ? WHERE boardFileIndex = ?`, [fileDate,
					fileIndex], function(err, rows) {
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
	 * model: file 삭제
	 * @param {number} fileIndex
	 * @returns {Promise<any>}
	 */
	deleteFile(fileIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`DELETE FROM file WHERE boardFileIndex = ?`, [fileIndex], function(err, rows) {
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
	 * model: file downloadCount 조회
	 * @param {number} fileIndex
	 * @returns {Promise<any>}
	 */
	downloadCount(fileIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT downloadCount FROM file WHERE boardFileIndex = ?`, [fileIndex], function(err, rows) {
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

}

export const file: any = new File();