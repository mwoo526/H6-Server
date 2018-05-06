import * as express from 'express';
import { LectureInfoResource } from '../../../resources/lectureInfo.resource';
import { lectureInfo } from '../model/lectureInfo.model';

export class LectureInfoRoutes {
	public lectureInfoRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.lectureInfoRouter.post('/lecturesInfo', createLectureInfo);
		this.lectureInfoRouter.get('/lecturesInfo', pageListLectureInfo);
		this.lectureInfoRouter.get('/pageListLectureInfoBySearchTerm/:searchTerm', pageListLectureInfoBySearchTerm);
		this.lectureInfoRouter.get('/lecturesInfo/lectureInfoIndex/:lectureInfoIndex', getLectureInfoByLectureInfoIndex);
		this.lectureInfoRouter.get('/lecturesInfo/lectureName/:lectureName', pageGetLectureInfoByLectureName);
		this.lectureInfoRouter.get('/lecturesInfo/professorName/:professorName', pageGetLectureInfoByProfessorName);
		this.lectureInfoRouter.put('/lecturesInfo/lectureInfoIndex/:lectureInfoIndex', updateLectureInfo);
		this.lectureInfoRouter.delete('/lecturesInfo/lectureInfoIndex/:lectureInfoIndex', deleteLectureInfo);
	}
}

/**
 * route: lectureInfo 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createLectureInfo(req, res): Promise<void> {
	let lectureInfoData: any = new LectureInfoResource(req.body);
	try {
		const result = await lectureInfo.createLectureInfo(lectureInfoData.getLectureInfo());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createLectureInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createLectureInfo: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureInfo(req, res): Promise<void> {
	try {
		let page: number = parseInt(req.query.page);
		let count: number = parseInt(req.query.count);
		const result: any = await lectureInfo.pageListLectureInfo(page, count);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'pageListLectureInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListLectureInfo: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo searchTerm 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListLectureInfoBySearchTerm(req, res): Promise<void> {
	let searchTerm: string = req.params.searchTerm;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const result = await lectureInfo.pageListLectureInfoBySearchTerm(searchTerm, page, count);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'listLectureInfoBySearchTerm: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listLectureInfoBySearchTerm: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo index 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureInfoByLectureInfoIndex(req, res): Promise<void> {
	let lectureInfoIndex: number = req.params.lectureInfoIndex;
	try {
		const result = await lectureInfo.getLectureInfoByLectureInfoIndex(lectureInfoIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getLectureInfoByLectureInfoIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getLectureInfoByLectureInfoIndex: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo lectureName page 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageGetLectureInfoByLectureName(req, res): Promise<void> {
	let lectureName: string = req.params.lectureName;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const result = await lectureInfo.pageGetLectureInfoByLectureName(lectureName, page, count);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'pageGetLectureInfoByLectureName: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageGetLectureInfoByLectureName: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo professorName page 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageGetLectureInfoByProfessorName(req, res): Promise<void> {
	let professorName: string = req.params.professorName;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const result = await lectureInfo.pageGetLectureInfoByProfessorName(professorName, page, count);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'pageGetLectureInfoByProfessorName: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageGetLectureInfoByProfessorName: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateLectureInfo(req, res): Promise<void> {
	let lectureInfoIndex: number = req.params.lectureInfoIndex;
	let lectureInfoData: any = new LectureInfoResource(req.body);
	try {
		const result = await lectureInfo.updateLectureInfo(lectureInfoIndex, lectureInfoData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateLectureInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateLectureInfo: 50000'
				});
				break;
		}
	}
}

/**
 * route: lectureInfo 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteLectureInfo(req, res): Promise<void> {
	let lectureInfoIndex: number = req.params.lectureInfoIndex;
	try {
		const result = await lectureInfo.deleteLectureInfo(lectureInfoIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteLectureInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteLectureInfo: 50000'
				});
				break;
		}
	}
}

export const lectureInfoRoutes: LectureInfoRoutes = new LectureInfoRoutes();