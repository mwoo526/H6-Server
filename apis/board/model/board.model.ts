import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Board {

	/**
	 * model : board 생성
	 * @param boardData
	 * @returns {Promise<void>}
	 */
	createBoard(boardData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO board SET ?`, boardData, (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(boardData);
					}
				})
			})
		})
	}

	/**
	 * model : boardInfo 리스트 조회
	 * @returns {Promise<void>}
	 */
	listBoardInfo(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                ORDER BY t1.boardIndex DESC`, (err, data) => {
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
	 * model : boardInfo page 리스트 조회
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	pageListBoardInfo(page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}

				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                ORDER BY t1.boardIndex DESC LIMIT ${start},${count}`, (err, data) => {
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
	 * model : boardInfo searchTerm  조회 (전체)
	 * @param {string} searchTerm
	 * @returns {Promise<void>}
	 */
	listBoardInfoBySearchTerm(searchTerm: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.category LIKE '%${searchTerm}%'
                or t1.boardTitle LIKE '%${searchTerm}%'
                or t1.boardContent LIKE '%${searchTerm}%'`, (err, data) => {
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
	 * model : boardInfo searchTerm 조회 (전체)
	 * @param {string} searchTerm
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	pageListBoardInfoBySearchTerm(searchTerm: string, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0
				}

				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.category LIKE '%${searchTerm}%'
                or t1.boardTitle LIKE '%${searchTerm}%'
                or t1.boardContent LIKE '%${searchTerm}%'
                ORDER BY t1.boardIndex DESC  LIMIT ${start},${count}`, (err, data) => {
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
	 * model : boardInfo category 리스트 조회 (카테고리별)
	 * @param {string} category
	 * @returns {Promise<void>}
	 */
	listBoardInfoByCategory(category: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.category LIKE '%${category}%'`, (err, data) => {
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
	 * model : boardInfo category page 리스트 조회 (카테고리별)
	 * @param {string} category
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	pageListBoardInfoByCategory(category: string, page: number, count: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}

				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.category LIKE '%${category}%'
                ORDER BY t1.boardIndex DESC  LIMIT ${start},${count}`, (err, data) => {
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
	 * model : boardInfo post 리스트 조회 (제목+글)
	 * @param {string} post
	 * @returns {Promise<any>}
	 */
	listBoardInfoByPost(post: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.boardTitle LIKE '%${post}%'
                or t1.boardContent LIKE '%${post}%'`, (err, data) => {
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
	 * model : boardInfo post page 리스트 조회 (제목+글)
	 * @param {string} post
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageListBoardInfoByPost(post: string, page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}

				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.boardTitle LIKE '%${post}%'
                or t1.boardContent LIKE '%${post}%'
                ORDER BY t1.boardIndex DESC LIMIT ${start},${count}`, (err, data) => {
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
	 * * model : board  index 조회
	 * @param {number} boardIndex
	 * @returns {Promise<void>}
	 */
	getBoardByBoardIndex(boardIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM board WHERE boardIndex=${boardIndex}`, (err, data) => {
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
	 * model : post 조회 (게시글)
	 * @param {number} boardIndex
	 * @returns {Promise<void>}
	 */
	getPostByBoardIndex(boardIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.boardContent, t1.count, t1.createdAt, t2.userNickName
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex=t2.userIndex
                WHERE t1.boardIndex =${boardIndex}`, (err, data) => {
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
	 * model : boardInfo count page 리스트 조회 (조회수)
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageListBoardInfoByCount(page: number, count: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}

				await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.count, t1.createdAt, t2.userNickName 
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                ORDER BY t1.count DESC  LIMIT ${start},${count}`, (err, data) => {
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
	 * model : board 업데이트
	 * @param {number} boardIndex
	 * @param boardData
	 * @returns {Promise<void>}
	 */
	updateBoard(boardIndex: number, boardData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE board SET ? WHERE boardIndex=${boardIndex}`, boardData, (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(boardData);
					}
				})
			})
		})
	}

	/**
	 * model : board 조회수 업데이트
	 * @param {number} boardIndex
	 * @returns {Promise<void>}
	 */
	updateBoardByCount(boardIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE board SET count=count+1 WHERE boardIndex=${boardIndex}`, (err, data) => {
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
	 * model : board 삭제
	 * @param {number} boardIndex
	 * @returns {Promise<void>}
	 */
	deleteBoard(boardIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM board WHERE boardIndex = ? `, boardIndex, (err, data) => {
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

export const board: Board = new Board();