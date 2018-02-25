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
		this.lectureInfoRouter.get('/lecturesInfo', listLectureInfo);
		this.lectureInfoRouter.get('/lecturesInfo/:page/:count', pageListLectureInfo);
		this.lectureInfoRouter.get('/lecturesInfo/lectureInfoIndex/:lectureInfoIndex', getLectureInfoByLectureInfoIndex);
		this.lectureInfoRouter.get('/lecturesInfo/lectureName/:lectureName', getLectureInfoByLectureName);
		this.lectureInfoRouter.get('/lecturesInfo/lectureName/:lectureName/:page/:count', pageGetLectureInfoByLectureName);
		this.lectureInfoRouter.get('/lecturesInfo/professorName/:professorName', getLectureInfoByProfessorName);
		this.lectureInfoRouter.get('/lecturesInfo/professorName/:professorName/:page/:count', pageGetLectureInfoByProfessorName);
		this.lectureInfoRouter.put('/lecturesInfo/:lectureInfoIndex', updateLectureInfo);
		this.lectureInfoRouter.delete('/lecturesInfo/:lectureInfoIndex', deleteLectureInfo);
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
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lectureInfo 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listLectureInfo(req, res): Promise<void> {
	try {
		const result = await lectureInfo.listLectureInfo();
		res.send(result);
	} catch (err) {
		res.send(err);
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
		let page: number = parseInt(req.params.page);
		let count: number = parseInt(req.params.count);
		const result: any = await lectureInfo.pageListLectureInfo(page, count);
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lectureInfo lectureName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureInfoByLectureName(req, res): Promise<void> {
	let lectureName: string = req.params.lectureName;
	try {
		const result = await lectureInfo.getLectureInfoByLectureName(lectureName);
		res.send(result);
	} catch (err) {
		res.send(err);
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
	let page: number = parseInt(req.params.page);
	let count: number = parseInt(req.params.count);
	try {
		const result = await lectureInfo.pageGetLectureInfoByLectureName(lectureName, page, count);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lectureInfo professorName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureInfoByProfessorName(req, res): Promise<void> {
	let professorName: string = req.params.professorName;
	try {
		const result = await lectureInfo.getLectureInfoByProfessorName(professorName);
		res.send(result);
	} catch (err) {
		res.send(err);
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
	let page: number = parseInt(req.params.page);
	let count: number = parseInt(req.params.count);
	try {
		const result = await lectureInfo.pageGetLectureInfoByProfessorName(professorName, page, count);
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
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
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

export const lectureInfoRoutes: LectureInfoRoutes = new LectureInfoRoutes();