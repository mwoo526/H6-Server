import * as express from 'express';
import { getRandomInt } from '../../../packages/utils/inviteCode.util';
import { user } from '../../user/model/user.model';
import { userValidation } from '../model/userValidation.model';

export class UserValidationRoutes {
	public userValidationRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.userValidationRouter.post('/userValidation/sendValidationCode/:userId', sendValidationCode);
		this.userValidationRouter.post('/userValidation/checkValidationCode/:userId', checkValidationCode);
		this.userValidationRouter.get('/userValidation/checkUserId/:userId', checkUserId);
		this.userValidationRouter.get('/userValidation/checkUserNickName/:userNickName', checkUserNickName);
		this.userValidationRouter.get('/userValidation/checkUserEmail/:userEmail', checkEmail);
	}
}

/**
 * route: 인증코드 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function sendValidationCode(req, res): Promise<void> {
	try {
		const userId: string = req.params.userId;
		const userData: any = await user.getUser(userId);
		const userEmail: string = userData[0].userEmail;
		const validationCode: any = await String(getRandomInt());
		const result = await userValidation.createValidationCode(userId, userEmail, validationCode);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: 인증코드 체크
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function checkValidationCode(req, res): Promise<void> {
	const userId: string = req.params.userId;
	const validationCode: any = req.body.validationCode;
	const userData: any = await user.getUser(userId);
	try {
		const result = await userValidation.checkValidationCode(userId, userData, validationCode);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: 아이디 중복 체크
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function checkUserId(req, res): Promise<void> {
	const userId: string = req.params.userId;
	try {
		await userValidation.checkUserId(userId);
		res.send({
			success: true,
			statusCode: 200,
			message: 'checkUserId: 200'
		});
	} catch (err) {
		switch (err) {
			case 'Id already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkUserId: 40901'
				});
				break;
			default :
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkUserId: 50000'
				});
				break;
		}
	}
}

/**
 * route: 닉네임 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
async function checkUserNickName(req, res): Promise<any> {
	const userNickName: string = req.params.userNickName;
	try {
		await userValidation.checkUserNickName(userNickName);
		res.send({
			success: true,
			statusCode: 200,
			message: 'checkUserNickName: 200'
		});
	} catch (err) {
		switch (err) {
			case 'NickName already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkUserNickName: 40901'
				});
				break;
			default :
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkUserNickName: 50000'
				});
				break;
		}
	}
}

/**
 * route: 이메일 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
async function checkEmail(req, res): Promise<any> {
	const userEmail: string = req.params.userEmail;
	try {
		await userValidation.checkUserEmail(userEmail);
		res.send({
			success: true,
			statusCode: 200,
			message: 'checkEmail: 200'
		});
	} catch (err) {
		switch (err) {
			case 'Email already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'checkEmail: 40901'
				});
				break;
			default :
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkEmail: 50000'
				});
				break;
		}
	}
}

export const userValidationRoutes: UserValidationRoutes = new UserValidationRoutes();
