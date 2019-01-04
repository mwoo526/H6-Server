import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class TodayLunchMenu {
	/**
	 * model: todayLunchMenu 생성
	 * @param : todayLunchMenuData
	 * @returns {Promise<any>}
	 */
	createTodayLunchMenu(todayLunchMenuData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO todayLunchMenu SET ?`, [todayLunchMenuData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(todayLunchMenuData);
					}
				});
			});
		});
	}

	/**
	 * model: 모든 todayLunchMenu 조회
	 * @param : void
	 * @returns {Promise<any>}
	 */
	getTodayLunchMenus(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from todayLunchMenu`, (err, data) => {
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
	 * model: todayLunchMenu 조회
	 * @param : {number} todayLunchMenuIndex
	 * @returns {Promise<any>}
	 */
	getTodayLunchMenuByIndex(todayLunchMenuIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from todayLunchMenu WHERE todayLunchMenuIndex = ?`, [todayLunchMenuIndex], (err, data) => {
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
	 * model: todayLunchIndex 에 따른 todayLunchMenu 조회 (음식점 별 메뉴 조회)
	 * @param : {number} todayLunchIndex
	 * @returns {Promise<any>}
	 */
	getTodayLunchMenuByTodayLunchIndex(todayLunchIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from todayLunchMenu WHERE todayLunchIndex = ?`, [todayLunchIndex], (err, data) => {
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
	 * model: todayLunchMenu 업데이트
	 * @param {number} todayLunchMenuIndex
	 * @param todayLunchMenuData
	 * @returns {Promise<any>}
	 */
	updateTodayLunchMenu(todayLunchMenuIndex: number, todayLunchMenuData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE todayLunchMenu SET ? WHERE todayLunchMenuIndex = ?`, [todayLunchMenuData,
					todayLunchMenuIndex], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(todayLunchMenuData);
					}
				});
			});
		});
	}

	/**
	 * model: todayLunchMenu 삭제
	 * @param {number} todayLunchMenuIndex
	 * @returns {Promise<any>}
	 */
	deleteTodayLunchMenu(todayLunchMenuIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM todayLunchMenu WHERE todayLunchMenuIndex = ?`, [todayLunchMenuIndex], (err, data) => {
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
	 * model: todayLunchIndex 에 따른 todayLunchMenu 삭제
	 * @param {number} todayLunchIndex
	 * @returns {Promise<any>}
	 */
	deleteTodayLunchMenuByTodayLunchIndex(todayLunchIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM todayLunchMenu WHERE todayLunchIndex = ?`, [todayLunchIndex], (err, data) => {
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

export const todayLunchMenu: TodayLunchMenu = new TodayLunchMenu();