import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Restaurant {

	/**
	 * model: restaurant 생성
	 * @param : restaurantData
	 * @returns {Promise<any>}
	 */
	createRestaurant(restaurantData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO restaurant SET ?`, [restaurantData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantData);
					}
				});
			});
		});
	}

	/**
	 * model: 모든 restaurant 조회
	 * @param : void
	 * @returns {Promise<any>}
	 */
	listRestaurants(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurant`, (err, data) => {
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
	 * model: restaurant index 에 따른 조회
	 * @param : {number} restaurantIndex
	 * @returns {Promise<any>}
	 */
	getRestaurant(restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurant WHERE restaurantIndex = ?`, [restaurantIndex], (err, data) => {
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
	 * model: restaurant 업데이트
	 * @param {number} restaurantIndex
	 * @param {any} restaurantData
	 * @returns {Promise<any>}
	 */
	updateRestaurant(restaurantIndex: number, restaurantData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE restaurant SET ? WHERE restaurantIndex = ?`, [restaurantData,
                    restaurantIndex], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantData);
					}
				});
			});
		});
	}

	/**
	 * model: restaurant 삭제
	 * @param {number} restaurantIndex
	 * @returns {Promise<any>}
	 */
	deleteRestaurant(restaurantIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM restaurant WHERE restaurantIndex = ?`, [restaurantIndex], (err, data) => {
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

export const restaurant: Restaurant = new Restaurant();