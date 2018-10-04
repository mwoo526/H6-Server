import { mysqlUtil } from "../../../../packages/utils/mysql.util";

const pool = mysqlUtil.pool;

export class GoodLog {

    /**
     * model : goodLog 생성
     * @param goodLodData
     * @returns {Promise<void>}
     */
    createGoodLog(goodLodData: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`INSERT INTO goodLog SET ?`, [goodLodData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(goodLodData);
                    }
                });
            });
        });
    }

    /**
     * model : goodLog 중복검사
     * @param {number} boardIndex
     * @param {number} userIndex
     * @returns {Promise<void>}
     */
    checkGoodLog(boardIndex: number, userIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`SELECT * FROM goodLog WHERE boardIndex = ? AND userIndex = ?`, [boardIndex, userIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else if (data[0] != null) {
                        reject(`This is goodLog is already exist`);
                    } else {
                        resolve(data);
                    }
                });
            });
        });
    }
}

export const goodLog: GoodLog = new GoodLog();