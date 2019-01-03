import * as express from 'express';
import { user } from '../../user/model/user.model';
import { postsSubscriber } from '../model/postsSubscriber.model';

export class PostsSubscriberRoutes {
	public postsSubscriberRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsSubscriberRouter.put('/postsSubscriber/postsIndex/:postsIndex', putPostsSubscriber);
	}
}

/**
 * route: postsSubscriber 생성 및 업데이트
 * @param req
 * @param res
 */
async function putPostsSubscriber(req, res) {
	const postsIndex = req.params.postsIndex;
	const resultUser = await user.getUser(req.body.userId);
	const userIndex = resultUser[0].userIndex;
	delete req.body.userId;
	try {
		let result = await postsSubscriber.getPostsSubscriberCountByUserIndex(postsIndex, userIndex);
		if (result[0] == null) {
			await postsSubscriber.createPostsSubscriber({
				postsIndex: postsIndex,
				userIndex: userIndex,
				isGood: req.body.isGood === undefined ? 0 : 1,
				isBad: req.body.isBad === undefined ? 0 : 1,
				isScrap: req.body.isScrap === undefined ? 0 : 1
			});
		} else {
			await postsSubscriber.updatePostsSubscriber(postsIndex, userIndex, req.body);
		}

		result = await postsSubscriber.getPostsSubscriberCountByUserIndex(postsIndex, userIndex);
		if (result[0].isGood === 0 && result[0].isBad === 0 && result[0].isScrap === 0) {
			await postsSubscriber.deletePostsSubscriber(postsIndex, userIndex);
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result[0],
			message: 'putPostsSubscriber: 200'
		});
	} catch (err) {
		switch (err) {
			case 'The ID does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'putPostsSubscriber : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'putPostsSubscriber : 50000'
				});
				break;
		}
	}
}

export const postsSubscriberRoutes: PostsSubscriberRoutes = new PostsSubscriberRoutes();