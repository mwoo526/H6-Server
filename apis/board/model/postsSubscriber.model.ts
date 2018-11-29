import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class PostsSubscriber {
	createPostsSubscriber(postsSubscriberData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO postsSubscriber SET ?`, [postsSubscriberData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsSubscriberData);
					}
				});
			});
		});
	}

	getPostsSubscriberCount(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				SUM(postsSubscriber.isGood) AS isGoodCount,
			  SUM(postsSubscriber.isBad) AS isBadCount,
        SUM(postsSubscriber.isScrap) AS isScrapCount
				FROM postsSubscriber
        WHERE postsSubscriber.postsIndex = ?
        `, [postsIndex], (err, data) => {
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

	updatePostsSubscriber(postsIndex: number, userIndex: number, postsSubscriberData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE 
				postsSubscriber SET ? 
				WHERE postsIndex = ? 
				AND userIndex = ?`, [postsSubscriberData, postsIndex, userIndex], (err, data) => {
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

	deletePostsSubscriber(postsIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM postsSubscriber WHERE postsIndex = ? AND userIndex = ?`,
					[postsIndex, userIndex], (err, data) => {
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

export const postsSubscriber: PostsSubscriber = new PostsSubscriber();