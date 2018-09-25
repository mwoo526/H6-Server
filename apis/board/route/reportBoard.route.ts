import * as express from 'express';
import { ReportBoardResource } from '../../../resources/reportBoard.resource';
import { reportBoard } from '../model/reportBoard.model';

export class ReportBoardRoutes {
	public reportBoardRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.reportBoardRouter.post('/reportBoard', createReportBoard);
		this.reportBoardRouter.get('/reportBoard', pageReportBoardInfo);
		this.reportBoardRouter.get('/reportBoard/getReportBoardContent/:reportBoardIndex', getReportBoardContent);
		this.reportBoardRouter.put('/reportBoard/:reportBoardIndex', updateReportBoard);
		this.reportBoardRouter.delete('/reportBoard/:reportBoardIndex', deleteReportBoard);
	}
}

/**
 * route: reportBoard 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createReportBoard(req, res): Promise<void> {
	let reportBoardData: any = new ReportBoardResource(req.body);
	try {
		const result: any = await reportBoard.createReportBoard(reportBoardData.getReportBoard());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createReportBoard: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createReportBoard: 500'
				});
		}
	}
}

/**
 * route: reportBoard Info 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function pageReportBoardInfo(req, res): Promise<void> {
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		const resultCount: any = await reportBoard.listReportBoardInfo();
		const result: any = await reportBoard.pageListReportBoardInfo(page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListReportBoardInfo: 200'
		});
	} catch (err) {
		switch (err) {
			case 'No Contents':
				res.send({
					success: false,
					statusCode: 204,
					message: 'pageReportBoardInfo: 204'
				});
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageReportBoardInfo: 500'
				});
		}

	}
}

/**
 * route: reportBoard Content 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function getReportBoardContent(req, res): Promise<void> {
	let reportBoardIndex: number = req.params.reportBoardIndex;
	try {
		const result: any = await reportBoard.getReportBoardContent(reportBoardIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getReportBoardContent: 200'
		});
	} catch (err) {
		switch (err) {
			case 'No Content':
				res.send({
					success: false,
					statusCode: 204,
					message: 'getReportBoardContent: 204'
				});
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getReportBoardContent: 500'
				});
		}
	}
}

/**
 * route: reportBoard 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateReportBoard(req, res): Promise<void> {
	let reportBoardIndex: number = req.params.reportBoardIndex;
	let reportBoardData: any = new ReportBoardResource(req.body);
	try {
		const data = await reportBoard.getReportBoardIndex(reportBoardIndex);

		const result = await reportBoard.updateReportBoard(reportBoardIndex, reportBoardData.getReportBoard());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteReportBoard: 200'
		});

	} catch (err) {
		switch (err) {
			case 'No Content':
				res.send({
					success: false,
					statusCode: 204,
					message: 'updateReportBoard: 204'
				});
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateReportBoard: 500'
				});
		}
	}
}

/**
 * route: reportBoard 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteReportBoard(req, res): Promise<void> {
	let reportBoardIndex: number = req.params.reportBoardIndex;
	try {

		const data = await reportBoard.getReportBoardIndex(reportBoardIndex);

		const result: any = await reportBoard.deleteReportBoard(reportBoardIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteReportBoard: 200'
		});

	} catch (err) {
		switch (err) {
			case 'No Content':
				res.send({
					success: false,
					statusCode: 204,
					message: 'deleteReportBoard: 204'
				});
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteReportBoard: 500'
				});
		}

	}
}

export const reportBoardRoutes: ReportBoardRoutes = new ReportBoardRoutes();