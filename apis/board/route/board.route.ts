import * as express from 'express';
import {BoardResource} from '../../../resources/board.resource';
import {board} from '../model/board.model';
import {countLog} from "../model/log/countLog.model";
import {recommendLog} from "../model/log/recommendLog.model";

export class BoardRoutes {
    public boardRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    public router() {
        this.boardRouter.post('/board', createBoard);
        this.boardRouter.get('/board', pageListBoardInfo);
        this.boardRouter.get('/board/count', pageListBoardInfoByCount);
        this.boardRouter.get('/board/recommend', pageListBoardInfoByRecommend);
        this.boardRouter.get('/board/searchTerm/:searchTerm', pageListBoardInfoBySearchTerm);
        this.boardRouter.get('/board/category/:category', pageListBoardInfoByCategory);
        this.boardRouter.get('/board/post/:post', pageListBoardInfoByPost)
        this.boardRouter.get('/board/userIndex/:userIndex', pageListBoardInfoByUserIndex)
        this.boardRouter.get('/board/getBoardPost/:boardIndex/:userIndex', getBoardPost);
        this.boardRouter.get('/board/getBoardRecommend/:boardIndex/:userIndex', getBoardRecommend);
        this.boardRouter.put('/board/:boardIndex', updateBoard);
        this.boardRouter.delete('/board/:boardIndex', deleteBoard);
    }

}

/**
 * board 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createBoard(req, res) {
    let boardData: any = new BoardResource(req.body);
    try {
        const result: any = await board.createBoard(boardData.getBoard());
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createBoard : 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'createBoard : 500'
                });
                break;
        }
    }
}

/**
 * route : boardInfo 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardInfo(req, res) {
    let page: number = parseInt(req.query.page);
    let count: number = parseInt(req.query.count);
    try {
        const resultCount: any = await board.listBoardInfo();
        const result: any = await board.pageListBoardInfo(page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoardInfo: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoardInfo: 500'
                });
                break;
        }
    }
}

/**
 * route : boardInfo count page 리스트 조회 (조회수)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardInfoByCount(req, res) {
    let page: number = req.query.page;
    let count: number = req.query.count;
    try {
        const resultCount: any = await board.listBoardInfoByCount();
        const result: any = await board.pageListBoardInfoByCount(page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoardInfoByCount 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoardInfoByCount 500'
                })
        }
    }
}

/**
 * route : boardInfo recommend page 리스트 조회 (추천수)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardInfoByRecommend(req,res) {
    let page: number = req.query.page;
    let count: number = req.query.count;
    try {
        const resultCount: any = await board.listBoardInfoByRecommend();
        const result: any = await board.pageListBoardInfoByRecommend(page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoardInfoByRecommend 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoardInfoByRecommend 500'
                })
        }
    }
}
/**
 * route : boardInfo searchTerm 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardInfoBySearchTerm(req, res) {
    let searchTerm: string = req.params.searchTerm;
    let page: number = parseInt(req.query.page);
    let count: number = parseInt(req.query.count);
    try {
        const resultCount: any = await board.listBoardInfoBySearchTerm(searchTerm);
        const result: any = await board.pageListBoardInfoBySearchTerm(searchTerm, page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoardInfoBySearchTerm 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoardInfoBySearchTerm 500'
                });
                break;
        }
    }
}

/**
 * route : boardInfo category 별 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardInfoByCategory(req, res) {
    let category: string = req.params.category;
    let page: number = req.query.page;
    let count: number = req.query.count;
    try {
        const resultCount: any = await board.listBoardInfoByCategory(category);
        const result: any = await board.pageListBoardInfoByCategory(category, page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoardInfoByCategory 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoardInfoByCategory 500'
                })
                break;
        }
    }
}

/**
 * route : boardInfo post 별 리스트 조회 (제목+글)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardInfoByPost(req, res) {
    let post: string = req.params.post;
    let page: number = req.query.page;
    let count: number = req.query.count;
    try {
        const resultCount: any = await board.listBoardInfoByPost(post);
        const result: any = await board.pageListBoardInfoByPost(post, page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoardInfoByPost 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoardInfoByPost 500'
                })
                break;
        }
    }
}

/**
 * route : boardInfo user 별 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardInfoByUserIndex(req, res) {
    let userIndex: number = req.params.userIndex;
    let page: number = req.query.page;
    let count: number = req.query.count;
    try {
        const resultCount: any = await board.listBoardInfoByUserIndex(userIndex);
        const result: any = await board.pageListBoardInfoByUserIndex(userIndex, page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoardInfoByUserIndex 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoardInfoByUserIndex 500'
                })
                break;
        }
    }
}

/**
 * route : post 조회 (게시글)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getBoardPost(req, res) {
    let boardIndex: number = req.params.boardIndex;
    let userIndex: number = req.params.userIndex;
    try {
        await countLog.checkCountLog(boardIndex, userIndex);
        let result: any = await board.getBoardPost(boardIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getBoardPost 200'
        })
    } catch (err) {
        switch (err) {
            case 'This UserLog is not exist' :
                await countLog.createCountLog(boardIndex, userIndex);
                await board.updateBoardByCount(boardIndex);
                let result: any = await board.getBoardPost(boardIndex);
                res.send({
                    success: true,
                    statusCode: 200,
                    result: result,
                    message: 'getBoardPost 200'
                })
                break;
            case 'This Post is not exist' :
                res.send({
                    success: false,
                    statusCode: 404,
                    message: 'getBoardPost 404'
                })
                break;
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getBoardPost 500'
                })
        }
    }
}

/**
 * route : 추천수 조회 (게시글)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getBoardRecommend(req, res) {
    let boardIndex: number = req.params.boardIndex;
    let userIndex: number = req.params.userIndex;
    try {
        let isRecommend: any = await recommendLog.checkRecommendLog(boardIndex, userIndex);
        if (isRecommend.isRecommend) {
            await recommendLog.updateRecommendLog(boardIndex, userIndex);
            await board.updateBoardByRecommendDown(boardIndex);
            let result: any = await board.getBoardRecommend(boardIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getBoardRecommend 200'
            })
        } else {
            await recommendLog.updateRecommendLog(boardIndex, userIndex);
            await board.updateBoardByRecommendUp(boardIndex);
            let result: any = await board.getBoardRecommend(boardIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getBoardRecommend 200'
            })
        }
    } catch (err) {
        switch (err) {
            case 'This RecommendLog is not exist':
                await recommendLog.createRecommendLog(boardIndex, userIndex);
                await board.updateBoardByRecommendUp(boardIndex);
                let result: any = await board.getBoardRecommend(boardIndex);
                res.send({
                    success: true,
                    statusCode: 200,
                    result: result,
                    message: 'getBoardRecommend 200'
                })
                break;
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getBoardRecommend 500'
                })
        }
    }
}

/**
 * route : board 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateBoard(req, res) {
    let boardIndex: number = req.params.boardIndex;
    let boardData: any = await new BoardResource(req.body);
    try {
        const result: any = await board.updateBoard(boardIndex, boardData);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateBoard 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'updateBoard 500'
                })
                break;
        }
    }
}

/**
 * route : board 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteBoard(req, res) {
    let boardIndex: number = req.params.boardIndex;
    try {
        const result: any = await board.deleteBoard(boardIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteBoard 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'deleteBoard 500'
                })
                break;
        }
    }
}

export const boardRoutes: BoardRoutes = new BoardRoutes();