import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class BoardReply {

    /**
     * model : boardReply 생성
     * @param boardData
     * @returns {Promise<void>}
     */
    createBoardReply(boardData: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`INSERT INTO boardReply SET ?`, [boardData], (err) => {
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
     * model : boardReply 답글 생성
     * @param boardReply
     * @param {number} boardReplyIndex
     * @returns {Promise<void>}
     */
    createBoardReplyComments(boardData: any, boardReplyIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`INSERT INTO boardReply SET boardIndex = ?, userIndex = ?, boardReplyContent = ?, parent = ?`,
                    [boardData.boardIndex, boardData.userIndex, boardData.boardReplyContent, boardReplyIndex], (err) => {
                        connection.release();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(boardData);
                        }
                    });
            });
        });
    }

    /**
     * model : boardReply 댓글 리스트 조회
     * @param {number} boardIndex
     * @returns {Promise<void>}
     */
    listBoardReplyByBoardIndex(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT t1.boardReplyIndex, t1.boardReplyContent, t1.createdAt, t2.userNickName 
                 FROM boardReply AS t1
                 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                 WHERE t1.boardIndex = ? AND t1.parent IS NULL
                 ORDER BY t1.boardReplyIndex DESC`, [boardIndex], (err, data) => {
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
     * model : boardReply 댓글 page 리스트 조회
     * @param {number} boardIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListBoardReplyByBoardIndex(boardIndex: number, page: number, count: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }

                await connection.query(`SELECT t1.boardReplyIndex, t1.boardReplyContent, t1.createdAt, t2.userNickName
                 FROM boardReply AS t1
                 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex                 
                 WHERE t1.boardIndex = ? AND t1.parent IS NULL
                 ORDER BY t1.boardReplyIndex DESC LIMIT ${start},${count}`, [boardIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data);
                    }
                });
            });
        });
    }

    /**
     * model : boardReply 답글 리스트 조회
     * @param {number} boardReplyIndex
     * @returns {Promise<void>}
     */
    listBoardReplyByComments(boardReplyIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT t1.boardReplyIndex, t1.boardReplyContent, t1.createdAt, t2.userNickName
				FROM boardReply AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.parent = ?
				ORDER BY t1.boardReplyIndex DESC`, [boardReplyIndex], (err, data) => {
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
     * model : boardReply 답글 page 리스트 조회
     * @param {number} boardReplyIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListBoardReplyByComments(boardReplyIndex: number, page: number, count: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }

                await connection.query(`SELECT t1.boardReplyIndex, t1.boardReplyContent, t1.createdAt, t2.userNickName
                  FROM boardReply AS t1
                  INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                  WHERE t1.parent = ?
                  ORDER BY t1.boardReplyIndex DESC LIMIT ${start},${count}`, [boardReplyIndex], (err, data) => {
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
     * model : boardReply 대댓글 리스트 조회
     * @param {number} boardIndex
     * @returns {Promise<void>}
     */
    listBoardReplyComments(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT t1.boardReplyIndex, t1.boardReplyContent, t1.createdAt, t2.userNickName
    			FROM boardReply AS t1
    			INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
    			WHERE t1.boardIndex = ?
    			ORDER BY IF(isnull(parent),boardReplyIndex,parent)`, [boardIndex], (err, data) => {
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
     * model : boardReply 대댓글 page 리스트 조회
     * @param {number} boardIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListBoardReplyComments(boardIndex: number, page: number, count: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }

                await connection.query(`SELECT t1.boardReplyIndex, t1.boardReplyContent, t1.createdAt, t2.userNickName
    			FROM boardReply AS t1
    			INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
    			WHERE t1.boardIndex = ?
    			ORDER BY IF(isnull(parent),boardReplyIndex,parent) LIMIT ${start},${count}`, [boardIndex], (err, data) => {
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
     * model : boardReply 개수 조회
     * @param {number} boardIndex
     * @returns {Promise<void>}
     */
    countBoardReplyByBoardIndex(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT COUNT(*) AS boardReplyCount FROM boardReply WHERE boardIndex = ?`, [boardIndex], (err, data) => {
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
     * model : boardReply 업데이트
     * @param {number} boardReplyIndex
     * @param boardReplyData
     * @returns {Promise<void>}
     */
    updateBoardReply(boardReplyIndex: number, boardReplyData: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`UPDATE boardReply SET ? WHERE boardReplyIndex = ?`, [boardReplyData, boardReplyIndex], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(boardReplyData);
                    }
                });
            });
        });
    }

    /**
     * model : boardReply 삭제
     * @param {number} boardReplyIndex
     * @returns {Promise<void>}
     */
    deleteBoardReply(boardReplyIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`DELETE FROM boardReply WHERE boardReplyIndex = ?`, [boardReplyIndex], (err, data) => {
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

export const boardReply: BoardReply = new BoardReply();