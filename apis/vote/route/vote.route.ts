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
		let voteTopicIndex = voteTopic[0].voteTopicIndex;
		let voteItem = await vote.listVoteItem(voteTopicIndex);
		let voteListUser = await vote.listVoteUser(voteTopicIndex);
		let temp: Array<any> = [];
		let resultArray: Array<any> = [];

		/** 투표자 리스트 출력 후 임시배열에 저장 */
		for (let i = 0; i < voteListUser.length; i++) {
			temp.push(voteListUser[i].voteItemIndex);
		}
		/** 공통 인자 추출하여 객체화 */
		let voteUserObj = temp.reduce(function(x, y) {
			x[y] = ++x[y]|| 1;
			return x;
		}, {});

		/** key-value 분리 후 배열 푸시 */
		for (let key in voteUserObj) {
			let a = {
				voteItemIndex: key,
				voteItemCount: voteUserObj[key]
			};
			resultArray.push(a);
		}

		/** voteUser 추가 데이터 */
		for (let i = 0; i < resultArray.length; i++) {
			const resultVoteItemData = await vote.getVoteItem(resultArray[i].voteItemIndex);
			resultArray[i].itemName = resultVoteItemData[0].itemName;
			resultArray[i].itemOrder =  resultVoteItemData[0].itemOrder;
		}

		/** 결과값 구조화 */
		const result = {
			voteTopic: voteTopic,
			voteItem: voteItem,
			voteUser: resultArray
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
		await vote.checkVote(voteTopicIndex, voteUserId);
		res.send({
			success: true,
			statusCode: 200,
			message: 'checkVote: 200'
		});
	}	catch (err) {
		switch (err) {
			case 'userId already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkVote: 40901'
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
