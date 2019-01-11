import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { postsReply } from '../model/postsReply.model';
import { postsReplySubscriber } from '../model/postsReplySubscriber.model';

export class PostsReplyRoutes {
	public postsReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsReplyRouter.post('/postsReply/postsIndex/:postsIndex', createPostsReply);
		this.postsReplyRouter.get('/postsReply/postsIndex/:postsIndex', pageListPostsReply);
		this.postsReplyRouter.put('/postsReply/postsReplyIndex/:postsReplyIndex', updatePostsReply);
		this.postsReplyRouter.delete('/postsReply/postsReplyIndex/:postsReplyIndex', deletePostsReply);
	}
}

/**
 * route : postsReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createPostsReply(req, res) {
	const postsIndex = req.params.postsIndex;
	try {
		let userData = auth(req);
		const result: any = await postsReply.createPostsReply({
			postsIndex: postsIndex,
			parentsPostsReplyIndex: req.body.parentsPostsReplyIndex,
			userIndex: userData.tokenIndex,
			content: req.body.content,
			status: 'ACTIVE'
		});
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createPostsReply 200'
		})
	} catch (err) {
		console.log(err);
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createPostsReply 500'
				});
				break;
		}
	}

}

/**
 * route : postsReply 댓글 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListPostsReply(req, res) {
	let postsIndex: number = req.params.postsIndex;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		let userData = auth(req);
		let resultCount: any = await postsReply.listPostsReply(postsIndex);
		let result: any = await postsReply.pageListPostsReply(postsIndex, page, count);
		for (const row of result) {
			row.goodCount = row.goodCount === null ? 0 : row.goodCount;
			row.badCount = row.badCount === null ? 0 : row.badCount;

			let scrapData: any = await postsReplySubscriber.getPostsReplySubscriberByUserIndex(row.postsReplyIndex, userData.tokenIndex);
			if (scrapData.length !== 0) {
				row.isGood = scrapData[0].isGood === 1 ? true : false;
				row.isBad = scrapData[0].isBad === 1 ? true : false;
			} else {
				row.isGood = false;
				row.isBad = false;
			}

			let childPostsReply: any = await postsReply.listChildPostReply(row.postsIndex, row.postsReplyIndex);
			for (const row of childPostsReply) {
				row.goodCount = row.goodCount === null ? 0 : row.goodCount;
				row.badCount = row.badCount === null ? 0 : row.badCount;
				
				let scrapReplyData: any = await postsReplySubscriber.getPostsReplySubscriberByUserIndex(row.postsReplyIndex, userData.tokenIndex);
				if (scrapReplyData.length !== 0) {
					row.isGood = scrapReplyData[0].isGood === 1 ? true : false;
					row.isBad = scrapReplyData[0].isBad === 1 ? true : false;
				} else {
					row.isGood = false;
					row.isBad = false;
				}
			}
			row.childPostsReply = childPostsReply
		}
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPostsReply 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPostsReply 500'
				});
				break;
		}
	}
}

/**
 * route : postsReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updatePostsReply(req, res) {
	let postsReplyIndex: number = req.params.postsReplyIndex;
	let postsReplyData: any = req.body;
	try {
		const result: any = await postsReply.updatePostsReply(postsReplyIndex, postsReplyData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updatePostsReply 200'
		})
	} catch (err) {
		console.log(err);
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updatePostsReply 500'
				})
		}
	}
}

/**
 * route : postsReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deletePostsReply(req, res) {
	let postsReplyIndex: number = req.params.postsReplyIndex;
	try {
		const result: any = await postsReply.deletePostsReply(postsReplyIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deletePostsReply 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deletePostsReply 500'
				})
		}
	}
}

export const postsReplyRoutes: PostsReplyRoutes = new PostsReplyRoutes();