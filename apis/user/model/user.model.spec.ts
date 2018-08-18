import { expect } from 'chai';
import { user } from './user.model';

describe('user 모델', () => {
	let userId: string;

	before(async () => {
		try {
			const result = await user.createUser({
				userId: 'testUserId',
				userPw: 'testUserPw',
				userNickName: 'testUserNickName',
				major: 'testMajor',
				admissionYear: '2018'
			});
			// console.log(result);
			userId = result.userId;
			expect(result).to.be.eqls({
				userId: 'testUserId',
				userPw: 'testUserPw',
				userNickName: 'testUserNickName',
				major: 'testMajor',
				admissionYear: '2018'
			});
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		const result = await user.deleteUser(userId);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getUser', async () => {
		const result = await user.getUser(userId);
		// console.log(result);
		delete result[0].userIndex;
		delete result[0].createdAt;
		delete result[0].updatedAt;
		expect(result).to.be.eqls([{
			userId: 'testUserId',
			userPw: 'testUserPw',
			userNickName: 'testUserNickName',
			major: 'testMajor',
			minor: null,
			doubleMajor: null,
			connectedMajor: null,
			avatar: null,
			admissionYear: 2018,
			isValidation: 0
		}]);
	});

	it('updateUser', async () => {
		const result = await user.updateUser(userId, {
			major: 'updateTestMajor'
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	})
});