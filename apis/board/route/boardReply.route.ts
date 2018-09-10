import * as express from 'express';
import { BoardReplyResource } from '../../../resources/boardReply.resource';
import { boardReply } from '../model/boardReply.model';

export class BoardReplyRoutes {
	public boardReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.boardReplyRouter.post('/boardReply', createBoardReply);
		this.boardReplyRouter.get('/boardReply/boardIndex/:boardIndex', pageListBoardReplyByBoardIndex);
		this.boardReplyRouter.get('/boardReply/userIndex/:userIndex', pageListBoardReplyByUserIndex);
		this.boardReplyRouter.put('/boardReply/:boardReplyIndex', updateBoardReply);
		this.boardReplyRouter.delete('/boardReply/:boardReplyIndex', deleteBoardReply);

	}
}

/**
 * route : boardReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createBoardReply(req, res) {
	let boardReplyData: any = new BoardReplyResource(req.body);
	try {
		const result: any = await boardReply.createBoardReply(boardReplyData.getBoardReplyData());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createBoardReply 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createBoardReply 500'
				});
				break;
		}
	}

}

/**
 * route : boardReply 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardReplyByBoardIndex(req, res) {
	let boardIndex: number = req.params.boardIndex;
	let page: number = req.query.page;
	let count: number = req.query.count;
	try {
		let resultCount: any = await boardReply.listBoardReplyByBoardIndex(boardIndex);
		let result: any = await boardReply.pageListBoardReplyByBoardIndex(boardIndex, page, count);
		if (resultCount.length == 0) {
			throw 'No Content';
		} else {
			res.send({
				success: true,
				statusCode: 200,
				resultCount: resultCount.length,
				result: result,
				message: 'pageListBoardReplyByBoardIndex 200'
			})
		}
	} catch (err) {
		switch (err) {
			case 'No Content':
				res.send({
					success: true,
					statusCode: 204,
					message: 'pageListBoardReplyByBoardIndex 204'
				})
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListBoardReplyByBoardIndex 500'
				})
				break;
		}
	}
}

/**
 * route : boardReply user 별 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardReplyByUserIndex(req, res) {
	let userIndex: number = req.params.userIndex;
	let page: number = req.query.page;
	let count: number = req.query.count;

	try {
		let resultCount: any = await boardReply.listBoardReplyByUserIndex(userIndex);
		let result: any = await boardReply.pageListBoardReplyByUserIndex(userIndex, page, count);
		if (resultCount.length == 0) {
			throw 'No Content';
		} else {
			res.send({
				success: true,
				statusCode: 200,
				resultCount: resultCount.length,
				result: result,
				message: 'pageListBoardReplyByUserIndex 200'
			})
		}
	} catch (err) {
		switch (err) {
			case 'No Content':
				res.send({
					success: true,
					statusCode: 204,
					message: 'pageListBoardReplyByUserIndex 204'
				})
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListBoardReplyByUserIndex 500'
				})
				break;
		}
	}
}

/**
 * route : boardReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateBoardReply(req, res) {
	let boardReplyIndex: number = req.params.boardReplyIndex;
	let boardReplyData: any = await new BoardReplyResource(req.body);
	try {
		const result: any = await boardReply.updateBoardReply(boardReplyIndex, boardReplyData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateBoardReply 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateBoardReply 500'
				})
		}
	}
}

/**
 * route : boardReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteBoardReply(req, res) {
	let boardReplyIndex: number = req.params.boardReplyIndex;
	try {
		const result: any = await boardReply.deleteBoardReply(boardReplyIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteBoardReply 200'
		})
	} catch (err) {
		res.send({
			success: false,
			statusCode: 500,
			message: 'deleteBoardReply 500'
		})
	}
}

export const boardReplyRoutes: BoardReplyRoutes = new BoardReplyRoutes();