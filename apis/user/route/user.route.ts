import * as express from 'express';
import { s3Util } from '../../../packages/utils/s3.util';
import { UserResource } from '../../../resources/user.resource';
import { lectureReply } from '../../lecture/model/lectureReply.model';
import { userValidation } from '../../userValidation/model/userValidation.model';
import { user } from '../model/user.model';

let avatar = s3Util.upload.single('avatar');

export class UserRoutes {
	public userRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.userRouter.post('/users', createUser);
		this.userRouter.post('/users/userId/:userId/uploadAvatar', uploadAvatar);
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
	try {
		const result: any = await user.updateUser(userId, req.body);
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
		const resultUser = await user.getUser(userId);
		await userValidation.deleteUserValidation(userId);
		await lectureReply.deleteLectureReplyByUserIndex(resultUser[0].userIndex);
		await user.deleteUser(userId);
		res.send({
			success: true,
			statusCode: 200,
			message: 'deleteUser: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteUser: 50000'
				});
				break;
		}
	}
}

/**
 * route: user avatar 업로드
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function uploadAvatar(req, res): Promise<void> {
	let userId: string = req.params.userId;
	avatar(req, res, async function (err) {
		if (err) {
			if (err.message === 'The AWS Access Key Id you provided does not exist in our records.') {
				res.send({
					success: false,
					statusCode: 403,
					message: 'uploadAvatar: 40301'
				});
			}
			if (err.message === 'The request signature we calculated does not match the signature you provided. Check your key and signing method.') {
				res.send({
					success: false,
					statusCode: 403,
					message: 'uploadAvatar: 40302'
				});
			}
		}
		try {
			let result = req.file;
			/** 아바타 등록 */
			await user.updateUser(userId, {
				avatar: result.location
			});
			res.send({
				success: true,
				statusCode: 200,
				result: result.location,
				message: 'uploadAvatar: 200'
			});
		} catch (err) {
			switch (err) {
				default:
					res.send({
						success: false,
						statusCode: 500,
						message: 'uploadAvatar: 50000'
					});
					break;
			}
		}
	});
}

export const userRoutes: UserRoutes = new UserRoutes();
