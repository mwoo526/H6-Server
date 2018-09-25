import { expect } from 'chai';
import { countLog } from './countLog.model';

describe('countLog 모델', () => {

	const countLogData: any = {
		boardIndex: 19,
		userIndex: 10
	};

	it('createCountLog', async () => {
		const result: any = await countLog.createCountLog(countLogData.boardIndex, countLogData.userIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})

	it('checkCountLog', async () => {
		const result: any = await countLog.checkCountLog(countLogData.boardIndex, countLogData.userIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})

})
