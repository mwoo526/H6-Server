import * as express from 'express';
import { ReportLogResource } from '../../../resources/reportLog.resource';
import { reportLog } from '../model/reportLog.model';

export class ReportLogRoutes {
	public reportLogRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.reportLogRouter.post('/reportLog', createReportLog);
		this.reportLogRouter.get('/reportLog', pageReportLogInfo);
		this.reportLogRouter.get('/reportLog/getReportLogContent/:reportLogIndex', getReportLogContent);
		this.reportLogRouter.put('/reportLog/:reportLogIndex', updateReportLog);
		this.reportLogRouter.delete('/reportLog/:reportLogIndex', deleteReportLog);
	}
}

/**
 * route: reportLog 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createReportLog(req, res): Promise<void> {
	let reportLogData: any = new ReportLogResource(req.body);
	try {
		const result: any = await reportLog.createReportLog(reportLogData.getReportLog());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createReportLog: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createReportLog: 500'
				});
		}
	}
}

/**
 * route: reportLog Info 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function pageReportLogInfo(req, res): Promise<void> {
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount: any = await reportLog.listReportLogInfo();
		const result: any = await reportLog.pageListReportLogInfo(page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListReportLogInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageReportLogInfo: 500'
				});
		}

	}
}

/**
 * route: reportLog Content 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function getReportLogContent(req, res): Promise<void> {
	let reportLogIndex: number = req.params.reportLogIndex;
	try {
		const result: any = await reportLog.getReportLogContent(reportLogIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getReportLogContent: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getReportLogContent: 500'
				});
		}
	}
}

/**
 * route: reportLog 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateReportLog(req, res): Promise<void> {
	let reportLogIndex: number = req.params.reportLogIndex;
	let reportLogData: any = new ReportLogResource(req.body);
	try {
		const data = await reportLog.getReportLogIndex(reportLogIndex);

		const result = await reportLog.updateReportLog(reportLogIndex, reportLogData.getReportLog());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteReportLog: 200'
		});

	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateReportLog: 500'
				});
		}
	}
}

/**
 * route: reportLog 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteReportLog(req, res): Promise<void> {
	let reportLogIndex: number = req.params.reportLogIndex;
	try {

		const data = await reportLog.getReportLogIndex(reportLogIndex);

		const result: any = await reportLog.deleteReportLog(reportLogIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteReportLog: 200'
		});

	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteReportLog: 500'
				});
		}

	}
}

export const reportLogRoutes: ReportLogRoutes = new ReportLogRoutes();