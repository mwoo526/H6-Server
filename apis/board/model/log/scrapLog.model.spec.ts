import { expect } from 'chai';
import { scrapLog } from './scrapLog.model';

describe('scrapLog 모델', () => {

	it('createScrapLog', async () => {
		const result: any = await scrapLog.createScrapLog(33, 10);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})

	it('checkScrapLog', async () => {
		const result: any = await scrapLog.checkScrapLog(33, 10);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})

	it('updateScrapLog', async () => {
		const result: any = await scrapLog.updateScrapLog(33, 10);
		// console.log(result);
		expect(result).to.instanceof(Object);
	})

})