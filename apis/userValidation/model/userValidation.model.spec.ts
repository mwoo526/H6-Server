import { expect } from 'chai';
import { encriptionPw } from '../../../packages/utils/encryption.util';
import { user } from '../../user/model/user.model';
import { userValidation } from './userValidation.model';

describe('userValidation 모델', () => {
	let resultCreateUser: any;
	let testUserId: string = '이미 존재하는 아이디';
	let testUserId2: string = '사용 가능한 아이디';
	let testUserPw: string = 'marine1164';
	let testUserNickName: string = '이미 존재하는 닉네임';
	let testUserNickName2: string = '사용 가능한 닉네임';
	let testMajor: string = '산업경영공학과';
	let testAdmissionYear: number = 2012;

	before(async () => {
		try {
			resultCreateUser = await user.createUser({
				userId: testUserId,
				userPw: await encriptionPw.getHash(testUserPw),
				userNickName: testUserNickName,
				major: testMajor,
				admissionYear: testAdmissionYear
			});
			/** validation 체크 */
			expect(resultCreateUser).instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			await user.deleteUser(resultCreateUser.userId);
			await userValidation.deleteUsersValidation(resultCreateUser.userId);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createUserValidation', async () => {
		const result = await userValidation.createUserValidation({
			userId: testUserId
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkUserId - 사용 가능한 아이디', async () => {
		const result = await userValidation.checkUserId(testUserId2);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkUserNickName - 사용 가능한 닉네임', async () => {
		const result = await userValidation.checkUserNickName(testUserNickName2);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkUserPw', async () => {
		const result = await userValidation.checkUserPw(testUserId, testUserPw);
		// console.log(result);
		expect(result).instanceof(Array);
	})
});