import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class PostsReplySubscriber {
	/**
	 * model: postsReplySubscriber 생성
	 * @param postsReplySubscriberData
	 */
	createPostsReplySubscriber(postsReplySubscriberData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO postsReplySubscriber SET ?`, [postsReplySubscriberData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(postsReplySubscriberData);
					}
				});
			});
		});
	}

	/**
	 * model: postsReplySubscriber 게시글 댓글별 조회
	 * @param postsReplyIndex
	 */
	getPostsReplySubscriber(postsReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsReplyIndex,
				t1.isGood,
				t1.isBad,
				t2.userIndex,
				t2.userId,
				t2.userNickName
				FROM postsReplySubscriber AS t1
				INNER JOIN user AS t2 ON user.userIndex = postsReplySubscriber.userIndex
        WHERE postsReplySubscriber.postsReplyIndex = ?
        `, [postsReplyIndex], (err, data) => {
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

	getPostsReplySubscriberSumCount(postsReplyIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				SUM(postsReplySubscriber.isGood) AS goodCount,
			  SUM(postsReplySubscriber.isBad) AS badCount
				FROM postsReplySubscriber
        WHERE postsReplySubscriber.postsReplyIndex = ?
        `, [postsReplyIndex], (err, data) => {
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
	 * model: postsReplySubscriber 사용자별 개수 조회
	 * @param postsReplyIndex
	 * @param userIndex
	 */
	getPostsReplySubscriberByUserIndex(postsReplyIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT 
				t1.postsReplyIndex,
				t1.isGood,
				t1.isBad,
				t2.userId,
				t2.userNickName
				FROM postsReplySubscriber AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.postsReplyIndex = ?
        AND t1.userIndex = ?
        `, [postsReplyIndex, userIndex], (err, data) => {
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
	 * model: postsReplySubscriber 업데이트
	 * @param postsReplyIndex
	 * @param userIndex
	 * @param postsReplySubscriberData
	 */
	updatePostsReplySubscriber(postsReplyIndex: number, userIndex: number, postsReplySubscriberData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE 
				postsReplySubscriber SET ? 
				WHERE postsReplyIndex = ? 
				AND userIndex = ?`, [postsReplySubscriberData, postsReplyIndex, userIndex], (err, data) => {
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
	 * model: postsReplySubscriber 삭제
	 * @param postsReplyIndex
	 * @param userIndex
	 */
	deletePostsReplySubscriber(postsReplyIndex: number, userIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM postsReplySubscriber WHERE postsReplyIndex = ? AND userIndex = ?`,
					[postsReplyIndex, userIndex], (err, data) => {
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

export const postsReplySubscriber: PostsReplySubscriber = new PostsReplySubscriber();