import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class LectureReply {
	/**
	 * verify: lectureReply 생성
	 * @param lectureReplyData
	 * @returns {Promise<void>}
	 */
	createLectureReply(lectureReplyData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const preview = await lectureReplyData.review.substring(0, 20);
			lectureReplyData.preview = preview;
			await pool.getConnection(async function(err, connection) {
				await connection.query(`INSERT INTO lecturesReply SET ?`, lectureReplyData, function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(lectureReplyData);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply 카운트 조회
	 * @param {string} lectureInfoIndex
	 * @returns {Promise<void>}
	 */
	countGetLecturesReplyByLectureInfoIndex(lectureInfoIndex: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT COUNT(*) AS replyCount FROM lecturesReply WHERE lecturesReply.lectureInfoIndex = ${lectureInfoIndex}`, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply 리스트 조회
	 * @returns {Promise<void>}
	 */
	listLectureReply(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 
				INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex`, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply 페이지 리스트 조회
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageListLectureReply(page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 
				INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, async function(err, rows) {
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
	 * verify: lectureReply index 조회
	 * @param {number} lectureReplyIndex
	 * @returns {Promise<void>}
	 */
	getLectureReplyByLectureReplyIndex(lectureReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 
				INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t1.lectureReplyIndex = ${lectureReplyIndex}`, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply replyIndex 페이지 조회
	 * @param {number} lectureReplyIndex
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageGetLectureReplyByLectureReplyIndex(lectureReplyIndex: number, page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 
				INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.lectureReplyIndex LIKE '%${lectureReplyIndex}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function(err, rows) {
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
	 * verify: lectureReply lectureInfoIndex 조회
	 * @param {number} lectureInfoIndex
	 * @returns {Promise<void>}
	 */
	getLectureReplyByLectureInfoIndex(lectureInfoIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 
				INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t1.lectureInfoIndex = ${lectureInfoIndex}`, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply lectureInfoIndex 페이지 조회
	 * @param {number} lectureInfoIndex
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageGetLectureReplyByLectureInfoIndex(lectureInfoIndex: number, page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.lectureInfoIndex LIKE '%${lectureInfoIndex}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function(err, rows) {
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
	 * verify: lectureReply userIndex 조회
	 * @param {number} userIndex
	 * @returns {Promise<void>}
	 */
	getLectureReplyByUserIndex(userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 
				INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t2.userIndex = ${userIndex}`, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply userIndex 페이지 조회
	 * @param {number} userIndex
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageGetLectureReplyByUserIndex(userIndex: number, page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.userIndex LIKE '%${userIndex}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function(err, rows) {
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
	 * verify: lectureReply userId 조회
	 * @param {string} userId
	 * @returns {Promise<void>}
	 */
	getLectureReplyByUserId(userId: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 
				INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t2.userId LIKE '%${userId}%'`, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply userId 페이지 조회
	 * @param {number} userId
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageGetLectureReplyByUserId(userId: number, page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t2.userId LIKE '%${userId}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function(err, rows) {
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
	 * verify: lectureReply userNickName 조회
	 * @param {string} userNickName
	 * @returns {Promise<void>}
	 */
	getLectureReplyByUserNickName(userNickName: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 
				INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t2.userNickName LIKE '%${userNickName}%'`, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply userNickName 페이지 조회
	 * @param {number} userNickName
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageGetLectureReplyByUserNickName(userNickName: number, page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				await connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t2.userNickName LIKE '%${userNickName}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function(err, rows) {
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
	 * verify: lectureReply 업데이트
	 * @param {number} lectureReplyIndex
	 * @param lectureReplyData
	 * @returns {Promise<void>}
	 */
	updateLectureReply(lectureReplyIndex: number, lectureReplyData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const preview = await lectureReplyData.review.substring(0, 20);
			lectureReplyData.preview = preview;
			await pool.getConnection(async function(err, connection) {
				await connection.query(`UPDATE lecturesReply SET ? WHERE lectureReplyIndex = ?`, [lectureReplyData,
					lectureReplyIndex], function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(lectureReplyData);
					}
				});
			})
		})
	}

	/**
	 * verify: lectureReply 삭제
	 * @param {number} lectureReplyIndex
	 * @returns {Promise<void>}
	 */
	deleteLectureReply(lectureReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('DELETE FROM lecturesReply WHERE lectureReplyIndex = ?', lectureReplyIndex, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				});
			})
		})
	}
}

export const lectureReply: any = new LectureReply();