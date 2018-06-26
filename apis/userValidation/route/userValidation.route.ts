import * as express from 'express';
import { getRandomInt } from '../../../packages/utils/randomInt.util';
import { uuidV1 } from '../../../packages/utils/uuid.util';
import { user } from '../../user/model/user.model';
import { userValidation } from '../model/userValidation.model';

export class UserValidationRoutes {
	public userValidationRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.userValidationRouter.get('/userValidation/userId/:userId', checkUserId);
		this.userValidationRouter.get('/userValidation/userNickName/:userNickName', checkUserNickName);
		this.userValidationRouter.get('/userValidation/userId/:userId/userPw', checkUserPw);
		this.userValidationRouter.get('/userValidation/sendPasswordMail/:userId', sendPasswordMail);
		this.userValidationRouter.post('/userValidation/sendValidationMail', sendValidationMail);
		this.userValidationRouter.get('/userValidation/verify/:uuid', verifyValidation);
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
 * route: 비밀번호 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
async function checkUserPw(req, res): Promise<any> {
	const userId: string = req.params.user;
	const userPw: string = req.body.userPw;
	try {
		await userValidation.checkUserPw(userId, userPw);
		res.send({
			success: true,
			statusCode: 200,
			message: 'checkUserPw: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The ID does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'checkUserPw: 40401'
				});
				break;
			default :
				res.send({
					success: false,
					statusCode: 500,
					message: 'checkUserPw: 50000'
				});
				break;
		}
	}
}

/**
 * route: 새로운 비밀번호 이메일 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function sendPasswordMail(req, res): Promise<void> {
	try {
		let newPassword: any = await String(getRandomInt());
		let userId: string = req.params.userId;
		let html: any = `${userId} 님 안녕하세요.<br><br> 임시비밀번호 ${newPassword} <br><br>`;

		await user.updateUserPassword(userId, newPassword);

		let mailOptions = {
			to: userId,
			subject: '한담 비밀번호 재발급 매일',
			html: html
		};

		await userValidation.sendPasswordMail(mailOptions);
		res.send({
			success: true,
			statusCode: 200,
			message: 'sendPasswordMail'
		});
	} catch (err) {
		switch (err) {
			case 'sendPasswordMail error':
				res.send({
					success: false,
					statusCode: 40001,
					message: 'sendPasswordMail: 40001'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'sendPasswordMail: 50000'
				});
		}
	}
}

/**
 * route: 인증코드 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function sendValidationMail(req, res): Promise<void> {
	try {
		let host: any = req.get('host');
		let uuid = uuidV1();

		let userId: string = req.body.userId;
		let link: any = 'http://' + host + '/userValidation/verify/' + uuid;
		let email: string = req.body.email;

		await userValidation.setUuid(userId, uuid);

		let html: any = userId + '님 안녕하세요.<br><br> 한담을 정상적으로 이용하기 위해서는 이메일 인증을 해주세요. <br><br>';
		html = html + '아래 링크를 누르시면 인증이 완료 됩니다.<br><br>';
		html = html + '<a href=' + link + '>' + link + '</a>';

		let mailOptions = {
			to: email,
			subject: '한담 한성인 인증 메일',
			html: html
		};

		await userValidation.sendValidationMail(mailOptions);
		res.send({
			success: true,
			statusCode: 200,
			message: 'sendValidationMail: 200'
		});

	} catch (err) {
		switch (err) {
			case 'setUuid query error':
				res.send({
					success: false,
					statusCode: 400,
					message: 'setUuid: 40001'
				});
				break;
			case 'sendValidationMail error':
				res.send({
					success: false,
					statusCode: 400,
					message: 'sendValidationMail: 40002'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'sendValidationMail: 50000'
				});
		}
	}
}

/**
 * route: 인증코드 검증
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function verifyValidation(req, res): Promise<void> {
	try {
		if (req.protocol == 'http') {

			let verifiedUuid: any = req.params.uuid;

			let uvUserId = await userValidation.getUserIdData(verifiedUuid);
			uvUserId = JSON.stringify(uvUserId);

			/** 해당 데이터가 없으면 [] */
			if (uvUserId == '[]')
			{
				res.end('Unvalidated code Error!!');
			}

			let userId = uvUserId.split('"')[3];

			let uvUpdatedAt = await userValidation.getUpdatedAt(userId);
			uvUpdatedAt = JSON.stringify(uvUpdatedAt);
			uvUpdatedAt = uvUpdatedAt.split('"')[3];

			let uvDate = uvUpdatedAt.split('T')[0].split('-');
			let uvYearUpdatedAt = parseInt(uvDate[0]);
			let uvMonthUpdatedAt = parseInt(uvDate[1]);
			let uvDayUpdatedAt = parseInt(uvDate[2]);

			if (user.isValidOnDate(uvYearUpdatedAt, uvMonthUpdatedAt, uvDayUpdatedAt)) {
				await userValidation.updateIsValidation(userId);
				await userValidation.deleteUsersValidation(userId);
				await user.updateIsValidation(userId);
				res.end('Email is been Successfully verified');
			}
			else {
				res.end('validation date expired.')
			}
		}
		else {
			res.end('Request is from unknown source');
		}
	} catch (err) {
		res.send(err);
	}
}

export const userValidationRoutes: UserValidationRoutes = new UserValidationRoutes();
