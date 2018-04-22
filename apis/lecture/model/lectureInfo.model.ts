import { mysqlUtil } from '../../../packages/utils/mysql.util';
import { lectureReply } from './lectureReply.model';

const pool = mysqlUtil.pool;

// TODO(@jade): textbook 칼럼 추가  date: 2018. 2. 21. 오후 6:11
export class LectureInfo {

	/**
	 * model: lectureInfo 생성
	 * @param lectureInfoData
	 * @returns {Promise<void>}
	 */
	createLectureInfo(lectureInfoData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO lecturesInfo SET ?`, lectureInfoData, async function(err) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(lectureInfoData);
					}
				})
			})
		})
	}

	/**
	 * model: lectureInfo 리스트 조회
	 * @returns {Promise<void>}
	 */
	listLectureInfo(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
					FROM lecturesInfo AS t1 INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
					INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo page 리스트 조회
	 * @returns {Promise<any>}
	 */
	pageListLectureInfo(page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName
          FROM lecturesInfo AS t1 
          INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
          INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
          ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: lectureInfo index 조회
	 * @param lectureInfoIndex
	 * @returns {Promise<void>}
	 */
	getLectureInfoByLectureInfoIndex(lectureInfoIndex: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lecturesInfo AS t1 INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t1.lectureInfoIndex = ${lectureInfoIndex}`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo lectureName 조회
	 * @param lectureName
	 * @returns {Promise<void>}
	 */
	getLectureInfoByLectureName(lectureName: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lecturesInfo AS t1 INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t2.lectureName LIKE '%${lectureName}%'`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo lectureName page 조회
	 * @param lectureName
	 * @returns {Promise<void>}
	 */
	pageGetLectureInfoByLectureName(lectureName: any, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
                FROM lecturesInfo AS t1 
                INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
                INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
                WHERE t2.lectureName LIKE '%${lectureName}%'
                ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo professorName 조회
	 * @param professorName
	 * @returns {Promise<void>}
	 */
	getLectureInfoByProfessorName(professorName: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lecturesInfo AS t1 INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t3.professorName LIKE '%${professorName}%'`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo professorName page 조회
	 * @param professorName
	 * @returns {Promise<void>}
	 */
	pageGetLectureInfoByProfessorName(professorName: any, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
                FROM lecturesInfo AS t1 
                INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
                INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
                WHERE t3.professorName LIKE '%${professorName}%'
                ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						for (let i = 0; i < rows.length; i++) {
							const result = await lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
							rows[i].replyCount = result[0].replyCount;
						}
						await connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: lectureInfo 업데이트
	 * @param {number} lectureInfoIndex
	 * @param lectureInfoData
	 * @returns {Promise<void>}
	 */
	updateLectureInfo(lectureInfoIndex: number, lectureInfoData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE lecturesInfo SET ? WHERE lectureInfoIndex = ?`, [lectureInfoData,
					lectureInfoIndex], async function(err) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(lectureInfoData);
					}
				})
			})
		})
	}

	/**
	 * model: lectureInfo 평균 업데이트
	 * @param {number} lectureInfoIndex
	 * @param {number} average
	 * @returns {Promise<void>}
	 */
	updateLectureInfoAverage(lectureInfoIndex: number, average: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE lecturesInfo SET average = ${average} WHERE lectureInfoIndex = ${lectureInfoIndex}`, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: lectureInfo 삭제
	 * @param {number} lectureInfoIndex
	 * @returns {Promise<void>}
	 */
	deleteLectureInfo(lectureInfoIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('DELETE FROM lecturesInfo WHERE lectureInfoIndex = ?', lectureInfoIndex, async function(err, rows) {
					if (err) {
						await connection.release();
						reject(err);
					} else {
						await connection.release();
						resolve(rows);
					}
				})
			})
		})
	}
}

export const lectureInfo: any = new LectureInfo();