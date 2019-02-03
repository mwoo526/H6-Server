import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { posts } from '../model/posts.model';
import { postsReport } from '../model/postsReport.model';
import { postsSubscriber } from '../model/postsSubscriber.model';

export class PostsRoutes {
	public postsRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsRouter.post('/posts', createPosts);
		this.postsRouter.get('/posts', pageListPosts);
		this.postsRouter.get('/posts/scrap', pageListPostsByIsScrap);
		this.postsRouter.get('/posts/publisher', pageListPostsByUserIndex);
		this.postsRouter.get('/posts/postsIndex/:postsIndex', getPosts);
		this.postsRouter.put('/posts/postsIndex/:postsIndex', updatePosts);
		this.postsRouter.delete('/posts/postsIndex/:postsIndex', deletePosts);
	}
}

/**
 * route: posts 생성
 * @param req
 * @param res
 */
async function createPosts(req, res) {
	try {
		let userData = auth(req);
		const result: any = await posts.createPosts({
			userIndex: userData.tokenIndex,
			postsCategoryIndex: req.body.postsCategoryIndex,
			title: req.body.title,
			content: req.body.content,
			status: 'ACTIVE'
		});
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createPosts: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createPosts : 50000'
				});
				break;
		}
	}
}

/**
 * route: posts page 리스트 조회
 * @param req
 * @param res
 */
async function pageListPosts(req, res) {
	let filter: string = req.query.filter;
	let orderBy: string = req.query.orderBy;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	let userData = auth(req);
	try {
		const resultCount: any = await posts.listPosts(filter);
		const result: any = await posts.pageListPosts(filter, orderBy, page, count);
		for (const row of result) {
			let scrapData: any = await postsSubscriber.getPostsSubscriberByUserIndex(row.postsIndex, userData.tokenIndex);
			if (scrapData.length > 0 && scrapData[0].isScrap === 1) {
				row.isScrap = true;
			} else {
				row.isScrap = false;
			}
		}
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPosts: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPosts: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts page isScrap 리스트 조회
 * @param req
 * @param res
 */
async function pageListPostsByIsScrap(req, res) {
	let filter: string = req.query.filter;
	let orderBy: string = req.query.orderBy;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	let userData = auth(req);
	try {
		const resultCount: any = await posts.listPostsByIsScrap(userData.tokenIndex, filter);
		const result: any = await posts.pageListPostsByIsScrap(userData.tokenIndex, filter, orderBy, page, count);
		for (const row of result) {
			row.isScrap = row.isScrap === 1 ? true : false;
			delete row.userIndex;
		}
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPostsByIsScrap: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPostsByIsScrap: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts userIndex 리스트 조회
 * @param req
 * @param res
 */
async function pageListPostsByUserIndex(req, res) {
	let filter: string = req.query.filter;
	let orderBy: string = req.query.orderBy;
	let page: number = parseInt(req.query.page);
	let count: number = parseInt(req.query.count);
	let userData = auth(req);
	try {
		const resultCount: any = await posts.listPostsByUserIndex(userData.tokenIndex, filter);
		const result: any = await posts.pageListPostsByUserIndex(userData.tokenIndex, filter, orderBy, page, count);
		for (const row of result) {
			let scrapData: any = await postsSubscriber.getPostsSubscriberByUserIndex(row.postsIndex, userData.tokenIndex);
			if (scrapData.length > 0 && scrapData[0].isScrap === 1) {
				row.isScrap = true;
			} else {
				row.isScrap = false;
			}
		}
		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result: result,
			message: 'pageListPostsByUserIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListPostsByUserIndex: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts 조회
 * @param req
 * @param res
 */
async function getPosts(req, res): Promise<void> {
	let postsIndex: number = req.params.postsIndex;
	try {
		const userData = auth(req);
		const [result, reportCheck, scrapData, unused] = await Promise.all([
			posts.getPosts(postsIndex),
			postsReport.checkPostsReport(postsIndex, userData.tokenIndex),
			postsSubscriber.getPostsSubscriberByUserIndex(postsIndex, userData.tokenIndex),
			posts.updatePostsByCount(postsIndex)
		]);

		if (scrapData[0]) {
			result[0].isGood = !!scrapData[0].isGood;
			result[0].isBad = !!scrapData[0].isBad;
			result[0].isScrap = !!scrapData[0].isScrap;
		} else {
			result[0].isGood = false;
			result[0].isBad = false;
			result[0].isScrap = false;
		}
		result[0].reported = !!reportCheck[0];

		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'getPosts: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getPosts: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts 업데이트
 * @param req
 * @param res
 */
async function updatePosts(req, res): Promise<void> {
	let postsIndex: number = req.params.postsIndex;
	let postsData: any = req.body;
	try {
		const result = await posts.updatePosts(postsIndex, postsData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updatePosts: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updatePosts: 50000'
				});
				break;
		}
	}
}

/**
 * route: posts 삭제
 * @param req
 * @param res
 */
async function deletePosts(req, res): Promise<void> {
	let postsIndex: number = req.params.postsIndex;
	try {
		const result = await posts.deletePosts(postsIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deletePosts: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deletePosts: 50000'
				});
				break;
		}
	}
}

export const postsRoutes: PostsRoutes = new PostsRoutes();