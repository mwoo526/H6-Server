import { expect } from 'chai';
import { lectureReply } from './lectureReply.model';

describe('lectureReply 모델', () => {
	let testLectureReplyIndex: any;
	let testLectureInfoIndex: any;
	let testUserIndex: any;
	let testUserId: any;
	let testUserNickName: any;

	before(async () => {
		try {
			const result = await lectureReply.createLectureReply({
				lectureInfoIndex: 1,
				userIndex: 9,
				semester: '17년도 2학기',
				homework: '보통',
				homeworkType: 1,
				testCount: 2,
				receivedGrade: 2,
				score: 4
			});
			/** validation 체크 */
			expect(result).to.instanceof(Object);
			/** lectureReply lectureInfoIndex 조회 */
			const resultGetLectureReplyByLectureInfoIndex = await lectureReply.getLectureReplyByLectureInfoIndex(1);
			/** validation 체크 */
			expect(resultGetLectureReplyByLectureInfoIndex).to.instanceof(Array);
			/** lectureReply 칼럼 값 */
			const lectureReplyData: any = resultGetLectureReplyByLectureInfoIndex;
			testLectureReplyIndex = lectureReplyData[0].lectureReplyIndex;
			testLectureInfoIndex = lectureReplyData[0].lectureInfoIndex;
			testUserIndex = lectureReplyData[0].userIndex;
			testUserId = lectureReplyData[0].userId;
			testUserNickName = lectureReplyData[0].userNickName;
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
				const result = await lectureReply.deleteLectureReply(testLectureReplyIndex);
				expect(result).to.instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	/** 테스트 용도로 사용 */
	// it('createLectureReply', async () => {
	// 	const result = await lectureReply.createLectureReply({
	// 		lectureInfoIndex: 1,
	// 		userIndex: 9,
	// 		semester: '17년도 2학기',
	// 		homework: '보통',
	// 		homeworkType: 1,
	// 		testCount: 2,
	// 		receivedGrade: 2,
	// 		score: 4
	// 	});
	// 	console.log(result);
	// 	expect(result).to.instanceof(Object);
	// });

	it('listLectureReply', async () => {
		const result = await lectureReply.listLectureReply();
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListLectureReply', async () => {
		const result = await lectureReply.pageListLectureReply(2, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyByLectureReplyIndex', async () => {
		const result = await lectureReply.getLectureReplyByLectureReplyIndex(testLectureReplyIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyByLectureReplyIndex', async () => {
		const result = await lectureReply.pageGetLectureReplyByLectureReplyIndex(testLectureReplyIndex,1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyByLectureInfoIndex', async () => {
		const result = await lectureReply.getLectureReplyByLectureInfoIndex(testLectureInfoIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyByLectureInfoIndex', async () => {
		const result = await lectureReply.pageGetLectureReplyByLectureInfoIndex(testLectureInfoIndex, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyUserIndex', async () => {
		const result = await lectureReply.getLectureReplyByUserIndex(testUserIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyUserIndex', async () => {
		const result = await lectureReply.pageGetLectureReplyByUserIndex(testUserIndex,1 ,3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyUserId', async () => {
		const result = await lectureReply.getLectureReplyByUserId(testUserId);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyByUserId', async () => {
		const result = await lectureReply.pageGetLectureReplyByUserId(testUserId, 1, 3);
		console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureReplyByUserNickName', async () => {
		const result = await lectureReply.getLectureReplyByUserNickName(testUserNickName);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageGetLectureReplyByUserNickName', async () => {
		const result = await lectureReply.pageGetLectureReplyByUserNickName(testUserNickName, 1, 3);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateLectureReply', async () => {
		const result = await lectureReply.updateLectureReply(testLectureInfoIndex, {
			receivedGrade: 1,
			score: 1
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	/** 테스트 용도로 사용 */
	// it('deleteLectureReply', async () => {
	// 	const result = await lectureReply.deleteLectureReply(2);
	// 	// console.log(result);
	// 	expect(result).to.instanceof(Object);
	// });
});
