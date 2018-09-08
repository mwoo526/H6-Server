import * as aws from 'aws-sdk';
import * as express from 'express';
import { s3Util } from '../../../packages/utils/s3.util';
import { uuidV1 } from '../../../packages/utils/uuid.util';
import { UserResource } from '../../../resources/user.resource';
import { lectureReply } from '../../lecture/model/lectureReply.model';
import { userValidation } from '../../userValidation/model/userValidation.model';
import { user } from '../model/user.model';

let s3 = new aws.S3();
let avatar = s3Util.upload.single('avatar');

export class UserRoutes {
	public userRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.userRouter.post('/user', createUser);
		this.userRouter.post('/user/userId/:userId/uploadAvatar', uploadAvatar);
		this.userRouter.get('/user', pageListUser);
		this.userRouter.get('/user/userId/:userId', getUser);
		this.userRouter.put('/user/userId/:userId', updateUser);
		this.userRouter.put('/user/userId/:userId/password', updateUserPassword);
		this.userRouter.delete('/user/userId/:userId', deleteUser);
		this.userRouter.delete('/user/userId/:userId/deleteAvatar', deleteAvatar);
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
		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'getUser: 200'
		});
	} catch (err) {
		switch (err) {
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
					message: 'updateUserPassword: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateUserPassword: 50000'
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
		// TODO(@jade): 유저 삭제에 대한 정책 정해지면 고도화  date: 2018. 9. 2. AM 1:54
		// const resultUser = await user.getUser(userId);
		// await userValidation.deleteUserValidation(userId);
		// await lectureReply.deleteLectureReplyByUserIndex(resultUser[0].userIndex);
		// await user.deleteUser(userId);
		await user.updateUser(userId, {
			userId: uuidV1(),
			userNickName: '탈퇴한 회원'
		});
		await user.createUserLog({
			userId: req.params.userId,
			log: 'Withdrawal success'
		});
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
	avatar(req, res, async function(err) {
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

async function deleteAvatar(req, res): Promise<void> {
	let userId: string = req.params.userId;
	try {
		const resultUser = await user.getUser(userId);
		if (resultUser[0].avatar) {
			let splitAvatar = resultUser[0].avatar.split('/');
			let splitAvatarStage = splitAvatar[2].split('.');
			await s3.deleteObject(
				{
					Bucket: `${splitAvatarStage[0]}/${splitAvatar[3]}`,
					Key: `${splitAvatar[4]}`
				},
				(err) => {
					if (err) {
						throw err;
					}
				}
			);
			await user.updateUser(userId, {
				avatar: null
			});
			res.send({
				success: true,
				statusCode: 200,
				message: 'deleteAvatar: 200'
			});
		} else {
			res.send({
				success: true,
				statusCode: 404,
				message: 'deleteAvatar: 40401'
			});
		}
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteAvatar: 50000'
				});
				break;
		}
	}
}

export const userRoutes: UserRoutes = new UserRoutes();
