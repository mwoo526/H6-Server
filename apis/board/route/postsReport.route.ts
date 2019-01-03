import * as express from 'express';
import { slack } from '../../../packages/core/slack/slack';
import { PostsReportResource } from '../../../resources/postsReport.resource';
import { postsReport } from '../model/postsReport.model';

export class PostsReportRoutes {
	public postsReportRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsReportRouter.post('/postsReport', createPostsReport);
		this.postsReportRouter.get('/postsReport', getPostsReport);
		this.postsReportRouter.get('/postsReport/user/:userIndex', getPostsReportByUser);
		this.postsReportRouter.get('/postsReport/posts/:postsIndex', getPostsReportByPost);
		this.postsReportRouter.put('/postsReport/:postsReportIndex', updatePostsReport);
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
	let postsReportData: any = new PostsReportResource(req.body);
	const alarmCount = 3;
	try {
		const checkResult: any = await postsReport.checkPostsReport(req.body.postsIndex, req.body.userIndex);
		if (checkResult.length > 0) {
			res.send({
				success: true,
				statusCode: 200,
				result: checkResult,
				message: 'already Reported: 200'
			});
			return;
		}

		const result: any = await postsReport.createPostsReport(postsReportData.getPostsReport());
		let countResult: any = await postsReport.getPostsReportCount(result['postsIndex']);
		countResult = JSON.parse(JSON.stringify(countResult));

		const reportCount = countResult[0]['reportCount'];
		if (reportCount === alarmCount) {
			// 게시물 비활성화 처리 관련 코드 삽입예정
			await slack.sendReportMessage('deploy', result['postsIndex'], reportCount);
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createPostsReport: 200'
		});
	} catch (err) {
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

async function getPostsReport(req, res): Promise<void> {
	try {
		const result: any = await postsReport.getPostsReport();
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
					message: 'getPostsReport: 500'
				});
		}
	}
}

async function getPostsReportByUser(req, res): Promise<void> {
	const userIndex: number = req.params.userIndex;
	try {
		const result: any = await postsReport.getPostsReportByUser(userIndex);
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
					message: 'getPostsReportByUser: 500'
				});
		}
	}
}

async function getPostsReportByPost(req, res): Promise<void> {
	const postsIndex: number = req.params.postsIndex;
	try {
		const result: any = await postsReport.getPostsReportByPost(postsIndex);
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
					message: 'getPostsReportByPost: 500'
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
	let postsReportIndex: number = req.params.postsReportIndex;
	let postsReportData: any = new PostsReportResource(req.body);
	try {
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
					message: 'updatePostsReport: 500'
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
	const postsIndex: number = req.body.postsIndex;
	const userIndex: number = req.body.userIndex;
	try {
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
					message: 'deletePostsReport: 500'
				});
		}
	}
}

export const postsReportRoutes: PostsReportRoutes = new PostsReportRoutes();