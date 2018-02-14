import { LectureResource } from '../../../resources/lecture.resource';
import { lecture } from '../model/lecture.model';
import * as express from 'express';

export class LectureRoutes {
	public lectureRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.lectureRouter.post('/lectures', createLecture);
		this.lectureRouter.get('/lectures', listLecture);
		this.lectureRouter.get('/lectures/lectureIndex/:lectureIndex', getLectureByLectureIndex);
		this.lectureRouter.get('/lectures/lectureCode/:lectureCode', getLectureByLectureCode);
		this.lectureRouter.get('/lectures/professorName/:professorName', getLectureByProfessorName);
		this.lectureRouter.get('/lectures/lectureName/:lectureName', getLectureByLectureName);
		this.lectureRouter.get('/lectures/track/:track', getLectureByTrack);
		this.lectureRouter.put('/lectures/:lectureIndex', updateLecture);
		this.lectureRouter.delete('/lectures/:lectureIndex', deleteLecture);
	}
}

/**
 * route: lecture 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createLecture(req, res): Promise<void> {
	let lectureData: any = new LectureResource(req.body);
	try {
		const result: any = await lecture.createLecture(lectureData.getLecture());
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lecture 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listLecture(req, res): Promise<void> {
	try {
		const result = await lecture.listLecture();
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lecture index 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByLectureIndex(req, res): Promise<void> {
	try {
		let lectureIndex: number = req.params.lectureIndex;
		const result = await lecture.getLectureByLectureIndex(lectureIndex);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lecture code 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByLectureCode(req, res): Promise<void> {
	try {
		let lectureCode: string = req.params.lectureCode;
		const result = await lecture.getLectureByLectureCode(lectureCode);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lecture professorName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByProfessorName(req, res): Promise<void> {
	try {
		let professorName: string = req.params.professorName;
		const result = await lecture.getLectureByProfessorName(professorName);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lecture lectureName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByLectureName(req, res): Promise<void> {
	try {
		let lectureName: string = req.params.lectureName;
		const result = await lecture.getLectureByLectureName(lectureName);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lecture track 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByTrack(req, res): Promise<void> {
	try {
		let track: string = req.params.track;
		const result = await lecture.getLectureByTrack(track);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lecture 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateLecture(req, res): Promise<void> {
	try {
		let lectureIndex: number = req.params.lectureIndex;
		let lectureData: any = new LectureResource(req.body);
		const result = await lecture.updateLecture(lectureIndex, lectureData.getLecture());
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: lecture 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteLecture(req, res): Promise<void> {
	try {
		let lectureIndex: number = req.params.lectureIndex;
		const result = await lecture.deleteLecture(lectureIndex);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

export const lectureRoutes: LectureRoutes = new LectureRoutes();
