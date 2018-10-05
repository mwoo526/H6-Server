import * as express from 'express';
import { BoardResource } from '../../../resources/board.resource';
import { board } from '../model/board.model';
import { goodLog } from "../model/log/goodLog.model";
import { badLog } from "../model/log/badLog.model";
import { scrapLog } from "../model/log/scrapLog.model";

export class BoardRoutes {
    public boardRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    public router() {
        this.boardRouter.post('/board', createBoard);
        this.boardRouter.get('/board/:sort', pageListBoard);
        this.boardRouter.get('/board/category/:category/:sort', pageBoardByCategory);
        this.boardRouter.get('/board/searchTerm/:searchTerm', pageListBoardBySearchTerm);
        this.boardRouter.get('/board/userIndex/:userIndex', pageListBoardInfoByUserIndex);
        this.boardRouter.get('/board/post/:boardIndex', getBoardPost);
        this.boardRouter.get('/board/good/:boardIndex/:userIndex', getBoardGood);
        this.boardRouter.get('/board/bad/:boardIndex/:userIndex', getBoardBad);
        this.boardRouter.get('/board/scrap/:boardIndex/:userIndex', getBoardScrap);
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
 * route : board 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoard(req, res) {
    let sort: string = req.params.sort;
    let page: number = parseInt(req.query.page);
    let count: number = parseInt(req.query.count);
    try {
        const resultCount: any = await board.listBoard(sort);
        const result: any = await board.pageListBoard(sort,page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoard: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoard: 500'
                });
                break;
        }
    }
}

/**
 * route : board category 별 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageBoardByCategory(req, res) {
    let category: string = req.params.category;
    let sort: string = req.params.sort;
    let page: number = parseInt(req.query.page);
    let count: number = parseInt(req.query.count);
    try{
        const resultCount: any = await board.listBoardByCategory(category,sort);
        const result: any = await board.pageListBoardByCategory(category,sort,page,count);
        res.send({
            success: true,
            status: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageBoardByCategory 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    err: err,
                    message: 'pageBoardByCategory: 500'
                });
                break;
        }
    }
}

/**
 * route : boardI searchTerm 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListBoardBySearchTerm(req, res) {
    let searchTerm: string = req.params.searchTerm;
    let page: number = parseInt(req.query.page);
    let count: number = parseInt(req.query.count);
    try {
        const resultCount: any = await board.listBoardBySearchTerm(searchTerm);
        const result: any = await board.pageListBoardBySearchTerm(searchTerm, page, count);
        res.send({
            success: true,
            statusCode: 200,
            resultCount: resultCount.length,
            result: result,
            message: 'pageListBoardBySearchTerm 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'pageListBoardBySearchTerm 500'
                });
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
 * route : 게시물 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getBoardPost(req,res) {
    let boardIndex: number = req.params.boardIndex;
    try {
        await board.updateBoardByCount(boardIndex);
        const result: any = await board.getBoardPost(boardIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getBoardPost 200'
        })
    } catch (err) {
        switch (err) {
            case 'This Post is not exist':
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
 * route : 추천
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getBoardGood(req,res) {
    let boardIndex: number = req.params.boardIndex;
    let userIndex: number = req.params.userIndex;

    try {
        await goodLog.checkGoodLog(boardIndex,userIndex);
        await goodLog.createGoodLog({
            boardIndex: boardIndex,
            userIndex: userIndex
        })
        await board.updateBoardByGood(boardIndex);
        const result: any = await board.getBoardGood(boardIndex);{
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getBoardGood 200'
            })
        }
    } catch (err) {
        switch (err) {
            case 'This is goodLog is already exist':
                res.send({
                    success: false,
                    statusCode: 409,
                    message: 'getBoardGood 409'
                })
                break;
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getBoardGood 500'
                })
        }
    }
}

/**
 * route : 비추천
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getBoardBad(req,res) {
    let boardIndex: number = req.params.boardIndex;
    let userIndex: number = req.params.userIndex;

    try {
        await badLog.checkBadLog(boardIndex,userIndex);
        await badLog.createBadLog({
            boardIndex: boardIndex,
            userIndex: userIndex
        })
        await board.updateBoardByBad(boardIndex);
        const result: any = await board.getBoardBad(boardIndex);{
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getBoardBad 200'
            })
        }
    } catch (err) {
        switch (err) {
            case 'This is badLog is not exist':
                res.send({
                    success: false,
                    statusCode: 409,
                    message: 'getBoardBad 409'
                })
                break;
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getBoardBad 500'
                })
        }
    }
}


async function getBoardScrap(req, res) {
    let boardIndex: number = req.params.boardIndex;
    let userIndex: number = req.params.userIndex;
    try {
        let isRecommend: any = await scrapLog.checkScrapLog(boardIndex, userIndex);
        if (isRecommend.isRecommend) {
            await scrapLog.updateScrapLog(boardIndex, userIndex);
            await board.updateBoardByScrap(boardIndex);
            let result: any = await board.getBoardScrap(boardIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getBoardScrap 200'
            })
        } else {
            await scrapLog.updateScrapLog(boardIndex, userIndex);
            await board.updateBoardByScrap(boardIndex);
            let result: any = await board.getBoardScrap(boardIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getBoardScrap 200'
            })
        }
    } catch (err) {
        switch (err) {
            case 'This ScrapLog is not exist':
                await scrapLog.createScrapLog(boardIndex, userIndex);
                await board.updateBoardByScrap(boardIndex);
                let result: any = await board.getBoardScrap(boardIndex);
                res.send({
                    success: true,
                    statusCode: 200,
                    result: result,
                    message: 'getBoardScrap 200'
                })
                break;
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getBoardScrap 500'
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