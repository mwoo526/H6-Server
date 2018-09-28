import { expect } from 'chai';
import { recommendLog } from './recommendLog.model';

describe('recommendLog 모델', () => {

	it('createRecommendLog', async () => {
		const result: any = await recommendLog.createRecommendLog(16, 10);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})

	it('checkRecommendLog', async () => {
		const result: any = await recommendLog.checkRecommendLog(16, 1);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})

	it('updateRecommendLog', async () => {
		const result: any = await recommendLog.updateRecommendLog(16, 1);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})

})