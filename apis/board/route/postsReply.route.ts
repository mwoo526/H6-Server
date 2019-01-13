import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { postsReply } from '../model/postsReply.model';

export class PostsReplyRoutes {
	public postsReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsReplyRouter.post('/postsReply/postsIndex/:postsIndex', createPostsReply);
		this.postsReplyRouter.get('/postsReply/postsIndex/:postsIndex', pageListPostsReply);
		this.postsReplyRouter.get('/postsReply/parentsPostsReplyIndex/:parentsPostsReplyIndex', pageParentsPostsReply);
		this.postsReplyRouter.get('/postsReply/postsReplyIndex/:postsReplyIndex', getPostsReply);
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
			message: 'createPostsReply: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createPostsReply: 50000'
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
		let resultCount: any = await postsReply.listPostsReply(postsIndex);
		let result: any = await postsReply.pageListPostsReply(postsIndex, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPostsReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: postsReply 대댓글 리스트 조회
 * @param req
 * @param res
 */
async function pageParentsPostsReply(req, res) {
	let parentsPostsReplyIndex: number = req.params.parentsPostsReplyIndex;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	try {
		let resultCount: any = await postsReply.listChildPostsReply(parentsPostsReplyIndex);
		let result: any = await postsReply.pageListChildPostsReply(parentsPostsReplyIndex, page, count);
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageParentsPostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageParentsPostsReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: postsReply 조회
 * @param req
 * @param res
 */
async function getPostsReply(req, res) {
	let postsReplyIndex: number = req.params.postsReplyIndex;
	try {
		const result = await postsReply.getPostsReply(postsReplyIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'getPostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			case 'This postsReply does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getPostsReply: 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPostsReply: 50000'
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
			message: 'updatePostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updatePostsReply: 50000'
				});
				break;
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
			message: 'deletePostsReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deletePostsReply: 50000'
				});
				break;
		}
	}
}

export const postsReplyRoutes: PostsReplyRoutes = new PostsReplyRoutes();