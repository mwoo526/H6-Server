import * as express from 'express';
import { getRandomInt } from '../../../packages/utils/inviteCode.util';
import { user } from '../../user/model/user.model';
import { userValidation } from '../model/userValidation.model';
import { uuidV1 } from "../../../packages/utils/uuid.util";

export class UserValidationRoutes {
	public userValidationRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		// this.userValidationRouter.post('/userValidation/sendValidationCode/:userId', sendValidationCode);
		// this.userValidationRouter.post('/userValidation/checkValidationCode/:userId', checkValidationCode);
        this.userValidationRouter.get('/userValidation/checkUserId/:userId', checkUserId);
		this.userValidationRouter.get('/userValidation/checkUserNickName/:userNickName', checkUserNickName);

        this.userValidationRouter.post('/userValidation/sendValidationMail/', sendValidationMail);
        this.userValidationRouter.get('/userValidation/verify/:uuid', verifyValidation);
	}
}

/**
 * route: 인증코드 전송
 * @param req
 * @param res
 * @returns {Promise<void>}

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
 */

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
 * route: 인증코드 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function sendValidationMail(req, res): Promise<void> {
    try {
        var host: any = req.get('host');
        var uuid = uuidV1();

        var userId: string = req.body.userId;
        var link: any = "http://"+host+"/userValidation/verify/"+uuid;
        var email: string = req.body.email;

        const resSetUuid = await userValidation.setUuid(userId, uuid);

        var html: any = userId + "님 안녕하세요.<br><br> H6 App 을 정상적으로 이용하기 위해서는 이메일 인증을 해주세요. <br><br>";
        html = html + "아래 링크를 누르시면 인증이 완료 됩니다.<br><br>";
        html = html + "<a href="+link+">"+link+"</a>";

        var mailOptions = {
            to: email,
            subject: "H6 이메일 인증",
            html: html
        };

        const resultMail = await userValidation.sendValidationMail(mailOptions);
        res.send(resultMail);
    } catch (err) {
        res.send(err);
    }
}

/**
 * route: 인증코드 검증
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function verifyValidation(req, res) : Promise<void> {
    try {
        if(req.protocol == "http") {

            var verifiedUuid: any = req.params.uuid;

            var uvUserId = await userValidation.getUserIdData(verifiedUuid);
            uvUserId = JSON.stringify(uvUserId);

            if(uvUserId == "[]")	// 해당 데이터가 없으면 []
                res.end("Unvalidated code Error!!");

            var userId = uvUserId.split('"')[3];

            var uvUpdatedAt = await userValidation.getUpdatedAt(userId);
            uvUpdatedAt = JSON.stringify(uvUpdatedAt);
            uvUpdatedAt = uvUpdatedAt.split('"')[3];

            var uvDate = uvUpdatedAt.split("T")[0].split("-");
            var uvYearUpdatedAt = parseInt(uvDate[0]);
            var uvMonthUpdatedAt = parseInt(uvDate[1]);
            var uvDayUpdatedAt = parseInt(uvDate[2]);

            if(isValidOnDate(uvYearUpdatedAt, uvMonthUpdatedAt, uvDayUpdatedAt)) {
                await userValidation.updateIsValidation(userId);
                await userValidation.deleteUsersValidationRecord(userId);
                await user.updateIsValidation(userId);
                res.end("Email is been Successfully verified");
            }
            else {
                res.end("validation date expired.")
            }
        }
        else {
            res.end("Requset is from unkown source");
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
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonth = date.getMonth()+1;
    var curDay = date.getDate();

    var diffYear = curYear - year;
    var diffMonth = curMonth - month;
    var diffDay = curDay - day;

    if(diffYear == 1 && curMonth == 1 && curDay == 1) return true;
    if(diffYear == 0) {
        if(diffMonth == 1 && curDay == 1) return true;
        if(diffMonth == 0 && diffDay <= 1) return true;
    }
    return false;
}

export const userValidationRoutes: UserValidationRoutes = new UserValidationRoutes();
