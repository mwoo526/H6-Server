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
		this.userValidationRouter.get('/userValidation/checkEmail/:email', checkEmail);
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
		const email: string = userData[0].email;
		const validationCode: any = await String(getRandomInt());
		const result = await userValidation.createValidationCode(userId, email, validationCode);
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
		const result = await userValidation.checkUserId(userId);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: 이메일 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
async function checkEmail(req, res): Promise<any> {
	const email: string = req.params.email;
	try {
		const result = await userValidation.checkEmail(email);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
}

export const userValidationRoutes: UserValidationRoutes = new UserValidationRoutes();
