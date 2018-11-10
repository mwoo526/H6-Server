import { expect } from 'chai';
import { badLog } from './boardBadLog.model';

describe('badLog 모델', () => {
	const badLogData: any = {
		boardIndex: 1,
		userIndex: 1
	};

	it('createBadLog 모델', async () => {
		const result: any = await badLog.createBadLog(badLogData);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('checkBadLog 모델', async () => {
		const result: any = await badLog.checkBadLog(badLogData.boardIndex, badLogData.userIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})
});