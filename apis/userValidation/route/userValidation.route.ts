import * as express from 'express';
import { uuidV1 } from '../../../packages/utils/uuid.util';
import { user } from '../../user/model/user.model';
import { userValidation } from '../model/userValidation.model';

export class UserValidationRoutes {
	public userValidationRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.userValidationRouter.get('/userValidation/checkUserId/:userId', checkUserId);
		this.userValidationRouter.get('/userValidation/checkUserNickName/:userNickName', checkUserNickName);
		this.userValidationRouter.post('/userValidation/sendValidationMail/', sendValidationMail);
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

		try {
            await userValidation.setUuid(userId, uuid);
        } catch (err) {
            res.send({
                success: false,
                statusCode: 500,
                message: 'setUuid: 500'
            });
        }

		let html: any = userId + '님 안녕하세요.<br><br> H6 App 을 정상적으로 이용하기 위해서는 이메일 인증을 해주세요. <br><br>';
		html = html + '아래 링크를 누르시면 인증이 완료 됩니다.<br><br>';
		html = html + '<a href=' + link + '>' + link + '</a>';

		let mailOptions = {
			to: email,
			subject: 'H6 이메일 인증',
			html: html
		};

		try {
            await userValidation.sendValidationMail(mailOptions);
            res.send({
                success: true,
                statusCode: 200,
                message: 'sendValidationMail: 200'
            });
        } catch (err) {
            res.send({
                success: false,
                statusCode: 500,
                message: 'sendValidationMail: 500'
            });
        }
	} catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'sendValidationMail(): 500'
        });
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

			if (uvUserId == '[]')	// 해당 데이터가 없으면 []
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

			if (isValidOnDate(uvYearUpdatedAt, uvMonthUpdatedAt, uvDayUpdatedAt)) {
				await userValidation.updateIsValidation(userId);
				await userValidation.deleteUsersValidationRecord(userId);
				await user.updateIsValidation(userId);
				res.end('Email is been Successfully verified');
			}
			else {
				res.end('validation date expired.')
			}
		}
		else {
			res.end('Requset is from unkown source');
		}
	} catch (err) {
		res.send(err);
	}
}

/**
 * route: 인증기간 검증
 * @returns boolean
 */
function isValidOnDate(year, month, day) {
	let date = new Date();
	let curYear = date.getFullYear();
	let curMonth = date.getMonth() + 1;
	let curDay = date.getDate();

	let diffYear = curYear - year;
	let diffMonth = curMonth - month;
	let diffDay = curDay - day;

	if (diffYear == 1 && curMonth == 1 && curDay == 1) {
		return true;
	}
	if (diffYear == 0) {
		if (diffMonth == 1 && curDay == 1) {
			return true;
		}
		if (diffMonth == 0 && diffDay <= 1) {
			return true;
		}
	}
	return false;
}

export const userValidationRoutes: UserValidationRoutes = new UserValidationRoutes();
