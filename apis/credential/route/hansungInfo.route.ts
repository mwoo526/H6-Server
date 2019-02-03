import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { sqsUtil } from '../../../packages/utils/sqs.util';
import { hansungInfo } from '../model/hansungInfo.model';

export class HansungInfoRoutes {
	public hansungInfoRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.hansungInfoRouter.post('/hansungInfo', createHansungInfo);
		this.hansungInfoRouter.post('/hansungInfo/grades', createHansungInfoGrades);
		this.hansungInfoRouter.get('/hansungInfo', getHansungInfo);
		this.hansungInfoRouter.get('/hansungInfo/grades', getHansungInfoGrades);
		this.hansungInfoRouter.delete('/hansungInfo', deleteHansungInfo);
	}
}

/**
 * route: hansungInfo 생성
 * @param req
 * @param res
 */
async function createHansungInfo(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.createHansungInfo({
			userIndex: userData.tokenIndex,
			hansungInfoId: req.body.hansungInfoId,
			hansungInfoPw: req.body.hansungInfoPw,
			accessCount: 0,
			schedule: [],
			grades: []
		});

		if (result !== null) {
			let params = sqsUtil.sendParams;
			sqsUtil.sendParams.MessageBody = `hansungInfo:${result.hansungInfoId}:${result.hansungInfoPw}`;
			await sqsUtil.sendMessage(params);

			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createHansungInfo: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'createHansungInfo : 40901'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createHansungInfo : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo grades 생성
 * @param req
 * @param res
 */
async function createHansungInfoGrades(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.getHansungInfo(userData.tokenIndex);

		if (result === null) {
			res.send({
				success: false,
				statusCode: 404,
				message: 'createHansungInfoGrades : 40401'
			});
		} else {
			let params = sqsUtil.sendParams;
			sqsUtil.sendParams.MessageBody = `hansungInfoGrades:${result.hansungInfoId}:${result.hansungInfoPw}`;
			await sqsUtil.sendMessage(params);

			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createHansungInfoGrades: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'createHansungInfoGrades : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createHansungInfoGrades : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo 조회
 * @param req
 * @param res
 */
async function getHansungInfo(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.getHansungInfo(userData.tokenIndex);

		if (result !== null) {
			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getHansungInfo: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getHansungInfo : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getHansungInfo : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo grades 조회
 * @param req
 * @param res
 */
async function getHansungInfoGrades(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.getHansungInfo(userData.tokenIndex);

		if (result !== null) {
			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result.grades || null,
			message: 'getHansungInfoGrades: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getHansungInfoGrades : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getHansungInfoGrades : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansungInfo 삭제
 * @param req
 * @param res
 */
async function deleteHansungInfo(req, res) {
	try {
		let userData = auth(req);
		const result: any = await hansungInfo.deleteHansung(userData.tokenIndex);

		if (result !== null) {
			delete result.hansungInfoPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteHansungInfo: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'deleteHansungInfo : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteHansungInfo : 50000'
				});
				break;
		}
	}
}

export const hansungInfoRoutes: HansungInfoRoutes = new HansungInfoRoutes();