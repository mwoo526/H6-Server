import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { postsReplySubscriber } from '../model/postsReplySubscriber.model';

export class PostsReplySubscriberRoutes {
	public postsReplySubscriberRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsReplySubscriberRouter.put('/postsReplySubscriber/postsReplyIndex/:postsReplyIndex', putPostsReplySubscriber);
	}
}

/**
 * route: postsReplySubscriber 생성 및 업데이트
 * @param req
 * @param res
 */
async function putPostsReplySubscriber(req, res) {
	try {
		const postsReplyIndex = req.params.postsReplyIndex;
		let userData = auth(req);
		const userIndex = userData.tokenIndex;
		delete req.body.userId;

		let result = await postsReplySubscriber.getPostsReplySubscriberByUserIndex(postsReplyIndex, userIndex);
		if (result[0] == null) {
			await postsReplySubscriber.createPostsReplySubscriber({
				postsReplyIndex: postsReplyIndex,
				userIndex: userIndex,
				isGood: req.body.isGood === undefined ? 0 : 1,
				isBad: req.body.isBad === undefined ? 0 : 1
			});
		} else {
			await postsReplySubscriber.updatePostsReplySubscriber(postsReplyIndex, userIndex, req.body);
		}

		result = await postsReplySubscriber.getPostsReplySubscriberByUserIndex(postsReplyIndex, userIndex);
		if (result[0].isGood === 0 && result[0].isBad === 0 && result[0].isScrap === 0) {
			await postsReplySubscriber.deletePostsReplySubscriber(postsReplyIndex, userIndex);
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'putPostsReplySubscriber: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The ID does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'putPostsReplySubscriber : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'putPostsReplySubscriber : 50000'
				});
				break;
		}
	}
}

export const postsReplySubscriberRoutes: PostsReplySubscriberRoutes = new PostsReplySubscriberRoutes();