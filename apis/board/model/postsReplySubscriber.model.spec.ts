import { expect } from 'chai';
import { posts } from './posts.model';
import { postsReply } from './postsReply.model';
import { postsReplySubscriber } from './postsReplySubscriber.model';

describe('postsReplySubscriber', () => {
	let resultPosts;
	let resultPostsReply;

	before(async () => {
		try {
			await posts.createPosts({
				userIndex: 1,
				postsCategoryIndex: 1,
				title: '테스트 게시글 제목',
				content: '테스트 게시글 내용'
			});

			let result: any = await posts.getPostsByTitle('테스트 게시글 제목');
			resultPosts = result;

			await postsReply.createPostsReply({
				postsIndex: result[0].postsIndex,
				userIndex: 1,
				content: '테스트 댓글 내용'
			});

			result = await postsReply.listPostsReply(resultPosts[0].postsIndex);
			resultPostsReply = result;

		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result: any = await posts.deletePosts(resultPosts[0].postsIndex);
			// console.log(result);
			expect(result).to.instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createPostsReplySubscriber', async () => {
		const result: any = await postsReplySubscriber.createPostsReplySubscriber({
			postsReplyIndex: resultPostsReply[0].postsReplyIndex,
			userIndex: 1,
			isGood: true,
			isBad: false
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('createPostsReplySubscriber2', async () => {
		const result: any = await postsReplySubscriber.createPostsReplySubscriber({
			postsReplyIndex: resultPostsReply[0].postsReplyIndex,
			userIndex: 2,
			isGood: true,
			isBad: false
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getPostsReplySubscriber', async () => {
		const result: any = await postsReplySubscriber.getPostsReplySubscriber(resultPostsReply[0].postsReplyIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getPostsReplySubscriberCountByUserIndex', async () => {
		const result: any = await postsReplySubscriber.getPostsReplySubscriberCountByUserIndex(resultPostsReply[0].postsReplyIndex, 1);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updatePostsReplySubscriber', async () => {
		const result: any = await postsReplySubscriber.updatePostsReplySubscriber(resultPostsReply[0].postsReplyIndex, 1, {
			isBad: true
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deletePostsReplySubscriber', async () => {
		const result: any = await postsReplySubscriber.deletePostsReplySubscriber(resultPostsReply[0].postsReplyIndex, 1);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});