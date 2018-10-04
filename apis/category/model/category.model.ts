import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Category {

	/**
	 * model : category 생성
	 * @param categoryData
	 * @returns {Promise<void>}
	 */
	createCategory(categoryData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO category SET ?`, [categoryData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(categoryData);
					}
				})
			})
		})
	}

	/**
	 * model : category 리스트 조회
	 * @returns {Promise<void>}
	 */
	listCategory(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM category`, (err, data) => {
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
	 * model : categoryName 별 리스트 조회
	 * @param {string} categoryName
	 * @returns {Promise<void>}
	 */
	listCategoryByCategoryName(categoryName: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * FROM category WHERE categoryName LIKE ?`, [categoryName], (err, data) => {
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
	 * model : category 업데이트
	 * @param {string} categoryName
	 * @param categoryData
	 * @returns {Promise<void>}
	 */
	updateCategory(categoryName: string, categoryData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE category SET ? WHERE categoryName = ?`, [categoryData, categoryName], (err, data) => {
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
	 * model : category 삭제
	 * @param {string} categoryName
	 * @returns {Promise<void>}
	 */
	deleteCategory(categoryName: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM category WHERE categoryName = ?`, [categoryName], (err, data) => {
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

export const category: Category = new Category();
