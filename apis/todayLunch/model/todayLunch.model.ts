import { mysqlUtil } from "../../../packages/utils/mysql.util";

const pool = mysqlUtil.pool;

export class TodayLunch {

    /**
     * model: todayLunch 생성
     * @param : todayLunchData
     * @returns {Promise<any>}
     */
    createTodayLunch(todayLunchData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
                await connection.query(`INSERT INTO todayLunch SET ?`, [todayLunchData], async (err) => {
                    await connection.release();
                    if(err) {
                        reject(err);
                    } else {
                        resolve(todayLunchData);
                    }
                });
            });
        });
    }

    /**
     * model: 모든 todayLunch 조회
     * @param : void
     * @returns {Promise<any>}
     */
    getTodayLunches(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
              await connection.query(`SELECT * from todayLunch`, (err, data) => {
                 connection.release();
                 if(err) {
                     reject(err);
                 } else {
                     resolve(data);
                 }
              });
           });
        });
    }

    /**
     * model: todayLunch index 조회
     * @param : {number} todayLunchIndex
     * @returns {Promise<any>}
     */
    getTodayLunchByIndex(todayLunchIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async (err, connection) => {
               await connection.query(`SELECT * from todayLunch WHERE todayLunchIndex = ?`, [todayLunchIndex], (err, data) => {
                   connection.release();
                   if(err) {
                       reject(err);
                   } else {
                       resolve(data);
                   }
               });
           });
        });
    }

    /**
     * model: lecture 업데이트
     * @param {number} todayLunchIndex
     * @param todayLunchData
     * @returns {Promise<any>}
     */
    updateTodayLunch(todayLunchIndex: number, todayLunchData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await pool.getConnection(async (err, connection) => {
              await connection.query(`UPDATE todayLunch SET ? WHERE todayLunchIndex = ?`, [todayLunchData, todayLunchIndex], (err) => {
                  connection.release();
                  if(err) {
                      reject(err);
                  } else {
                      resolve(todayLunchData);
                  }
              });
           });
        });
    }

    /**
     * model: todayLunch 삭제
     * @param {number} todayLunchIndex
     * @returns {Promise<any>}
     */
    deleteTodayLunch(todayLunchIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await pool.getConnection(async (err, connection) => {
              await connection.query(`DELETE FROM todayLunch WHERE todayLunchIndex = ?`, [todayLunchIndex], (err, data) => {
                 connection.release();
                 if(err) {
                     reject(err);
                 } else {
                     resolve(data);
                 }
              });
           });
        });
    }
}

export const todayLunch: TodayLunch = new TodayLunch();