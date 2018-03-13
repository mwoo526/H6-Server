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
		this.lectureReplyRouter.get('/lecturesReply', listLectureReply);
		this.lectureReplyRouter.get('/lecturesReply/:page/:count', pageListLectureReply);
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
 * route: lectureReply 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listLectureReply(req, res): Promise<void> {
	try {
		const result = await lectureReply.listLectureReply();
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
	try {
		let page: number = parseInt(req.params.page);
		let count: number = parseInt(req.params.count);
		const result: number = await lectureReply.pageListLectureReply(page, count);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

export const lectureReplyRoutes: LectureReplyRoutes = new LectureReplyRoutes();