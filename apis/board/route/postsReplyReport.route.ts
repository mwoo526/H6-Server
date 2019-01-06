import * as express from 'express';
import { PostsReplyReportResource } from "../../../resources/postsReplyReport.resource";
import { postsReplyReport } from "../model/postsReplyReport.model";
import { postsReply } from "../model/postsReply.model";

export class PostsReplyReportRoute {
    public postsReplyReportRouter: express.Route = express.Router();

    constructor() {
        this.router();
    }

    public router() {
        this.postsReplyReportRouter.post('/postsReplyReport', createPostsReplyReport);
        this.postsReplyReportRouter.get('/postsReplyReport', getPostsReplyReport);
        this.postsReplyReportRouter.get('/postsReplyReport/user/:userIndex', getPostsReplyReportByUser);
        this.postsReplyReportRouter.put('/postsReplyReport/:postsReplyReportIndex', updatePostsReplyReport);
        this.postsReplyReportRouter.delete('/postsReplyReport', deletePostsReplyReport);
    }
}

/**
 * route: postsReplyReport 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createPostsReplyReport(req, res): Promise<void> {
    const postsReplyReportData: any = new PostsReplyReportResource(req.body);
    const replyLimitCount = 3;
    try {
        const checkResult: any = await postsReplyReport.checkPostsReplyReport(req.body.postsReplyIndex, req.body.userIndex);
        if(checkResult.length > 0) {
            res.send({
                success: true,
                statusCode: 200,
                result: checkResult,
                message: 'already Reported PostsReply: 200'
            });
            return;
        }

        const result: any = await postsReplyReport.createPostsReplyReport(postsReplyReportData.getPostsReplyReport());
        let countResult: any = await postsReplyReport.getPostsReplyReportCount(result['postsReplyIndex']);
        countResult = JSON.parse(JSON.stringify(countResult));

        const reportCount = countResult[0]['reportCount'];
        if(reportCount === replyLimitCount) {
            await postsReply.updatePostsReplyStatus(result['postsReplyIndex'], 'INACTIVE');
            // 슬랙 알람 처리는 기획 확인 후 추가.
        }

        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createPostsReplyReport: 200'
        });
    } catch (err) {
        switch (err) {
            case 'check PostsReply Report Error':
                res.send({
                    success: false,
                    statusCode: 50001,
                    message: 'check PostsReply Report Error: 50001'
                });
                break;
            case 'get PostsReply Report Count Error':
                res.send({
                    success: false,
                    statusCode: 50002,
                    message: 'get PostsReply Report Count Error: 50002'
                });
                break;
            case 'postsReply Status Update Error':
                res.send({
                    success: false,
                    statusCode: 50003,
                    message: 'postsReply Status Update Error: 50003'
                });
                break;
            default:
                res.send({
                    success: false,
                    statusCode: 50000,
                    message: 'createPostsReplyReport: 50000'
                });
        }
    }
}

/**
 * route: postsReplyReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPostsReplyReport(req, res): Promise<void> {
    try {
        const result: any = await postsReplyReport.getPostsReplyReport();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getPostsReplyReport: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getPostsReplyReport: 50000'
                });
        }
    }
}

/**
 * route: UserIndex에 따른 postsReplyReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPostsReplyReportByUser(req, res): Promise<void> {
    const userIndex: number = req.params.userIndex;
    try {
        const result: any = await postsReplyReport.getPostsReplyReportByUser(userIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getPostsReplyReportByUser: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getPostsReplyReportByUser: 50000'
                });
        }
    }
}

/**
 * route: postsReplyReport 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updatePostsReplyReport(req, res): Promise<void> {
    const postsReplyReportIndex: number = req.params.postsReplyReportIndex;
    const postsReplyReportData: any = new PostsReplyReportResource(req.body);
    try {
        const result: any = await postsReplyReport.updatePostsReplyReport(postsReplyReportIndex, postsReplyReportData.getPostsReplyReport());
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updatePostsReplyReport: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'updatePostsReplyReport: 50000'
                });
        }
    }
}

/**
 * route: postsReplyReport 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deletePostsReplyReport(req, res): Promise<void> {
    const postsReplyIndex: number = req.body.postsReplyIndex;
    const userIndex: number = req.body.userIndex;
    try {
        const result: any = await postsReplyReport.deletePostsReplyReport(postsReplyIndex, userIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deletePostsReplyReport: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'deletePostsReplyReport: 50000'
                });
        }
    }
}

export const postsReplyReportRoutes: PostsReplyReportRoute = new PostsReplyReportRoute();