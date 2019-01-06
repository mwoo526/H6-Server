import * as express from 'express';
import { slack } from '../../../packages/core/slack/slack';
import { PostsReportResource } from '../../../resources/postsReport.resource';
import { postsReport } from '../model/postsReport.model';
import { posts } from "../model/posts.model";
import { user } from '../../user/model/user.model';

export class PostsReportRoutes {
	public postsReportRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsReportRouter.post('/postsReport', createPostsReport);
		this.postsReportRouter.get('/postsReport', listPostsReport);
		this.postsReportRouter.get('/postsReport/userId/:userId', getPostsReportByUserIndex);
		this.postsReportRouter.get('/postsReport/postsIndex/:postsIndex', getPostsReportByPostIndex);
		this.postsReportRouter.put('/postsReport/postsReportIndex/:postsReportIndex', updatePostsReport);
		this.postsReportRouter.delete('/postsReport/', deletePostsReport);
	}
}

/**
 * route: postsReport 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createPostsReport(req, res): Promise<void> {
	const { postsIndex, userId } = req.body;
	try {
        const resultUser = await user.getUser(userId);
        const { userIndex } = resultUser[0];

        delete req.body.userId;
        req.body.userIndex = userIndex;

        let postsReportData: any = new PostsReportResource(req.body);

        const alarmCount = 3;
		const checkResult: any = await postsReport.checkPostsReport(postsIndex, userIndex);
		if (checkResult.length > 0) {
			res.send({
				success: false,
				statusCode: 409,
				result: checkResult,
				message: 'already Reported: 40901'
			});
			return;
		}

		const result: any = await postsReport.createPostsReport(postsReportData.getPostsReport());
		let countResult: any = await postsReport.getPostsReportCount(result['postsIndex']);
		countResult = JSON.parse(JSON.stringify(countResult));

		const reportCount = countResult[0]['reportCount'];
		if (reportCount === alarmCount) {
			await posts.updatePostsStatus(result['postsIndex'], 'INACTIVE');
			await slack.sendReportMessage('report', result['postsIndex'], reportCount);
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createPostsReport: 200'
		});
	} catch (err) {
		console.log(err);
		switch (err) {
			case 'check Posts Report Error':
				res.send({
					success: false,
					statusCode: 50001,
					message: 'check Posts Report Error: 50001'
				});
				break;
			case 'get Posts Report Count Error':
				res.send({
					success: false,
					statusCode: 50002,
					message: 'get Posts Report Count Error: 50002'
				});
				break;
            case 'posts Status Update Error':
                res.send({
                    success: false,
                    statusCode: 50003,
                    message: 'posts Status Update Error: 50003'
                });
                break;
            default:
				res.send({
					success: false,
					statusCode: 50000,
					message: 'createPostsReport: 50000'
				});
		}
	}
}

/**
 * route: postsReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function listPostsReport(req, res): Promise<void> {
	try {
		const result: any = await postsReport.listPostsReport();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getPostsReport: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPostsReport: 50000'
				});
		}
	}
}

/**
 * route: UserIndex에 따른 postsReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPostsReportByUserIndex(req, res): Promise<void> {
	const { userId } = req.params;
	try {
        const resultUser = await user.getUser(userId);
        const { userIndex } = resultUser[0];

		const result: any = await postsReport.getPostsReportByUserIndex(userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getPostsReportByUser: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPostsReportByUser: 50000'
				});
		}
	}
}

/**
 * route: postsIndex에 따른 postsReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPostsReportByPostIndex(req, res): Promise<void> {
	const postsIndex: number = req.params.postsIndex;
	try {
		const result: any = await postsReport.getPostsReportByPostIndex(postsIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getPostsReportByPost: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPostsReportByPost: 50000'
				});
		}
	}
}

/**
 * route: postsReport 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updatePostsReport(req, res): Promise<void> {
	const { postsReportIndex } = req.params;
	const { userId } = req.body;
	try {
        const resultUser = await user.getUser(userId);
        const { userIndex } = resultUser[0];

        delete req.body.userId;
        req.body.userIndex = userIndex;

        let postsReportData: any = new PostsReportResource(req.body);

		const result = await postsReport.updatePostsReport(postsReportIndex, postsReportData.getPostsReport());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updatePostsReport: 200'
		});

	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updatePostsReport: 50000'
				});
		}
	}
}

/**
 * route: postsReport 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deletePostsReport(req, res): Promise<void> {
	const { postsIndex, userId } = req.body;
    try {
        const resultUser = await user.getUser(userId);
        const { userIndex } = resultUser[0];

		const result: any = await postsReport.deletePostsReport(postsIndex, userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deletePostsReport: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deletePostsReport: 50000'
				});
		}
	}
}

export const postsReportRoutes: PostsReportRoutes = new PostsReportRoutes();