import * as express from 'express';
import { user } from '../../user/model/user.model';
import { posts } from '../model/posts.model';
import { postsSubscriber } from '../model/postsSubscriber.model';

export class PostsRoutes {
	public postsRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsRouter.post('/posts', createPosts);
		this.postsRouter.get('/posts', pageListPosts);
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
	const resultUser = await user.getUser(req.body.userId);
	try {
		const result: any = await posts.createPosts({
			userIndex: resultUser[0].userIndex,
			postsCategoryIndex: req.body.postsCategoryIndex,
			title: req.body.title,
			content: req.body.content
		});
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createPosts: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The ID does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'createPosts : 40401'
				});
				break;
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
	try {
		const resultCount: any = await posts.listPosts(filter);
		const result: any = await posts.pageListPosts(filter, orderBy, page, count);
		for (const row of result) {
			let subscriberCount = await postsSubscriber.getPostsSubscriberCount(row.postsIndex);
			row.isGoodCount = subscriberCount[0].isGoodCount || 0;
			row.isBadCount = subscriberCount[0].isBadCount || 0;
			row.isScrap = subscriberCount[0].isScrapCount || 0;
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
 * route: posts 조회
 * @param req
 * @param res
 */
async function getPosts(req, res): Promise<void> {
	let postsIndex: number = req.params.postsIndex;
	try {
		const result: any = await posts.getPosts(postsIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'result: 200'
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