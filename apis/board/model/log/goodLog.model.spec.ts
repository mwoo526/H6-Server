import { expect } from 'chai';
import { goodLog } from './goodLog.model';

describe('goodLog 모델', () => {
	const goodLogData: any = {
		boardIndex: 1,
		userIndex: 1
	};

	it('createGoodLog 모델', async () => {
		const result: any = await goodLog.createGoodLog(goodLogData);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('checkGoodLog 모델', async () => {
		const result: any = await goodLog.checkGoodLog(goodLogData.boardIndex, goodLogData.userIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})
});