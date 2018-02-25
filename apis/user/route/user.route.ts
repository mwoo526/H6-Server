import * as express from 'express';
import { encriptionPw } from '../../../packages/utils/encryption.utli';
import { UserResource } from '../../../resources/user.resource';
import { user } from '../model/user.model';

export class UserRoutes {
	public userRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.userRouter.post('/users', createUser);
		this.userRouter.get('/users', listUser);
		this.userRouter.get('/users/:page/:count', pageListUser);
		this.userRouter.get('/users/:userId', getUser);
		this.userRouter.put('/users/:userId', updateUser);
		this.userRouter.put('/users/:userId/password', updateUserPassword);
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
		res.send(err);
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
		res.send(err);
	}
}

/**
 * route: user page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListUser(req, res): Promise<void> {
	try {
		let page: number = parseInt(req.params.page);
		let count: number = parseInt(req.params.count);
		const result: any = await user.pageListUser(page, count);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: user userId 조회
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
		res.send(err);
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
		email: req.body.email,
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
		res.send(err);
	}
}

/**
 * route: user 비밀번호 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateUserPassword(req, res): Promise<void> {
	let userId: string = req.params.userId;
	let userPw: string = req.body.userPw;
	let userNewPw: string = req.body.userNewPw;
	const getUserPw: any = await user.getUser(userId);
	try {
		if (encriptionPw.getHash(userPw) === getUserPw[0].userPw) {
			const userPw: any = encriptionPw.getHash(userNewPw);
			const result: any = await user.updateUserPassword(userId, userPw);
			res.send(result);
		} else {
			throw new Error('The password is incorrect');
		}
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
		res.send(err);
	}
}

export const userRoutes: UserRoutes = new UserRoutes();
