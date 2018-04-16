import { expect } from 'chai';
import { user } from '../../user/model/user.model';
import { userValidation } from './userValidation.model';

describe('userValidation 모델', () => {
	let resultCreateUser: any;
	let testUserId: string = '이미 존재하는 아이디';
	let testUserId2: string = '사용 가능한 아이디';
	let testUserPw: string = 'marine1164';
	let testUserNickName: string = 'JadeAhn';
	let testEmail: string = '이미 존재하는 이메일';
	let testEmail2: string = '사용 가능한 이메일';
	let testMajor: string = '산업경영공학과';
	let testAdmissionYear: number  = 2012;

	before(async () => {
		try {
			resultCreateUser = await user.createUser({
				userId: testUserId,
				userPw: testUserPw,
				userNickName: testUserNickName,
				email: testEmail,
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
		} catch (err) {
			console.error('err', err);
		}
	});

	it('checkUserId - 이미 존재하는 아이디', async () => {
		const result = await userValidation.checkUserId(resultCreateUser.userId);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkUserId - 사용 가능한 아이디', async () => {
		const result = await userValidation.checkUserId(testUserId2);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkEmail - 이미 존재하는 이메일', async () => {
		const result = await userValidation.checkEmail(resultCreateUser.email);
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('checkEmail - 사용 가능한 이메일', async () => {
		const result = await userValidation.checkEmail(testEmail2);
		// console.log(result);
		expect(result).instanceof(Object);
	});
});