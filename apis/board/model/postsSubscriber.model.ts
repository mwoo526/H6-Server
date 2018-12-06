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

	getPostsSubscriber(postsIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				SUM(postsSubscriber.isGood) AS goodCount,
			  SUM(postsSubscriber.isBad) AS badCount,
        postsSubscriber.isScrap
				FROM postsSubscriber
				INNER JOIN user ON user.userIndex = postsSubscriber.userIndex
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

	getPostsSubscriberCountByUserIndex(postsIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsIndex,
				t1.isGood,
				t1.isBad,
				t1.isScrap,
				t2.userId,
				t2.userNickName
				FROM postsSubscriber AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.postsIndex = ?
        AND t1.userIndex = ?
        `, [postsIndex, userIndex], (err, data) => {
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