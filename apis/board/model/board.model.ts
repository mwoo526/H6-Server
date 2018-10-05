import { mysqlUtil } from '../../../packages/utils/mysql.util';
import { boardReply } from "./boardReply.model";

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
                await connection.query(`INSERT INTO board SET ?`, [boardData], (err) => {
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
     * model : board 리스트 조회
     * @returns {Promise<void>}
     */
    listBoard(sort: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            let sql: any = `SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.boardContent, t1.createdAt, t1.good, t1.bad, t1.scrap, t2.userNickName
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex`;
            await pool.getConnection(async (err, connection) => {
                if (sort == 'createdAt') {
                    await connection.query(`${sql} ORDER BY t1.createdAt DESC`, async (err, data) => {
                        await connection.release();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
                else if (sort == 'count') {
                    await connection.query(` ${sql} ORDER BY t1.count DESC`, async (err, data) => {
                        await connection.release();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
                else if (sort == 'recommend') {
                    await connection.query(` ${sql} ORDER BY t1.good DESC`, async (err, data) => {
                        await connection.release();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
            });
        });
    }

    /**
     * model : board page 리스트 조회
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListBoard(sort: string, page: number, count: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                let sql: any = `SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.boardContent, t1.createdAt, t1.good, t1.bad, t1.scrap, t2.userNickName
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex`;
                if (sort == 'createdAt') {
                    await connection.query(`${sql} ORDER BY t1.createdAt DESC LIMIT ${start},${count}`, async (err, data) => {
                        if (err) {
                            await connection.release();
                            reject(err);
                        } else {
                            for (let i: number = 0; i < data.length; i++) {
                                const result: any = await boardReply.countBoardReplyByBoardIndex(data[i].boardIndex);
                                data[i].boardReplyCount = result[0].boardReplyCount;
                            }
                            await connection.release();
                            resolve(data);
                        }
                    });
                }
                else if (sort == 'count') {
                    await connection.query(` ${sql} ORDER BY t1.count DESC LIMIT ${start},${count}`, async (err, data) => {
                        if (err) {
                            await connection.release();
                            reject(err);
                        } else {
                            for (let i: number = 0; i < data.length; i++) {
                                const result: any = await boardReply.countBoardReplyByBoardIndex(data[i].boardIndex);
                                data[i].boardReplyCount = result[0].boardReplyCount;
                            }
                            await connection.release();
                            resolve(data);
                        }
                    });
                }
                else if (sort == 'recommend') {
                    await connection.query(` ${sql} ORDER BY t1.good DESC LIMIT ${start},${count}`, async (err, data) => {
                        if (err) {
                            await connection.release();
                            reject(err);
                        } else {
                            for (let i: number = 0; i < data.length; i++) {
                                const result: any = await boardReply.countBoardReplyByBoardIndex(data[i].boardIndex);
                                data[i].boardReplyCount = result[0].boardReplyCount;
                            }
                            await connection.release();
                            resolve(data);
                        }
                    });
                }
            });
        });
    }

    /**
     * model : board 리스트 카테고리별 조회
     * @param {string} category
     * @param {string} sort
     * @returns {Promise<void>}
     */
    listBoardByCategory(category: string, sort: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                let sql: any = `SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.boardContent, t1.createdAt, t1.good, t1.bad, t1.scrap, t2.userNickName
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex WHERE t1.category = `;
                if (sort == 'createdAt') {
                    await connection.query(`${sql} ? ORDER BY t1.createdAt DESC`, [category], async (err, data) => {
                        await connection.release();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
                else if (sort == 'count') {
                    await connection.query(` ${sql} ? ORDER BY t1.count DESC`, [category], async (err, data) => {
                        await connection.release();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
                else if (sort == 'recommend') {
                    await connection.query(` ${sql} ? ORDER BY t1.good DESC`, [category], async (err, data) => {
                        await connection.release();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
            });
        });
    }

    /**
     * model : board page 리스트 카테고리별 조회
     * @param {string} category
     * @param {string} sort
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListBoardByCategory(category: string, sort: string, page: number, count: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                let sql: any = `SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.boardContent, t1.createdAt, t1.good, t1.bad, t1.scrap, t2.userNickName
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex WHERE t1.category = `;
                if (sort == 'createdAt') {
                    await connection.query(`${sql} ? ORDER BY t1.createdAt DESC LIMIT ${start},${count}`, [category], async (err, data) => {
                        if (err) {
                            await connection.release();
                            reject(err);
                        } else {
                            for (let i: number = 0; i < data.length; i++) {
                                const result: any = await boardReply.countBoardReplyByBoardIndex(data[i].boardIndex);
                                data[i].boardReplyCount = result[0].boardReplyCount;
                            }
                            await connection.release();
                            resolve(data);
                        }
                    });
                }
                else if (sort == 'count') {
                    await connection.query(` ${sql} ? ORDER BY t1.count DESC LIMIT ${start},${count}`, [category], async (err, data) => {
                        if (err) {
                            await connection.release();
                            reject(err);
                        } else {
                            for (let i = 0; i < data.length; i++) {
                                const result: any = await boardReply.countBoardReplyByBoardIndex(data[i].boardIndex);
                                data[i].boardReplyCount = result[0].boardReplyCount;
                            }
                            await connection.release();
                            resolve(data);
                        }
                    });
                }
                else if (sort == 'recommend') {
                    await connection.query(` ${sql} ? ORDER BY t1.good DESC LIMIT ${start},${count}`, [category], async (err, data) => {
                        if (err) {
                            await connection.release();
                            reject(err);
                        } else {
                            for (let i = 0; i < data.length; i++) {
                                const result: any = await boardReply.countBoardReplyByBoardIndex(data[i].boardIndex);
                                data[i].boardReplyCount = result[0].boardReplyCount;
                            }
                            await connection.release();
                            resolve(data);
                        }
                    });
                }
            });
        });
    }

    /**
     * model : board searchTerm  조회 (검색)
     * @param {string} searchTerm
     * @returns {Promise<void>}
     */
    listBoardBySearchTerm(searchTerm: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.boardContent, t1.createdAt, t1.good, t1.bad, t1.scrap, t2.userNickName
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.boardTitle LIKE ?
                or t1.boardContent LIKE ?`, [`%${searchTerm}%`, `%${searchTerm}%`], async (err, data) => {
                    await connection.release();
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
     * model : board searchTerm 조회 (검색)
     * @param {string} searchTerm
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListBoardBySearchTerm(searchTerm: string, page: number, count: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0
                }
                await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.boardContent, t1.createdAt, t1.good, t1.bad, t1.scrap, t2.userNickName                
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.boardTitle LIKE ?
                or t1.boardContent LIKE ?
                ORDER BY t1.boardIndex DESC  LIMIT ${start},${count}`, [`%${searchTerm}%`, `%${searchTerm}%`], async (err, data) => {
                    if (err) {
                        await connection.release();
                        reject(err);
                    } else {
                        for (let i = 0; i < data.length; i++) {
                            const result: any = await boardReply.countBoardReplyByBoardIndex(data[i].boardIndex);
                            data[i].boardReplyCount = result[0].boardReplyCount;
                        }
                        await connection.release();
                        resolve(data);
                    }
                });
            });
        });
    }

    /**
     * model : boardInfo user 리스트 조회
     * @param {number} userIndex
     * @returns {Promise<void>}
     */
    listBoardInfoByUserIndex(userIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.createdAt, t1.count, t1.recommend, t2.userNickName
					FROM board AS t1
					INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
					WHERE t1.userIndex = ${userIndex}`, (err, data) => {
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
     * model : boardInfo user page 리스트 조회
     * @param {number} userIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListBoardInfoByUserIndex(userIndex: number, page: number, count: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                let start: number = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }

                await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.createdAt, t1.count, t1.recommend, t2.userNickName
					FROM board AS t1
					INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
					WHERE t1.userIndex = ${userIndex}
					ORDER BY t1.boardIndex DESC LIMIT ${start},${count}`, (err, data) => {
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
     * model : board 게시물 조회
     * @param {number} boardIndex
     * @returns {Promise<void>}
     */
    getBoardPost(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT t1.boardIndex, t1.category, t1.boardTitle, t1.boardContent, t1.createdAt, t1.good, t1.bad, t1.scrap, t2.userNickName
                FROM board AS t1
                INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                WHERE t1.boardIndex = ?`, [boardIndex], async (err, data) => {
                    if (err) {
                        await connection.release();
                        reject(err);
                    } else if (data[0] == null) {
                        await connection.release();
                        reject('This Post is not exist');
                    } else {
                        for (let i: number = 0; i < data.length; i++) {
                            const result: any = await boardReply.countBoardReplyByBoardIndex(data[i].boardIndex);
                            data[i].boardReplyCount = result[0].boardReplyCount
                        }
                        await connection.release();
                        resolve(data);
                    }
                });
            });
        });
    }

    /**
     * model : board 추천수 조회
     * @param {number} boardIndex
     * @returns {Promise<void>}
     */
    getBoardGood(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT good FROM board WHERE boardIndex = ?`, [boardIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data[0]);
                    }
                });
            });
        });
    }

    /**
     * model : board 비추천수 조회
     * @param {number} boardIndex
     * @returns {Promise<void>}
     */
    getBoardBad(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT bad FROM board WHERE boardIndex = ?`, [boardIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data[0]);
                    }
                });
            });
        });
    }

    /**
     * model : board 스크랩 조회
     * @param {number} boardIndex
     * @returns {Promise<void>}
     */
    getBoardScrap(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT scrap FROM board WHERE boardIndex = ?`, [boardIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data[0]);
                    }
                });
            });
        });
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
                await connection.query(`UPDATE board SET ? WHERE boardIndex = ?`, [boardData, boardIndex], (err) => {
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
                await connection.query(`UPDATE board SET count = count+1 WHERE boardIndex = ?`, [boardIndex], (err, data) => {
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
     * model : board 추천수 업데이트
     * @param {number} boardIndex
     * @returns {Promise<any>}
     */
    updateBoardByGood(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`UPDATE board SET good = good + 1 WHERE boardIndex = ?`, [boardIndex], (err, data) => {
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
     * model : board 비추천수 업데이트
     * @param {number} boardIndex
     * @returns {Promise<any>}
     */
    updateBoardByBad(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`UPDATE board SET bad = bad + 1 WHERE boardIndex = ?`, [boardIndex], (err, data) => {
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
     * model : board 스크랩 업데이트
     * @param {number} boardIndex
     * @returns {Promise<void>}
     */
    updateBoardByScrap(boardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`UPDATE board SET scrap = IF(scrap=FALSE,TRUE,FALSE) WHERE boardIndex = ?`, [boardIndex], (err, data) => {
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