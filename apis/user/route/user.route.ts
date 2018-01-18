import * as express from 'express';
import { UserResource } from '../../../resource/user.resource';
import { user } from '../model/user.model';

export class UserRoutes {
	public userRouter: express.Router = express.Router();

	constructor(){
		this.router();
	}

	public router() {
		this.userRouter.post('/users', createUser);
		this.userRouter.get('/users', listUser);
		this.userRouter.get('/users/:userId', getUser);
		this.userRouter.put('/users/:userId', updateUser);
		this.userRouter.delete('/users/:userId', deleteUser);
	}
}

/**
 * route: user 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createUser(req, res): Promise<void> {
	const userData: any = new UserResource(req.body);
	try {
		const result: any = await user.createUser(userData);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

/**
 * route: user 리스트 조회
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
 * route: user studentId 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getUser(req, res): Promise<void> {
	let userId: string = req.params.userId;
	try {
		const result: any = await user.getUser(userId);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

/**
 * route: user 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateUser(req, res): Promise<void> {
	let userId: string = req.params.userId;
	let userData = {
		userNickName: req.body.userNickName,
		major: req.body.major,
		minor: req.body.minor,
		doubleMajor: req.body.doubleMajor,
		connectedMajor: req.body.connectedMajor,
		admissionYear: req.body.admissionYear
	};
	try {
		const result: any = await user.updateUser(userId, userData);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

/**
 * route: user 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteUser(req, res): Promise<void> {
	let userId: string = req.params.userId;
	try {
		const result: any = await user.deleteUser(userId);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
}

export const userRoutes: UserRoutes = new UserRoutes();