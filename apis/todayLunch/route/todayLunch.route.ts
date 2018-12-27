import * as express from 'express';
import { TodayLunchResource } from "../../../resources/todayLunch.resource";
import { todayLunch } from "../model/todayLunch.model";

export class TodayLunchRoutes {
    public todayLunchRouter: express.Route = express.Router();

    constructor() {
        this.router();
    }

    public router() {
        this.todayLunchRouter.post('/todayLunch', createTodayLunch);
        this.todayLunchRouter.get('/todayLunch', getTodayLunches);
        this.todayLunchRouter.get('/todayLunch/:todayLunchIndex', getTodayLunchByIndex);
        this.todayLunchRouter.put('/todayLunch/:todayLunchIndex', updateTodayLunch);
        this.todayLunchRouter.delete('/todayLunch/:todayLunchIndex', deleteTodayLunchByIndex);
    }
}

/**
 * route: todayLunch 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createTodayLunch(req, res): Promise<void> {
    let todayLunchData: any = new TodayLunchResource(req.body);
    try {
        const result: any = await todayLunch.createTodayLunch(todayLunchData.getTodayLunch());
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createTodayLunch: 200'
        });
    } catch (err) {
        switch(err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'createTodayLunch: 500'
                })
        }
    }
}

/**
 * route: 모든 todayLunch 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTodayLunches(req, res): Promise<void> {
    try {
        const results: any = await todayLunch.getTodayLunches();
        res.send({
            success: true,
            statusCode: 200,
            result: results,
            message: 'getTodayLunches: 200'
        });
    } catch (err) {
        switch(err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getTodayLunches: 500'
                });
        }
    }
}

/**
 * route: todayLunch 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTodayLunchByIndex(req, res): Promise<void> {
    const todayLunchIndex: number = req.params.todayLunchIndex;
    try {
        const result: any = await todayLunch.getTodayLunchByIndex(todayLunchIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getTodayLunchByIndex: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getTodayLunchByIndex: 500'
                });
        }
    }
}

/**
 * route: todayLunch 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateTodayLunch(req, res): Promise<void> {
    const todayLunchIndex: number = req.params.todayLunchIndex;
    const todayLunchData: any = new TodayLunchResource(req.body);
    try {
        const result: any = await todayLunch.updateTodayLunch(todayLunchIndex, todayLunchData);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateTodayLunch: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'updateTodayLunch: 500'
                });
        }
    }
}

/**
 * route: todayLunch 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteTodayLunchByIndex(req, res): Promise<void> {
    const todayLunchIndex: number = req.params.todayLunchIndex;
    try {
        const result: any = await todayLunch.deleteTodayLunch(todayLunchIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteTodayLunch: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'deleteTodayLunch: 500'
                });
        }
    }
}


export const todayLunchRoutes: TodayLunchRoutes = new TodayLunchRoutes();