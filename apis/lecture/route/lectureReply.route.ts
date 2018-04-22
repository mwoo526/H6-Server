import * as express from 'express';
import { LectureReplyResource } from '../../../resources/lectureReply.resource';
import { lectureInfo } from '../model/lectureInfo.model';
import { lectureReply } from '../model/lectureReply.model';

export class LectureReplyRoutes {
	public lectureReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.lectureReplyRouter.post('/lecturesReply', createLectureReply);
		this.lectureReplyRouter.get('/lecturesReply/lectureInfoIndex/:lectureInfoIndex/userIndex/:userIndex', checkGetLectureReply);
		this.lectureReplyRouter.get('/lecturesReply', pageListLectureReply);
		this.lectureReplyRouter.get('/lecturesReply/lectureReplyIndex/:lectureReplyIndex', getLectureReplyByLectureReplyIndex);
		this.lectureReplyRouter.get('/lecturesReply/userId/:userId', pageGetLectureReplyByUserId);
		this.lectureReplyRouter.get('/lecturesReply/userNickName/:userNickName', pageGetLectureReplyByUserNickName);
		this.lectureReplyRouter.put('/lecturesReply/lectureReplyIndex/:lectureReplyIndex', updateLectureReply);
		this.lectureReplyRouter.delete('/lecturesReply/lectureReplyIndex/:lectureReplyIndex', deleteLectureReply);
	}
}

/**
 * route: lectureReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createLectureReply(req, res): Promise<void> {
	let lectureReplyData: any = new LectureReplyResource(req.body);
	try {
		const result = await lectureReply.createLectureReply(lectureReplyData.getLectureReply());
		const resultTotalScore = await lectureReply.scoreGetLectureReply(result.lectureInfoIndex);
		await lectureInfo.updateLectureInfoAverage(result.lectureInfoIndex, resultTotalScore[0].totalScore);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply 중복 검사
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function checkGetLectureReply(req, res): Promise<void> {
	let lectureInfoIndex = req.params.lectureInfoIndex;
	let userIndex = req.params.userIndex;
	try {
		const result = await lectureReply.checkGetLectureReply(lectureInfoIndex, userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'checkGetLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			case 'LectureReply already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkGetLectureReply: 40901'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkGetLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureReply(req, res): Promise<void> {
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const result: number = await lectureReply.pageListLectureReply(page, count);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'pageListLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply replyIndex 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureReplyByLectureReplyIndex(req, res): Promise<void> {
	let lectureReplyIndex = req.params.lectureReplyIndex;
	try {
		const result = await lectureReply.getLectureReplyByLectureReplyIndex(lectureReplyIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getLectureReplyByLectureReplyIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getLectureReplyByLectureReplyIndex: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply userId 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageGetLectureReplyByUserId(req, res): Promise<void> {
	const userId: string = req.params.userId;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const result = await lectureReply.pageGetLectureReplyByUserId(userId, page, count);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'pageGetLectureReplyByUserId: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageGetLectureReplyByUserId: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply userNickName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageGetLectureReplyByUserNickName(req, res): Promise<void> {
	const userNickName: string = req.params.userNickName;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const result = await lectureReply.pageGetLectureReplyByUserNickName(userNickName, page, count);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'pageGetLectureReplyByUserNickName: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageGetLectureReplyByUserNickName: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateLectureReply(req, res): Promise<void> {
	const lectureReplyIndex: number = req.params.lectureReplyIndex;
	let lectureReplyData: any = new LectureReplyResource(req.body);
	try {
		const result = await lectureReply.updateLectureReply(lectureReplyIndex, lectureReplyData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateLectureReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteLectureReply(req, res): Promise<void> {
	const lectureReplyIndex: number = req.params.lectureReplyIndex;
	try {
		const result = await lectureReply.deleteLectureReply(lectureReplyIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteLectureReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteLectureReply: 50000'
				});
				break;
		}
	}
}

export const lectureReplyRoutes: LectureReplyRoutes = new LectureReplyRoutes();