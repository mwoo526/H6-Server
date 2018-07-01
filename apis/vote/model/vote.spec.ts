import { expect } from 'chai';
import { vote } from './vote';

describe('vote 모델', () => {
	let testVoteTopicIndex: number;
	let testVoteTopicName: string = '한성대학교를 상징하는 동물은 무엇입니까?';

	before(async () => {
		try {
			/** voteTopic 생성 */
			const result = await vote.createVoteTopic({
				topicName: testVoteTopicName
			});
			/** validation 체크 */
			expect(result).instanceof(Object);
			/** voteTopic topicName 조회 */
			const resultVoteTopicByTopicName = await vote.getVoteTopicByTopicName(testVoteTopicName);
			/** validation 체크 */
			expect(resultVoteTopicByTopicName).to.instanceof(Array);
			testVoteTopicIndex = resultVoteTopicByTopicName[0].voteTopicIndex;
			console.log(testVoteTopicIndex);
		} catch (err) {
			console.error('err', err);
		}
	});

	after(async () => {
		try {
			const result = await vote.deleteVoteTopic(testVoteTopicIndex);
			expect(result).instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	/** 테스트 용도로 사용 */
	// it('createVoteTopic', async () => {
	// 	const result = await vote.createVoteTopic({
	// 		topicName: testVoteTopicName
	// 	});
	// 	// console.log(result);
	// 	expect(result).instanceof(Object);
	// });

	it('getVoteTopic', async () => {
		const result = await vote.getVoteTopic(testVoteTopicIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	/** 테스트 용도로 사용 */
	// it('deleteVoteTopic', async () => {
	// 	const result = await vote.deleteVoteTopic(testVoteTopicIndex);
	// 	// console.log(result);
	// 	expect(result).instanceof(Object);
	// });
});
