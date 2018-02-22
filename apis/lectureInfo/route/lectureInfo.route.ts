import * as express from 'express';
import { lectureInfo } from '../model/lectureInfo.model';

export class LectureInfoRoutes {
	public lectureInfoRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.lectureInfoRouter.get('/lecturesInfo/lectureName/:lectureName', getLectureInfoByLectureName);
		this.lectureInfoRouter.get('/lecturesInfo/professorName/:professorName', getLectureInfoByProfessorName);
	}
}

async function getLectureInfoByLectureName(req, res): Promise<void> {
	try {
		let lectureName: string = req.params.lectureName;
		const result = await lectureInfo.getLectureInfoByLectureName(lectureName);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

async function getLectureInfoByProfessorName(req, res): Promise<void> {
	try {
		let professorName: string = req.params.professorName;
		const result = await lectureInfo.getLectureInfoByProfessorName(professorName);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

export const lectureInfoRoutes: LectureInfoRoutes = new LectureInfoRoutes();