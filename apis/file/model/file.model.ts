
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
            await pool.getConnection(async function (err, connection) {
                await connection.query('INSERT INTO file SET ?', fileData, function (err) {
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
                await connection.query(`SELECT t1.boardFileIndex, t1.fileName, t1.createdAt, t2.userNickName 
                 FROM file AS t1
                 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
                 ORDER BY t1.boardIndex`, (err, data) => {
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


    /** model : file 업데이트
     * @returns {Promise<void>}
     */
    updateFile(fileIndex: number, fileDate: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async function (err, connection) {
                await connection.query('UPDATE file SET ? WHERE boardFileIndex = ?', [fileDate,
                    fileIndex], function (err, rows) {
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
            await pool.getConnection(async function (err, connection) {
                await connection.query('DELETE FROM file WHERE boardFileIndex = ?', fileIndex, function (err, rows) {
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