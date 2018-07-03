import { mysqlUtil } from '../../../packages/utils/mysql.util';
import { LectureReply } from '../../lecture/model/lectureReply.model';

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
	 * model: voteItem 생성
	 * @param voteItemData
	 * @returns {Promise<void>}
	 */
	createVoteItem(voteItemData: any): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function (err, connection) {
				await connection.query('INSERT INTO voteItem SET ?', voteItemData, function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(voteItemData);
					}
				})
			})
		});
	}

	/**
	 * model: voteUser 생성
	 * @param voteUserData
	 * @returns {Promise<void>}
	 */
	createVoteUser(voteUserData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function (err, connection) {
				await connection.query('INSERT INTO voteUser SET ?', voteUserData, function(err) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(voteUserData);
					}
				})
			})
		});
	}

	/**
	 * model: voteTopic 조회
	 * @returns {Promise<void>}
	 */
	getVoteTopic(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query(`SELECT * FROM voteTopic WHERE status = 'ACTIVE'`, function(err, rows) {
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
				await connection.query(`SELECT * FROM voteTopic WHERE topicName = ? AND status = 'ACTIVE'`, topicName, function(err, rows) {
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
	 * model: voteItem 조회
	 * @param {number} voteTopicIndex
	 * @returns {Promise<void>}
	 */
	getVoteItem(voteTopicIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM voteItem WHERE voteTopicIndex = ? ORDER BY itemOrder ASC', voteTopicIndex, function(err, rows) {
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
	 * model: voteUser 조회
	 * @param {number} voteTopicIndex
	 * @param {number} voteItemIndex
	 * @returns {Promise<void>}
	 */
	getVoteUser(voteTopicIndex: number, voteItemIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM voteUser WHERE voteTopicIndex = ? AND voteItemIndex = ?', [voteTopicIndex, voteItemIndex], function(err, rows) {
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
	 * model: voteUser 리스트 조회
	 * @param {number} voteTopicIndex
	 * @returns {Promise<void>}
	 */
	listVoteUser(voteTopicIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async function(err, connection) {
				await connection.query('SELECT * FROM voteUser WHERE voteTopicIndex = ?', [voteTopicIndex], function(err, rows) {
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