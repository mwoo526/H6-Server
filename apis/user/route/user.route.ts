import * as express from 'express';
import { UserResource } from '../../../resources/user.resource';
import { user } from '../model/user.model';

export class UserRoutes {
	public userRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.userRouter.post('/users', createUser);
		this.userRouter.get('/users', pageListUser);
		this.userRouter.get('/users/userId/:userId', getUser);
		this.userRouter.put('/users/userId/:userId', updateUser);
		this.userRouter.put('/users/userId/:userId/password', updateUserPassword);
		this.userRouter.delete('/users/userId/:userId', deleteUser);
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
 * route: user page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListUser(req, res): Promise<void> {
	try {
		let page: number = parseInt(req.query.page);
		let count: number = parseInt(req.query.count);
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
		userEmail: req.body.userEmail,
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
	try {
		await user.getUserPassword(userId, userPw);
		await user.updateUserPassword(userId, userNewPw);
		res.send({
			success: true,
			statusCode: 200,
			message: 'updateUserPassword: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The password is incorrect':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getUser: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getUser: 50000'
				});
				break;
		}
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
