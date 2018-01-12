import * as express from 'express';
import { user } from '../model/user.model';

export class UserRoutes {
	public userRouter: express.Router = express.Router();

	constructor(){
		this.router();
	}

	public router() {
		this.userRouter.post('/users', createUser);
		this.userRouter.get('/users', listUser);
		this.userRouter.get('/users/:studentId', getUser);
		this.userRouter.put('/users/:studentId', updateUser);
		this.userRouter.delete('/users/:studentId', deleteUser);
	}
}

/**
 * 라우트: user 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createUser(req, res): Promise<void> {
	let userData = {
		studentId: req.body.studentId,
		name: req.body.name
	};
	try {
		const result: any = await user.createUser(userData);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

/**
 * 라우트: user 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listUser(req, res): Promise<void> {
	try {
		const result: any = await user.listUser();
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

/**
 * 라우트: user studentId 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getUser(req, res): Promise<void> {
	let studentId: number = req.params.studentId;
	try {
		const result: any = await user.getUser(studentId);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

/**
 * 라우트: user 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateUser(req, res): Promise<void> {
	let studentId: number = req.params.studentId;
	let userData = {
		name: req.body.name
	};
	try {
		const result: any = await user.updateUser(studentId, userData);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

/**
 * 라우트: user 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteUser(req, res): Promise<void> {
	let studentId: number = req.params.studentId;
	try {
		const result: any = await user.deleteUser(studentId);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

export const userRoutes: UserRoutes = new UserRoutes();