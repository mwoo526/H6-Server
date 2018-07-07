import * as express from 'express';
import { vote } from '../model/vote';

export class VoteRoutes {
	public voteRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.voteRouter.post('/vote', createVote);
		this.voteRouter.get('/vote', getVote);
		this.voteRouter.get('/checkVote/voteTopicIndex/:voteTopicIndex/voteUserId/:userId', checkVote);
	}
}

/**
 * route: vote 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createVote(req, res): Promise<void> {
	try {
		const voteTopicIndex: number = req.body.voteTopicIndex;
		const voteItemIndex: number = req.body.voteItemIndex;
		const voteUserId: string = req.body.userId;
		const result: string = await vote.createVoteUser({
			voteTopicIndex: voteTopicIndex,
			voteItemIndex: voteItemIndex,
			voteUserId: voteUserId
		});
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createVote: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createVote: 50000'
				});
				break;
		}
	}
}

/**
 * route: vote 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getVote(req, res): Promise<void> {
	try {
		let voteTopic = await vote.getVoteTopic();
		let voteTopicIndex = voteTopic.voteTopicIndex;
		let voteItemIndex = await vote.listVoteItemIndex(voteTopicIndex);
		let totalCount: number = 0;
		let temp: Array<any> = [];

		for (let i = 0; i < voteItemIndex.length; i++) {
			let voteItem = await vote.listVoteItem(voteTopicIndex, voteItemIndex[i].voteItemIndex);
			totalCount = totalCount + voteItem.count;
			temp.push(voteItem);
		}

		voteTopic.totalCount = totalCount;

		/** 결과값 구조화 */
		const result = {
			voteTopic: voteTopic,
			voteItem: temp
		};

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getVote: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getVote: 50000'
				});
				break;
		}
	}
}

/**
 * route: vote 체크
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function checkVote(req, res): Promise<void> {
	try {
		const voteTopicIndex = req.params.voteTopicIndex;
		const voteUserId = req.params.userId;
		const result  = await vote.checkVote(voteTopicIndex, voteUserId);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'checkVote: 200'
		});
	}	catch (err) {
		switch (err) {
			case 'userId does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'checkVote: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkVote: 50000'
				});
				break;
		}
	}
}

export const voteRoutes: VoteRoutes = new VoteRoutes();
