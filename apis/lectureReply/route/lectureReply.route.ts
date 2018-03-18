import * as express from 'express';
import { LectureReplyResource } from '../../../resources/lectureReply.resource';
import { lectureReply } from '../model/lectureReply.model';

export class LectureReplyRoutes {
	public lectureReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.lectureReplyRouter.post('/lecturesReply', createLectureReply);
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
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

export const lectureReplyRoutes: LectureReplyRoutes = new LectureReplyRoutes();