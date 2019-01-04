import * as express from 'express';
import { TodayLunchMenuResource } from '../../../resources/todayLunchMenu.resource';
import { todayLunchMenu } from '../model/todayLunchMenu.model';

export class TodayLunchMenuRoute {
	public todayLunchMenuRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.todayLunchMenuRouter.post('/todayLunchMenu', createTodayLunchMenu);
		this.todayLunchMenuRouter.get('/todayLunchMenu', getTodayLunchMenus);
		this.todayLunchMenuRouter.get('/todayLunchMenu/:todayLunchMenuIndex', getTodayLunchMenuByIndex);
		this.todayLunchMenuRouter.get('/todayLunchMenu/todayLunch/:todayLunchIndex', getTodayLunchMenuByTodayLunchIndex);
		this.todayLunchMenuRouter.put('/todayLunchMenu/:todayLunchMenuIndex', updateTodayLunchMenu);
		this.todayLunchMenuRouter.delete('/todayLunchMenu/:todayLunchMenuIndex', deleteTodayLunchMenu);
		this.todayLunchMenuRouter.delete('/todayLunchMenu/todayLunch/:todayLunchIndex', deleteTodayLunchMenuByTodayLunchIndex);
	}
}

/**
 * route: todayLunchMenu 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createTodayLunchMenu(req, res): Promise<void> {
	let todayLunchMenuData: any = new TodayLunchMenuResource(req.body);
	try {
		const result: any = await todayLunchMenu.createTodayLunchMenu(todayLunchMenuData.getTodayLunchMenu());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createTodayLunchMenu: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createTodayLunchMenu: 50000'
				})
		}
	}
}

/**
 * route: 모든 todayLunchMenu 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTodayLunchMenus(req, res): Promise<void> {
	try {
		const results: any = await todayLunchMenu.getTodayLunchMenus();
		res.send({
			success: true,
			statusCode: 200,
			result: results,
			message: 'getTodayLunchMenus: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getTodayLunchMenus: 50000'
				});
		}
	}
}

/**
 * route: todayLunchMenu 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTodayLunchMenuByIndex(req, res): Promise<void> {
	const todayLunchMenuIndex: number = req.params.todayLunchMenuIndex;
	try {
		const result: any = await todayLunchMenu.getTodayLunchMenuByIndex(todayLunchMenuIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getTodayLunchMenuByIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getTodayLunchMenuByIndex: 50000'
				});
		}
	}
}

/**
 * route: todayLunchIndex 에 따른 todayLunchMenu 조회 (음식점 별 메뉴 조회)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTodayLunchMenuByTodayLunchIndex(req, res): Promise<void> {
	const todayLunchIndex: number = req.params.todayLunchIndex;
	try {
		const results: any = await todayLunchMenu.getTodayLunchMenuByTodayLunchIndex(todayLunchIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: results,
			message: 'getTodayLunchByTodayLunchIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getTodayLunchByTodayLunchIndex: 50000'
				});
		}
	}
}

/**
 * route: todayLunchMenu 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateTodayLunchMenu(req, res): Promise<void> {
	const todayLunchMenuIndex: number = req.params.todayLunchMenuIndex;
	const todayLunchMenuData: any = new TodayLunchMenuResource(req.body);
	try {
		const result: any = await todayLunchMenu.updateTodayLunchMenu(todayLunchMenuIndex, todayLunchMenuData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateTodayLunchMenu: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateTodayLunchMenu: 50000'
				});
		}
	}
}

/**
 * route: todayLunchMenu 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteTodayLunchMenu(req, res): Promise<void> {
	const todayLunchMenuIndex: number = req.params.todayLunchMenuIndex;
	try {
		const result: any = await todayLunchMenu.deleteTodayLunchMenu(todayLunchMenuIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteTodayLunchMenu: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteTodayLunchMenu: 50000'
				});
		}
	}
}

/**
 * route: todayLunchIndex 에 해당하는 모든 todayLunchMenu 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteTodayLunchMenuByTodayLunchIndex(req, res): Promise<void> {
	const todayLunchIndex: number = req.params.todayLunchIndex;
	try {
		const result: any = await todayLunchMenu.deleteTodayLunchMenuByTodayLunchIndex(todayLunchIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteTodayLunchMenuByTodayLunchIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteTodayLunchMenuByTodayLunchIndex: 50000'
				});
		}
	}
}

export const todayLunchMenuRoutes: TodayLunchMenuRoute = new TodayLunchMenuRoute();