import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class Vote {
	/**
	 * model: voteTopic 생성
	 * @param voteTopicData
	 * @returns {Promise<void>}
	 */
	createVoteTopic(voteTopicData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function (err, connection) {
				await connection.query('INSERT INTO voteTopic SET ?', voteTopicData, function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(voteTopicData);
					}
				})
			})
		});
	}

	/**
	 * model: voteTopic 조회
	 * @param {number} voteTopicIndex
	 * @returns {Promise<void>}
	 */
	getVoteTopic(voteTopicIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM voteTopic WHERE voteTopicIndex = ?', voteTopicIndex, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				})
			})
		});
	}

	/**
	 * model: voteTopic topicName 조회
	 * @param {string} topicName
	 * @returns {Promise<void>}
	 */
	getVoteTopicByTopicName(topicName: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM voteTopic WHERE topicName = ?', topicName, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				})
			})
		});
	}

	/**
	 * model: voteTopic 삭제
	 * @param {number} voteTopicIndex
	 * @returns {Promise<void>}
	 */
	deleteVoteTopic(voteTopicIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function (err, connection) {
				await connection.query('DELETE FROM voteTopic WHERE voteTopicIndex = ?', voteTopicIndex, function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				})
			})
		});
	}
}

export const vote: any = new Vote();