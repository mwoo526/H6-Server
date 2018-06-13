import { expect } from 'chai';
import { track } from '../model/track.model';

describe('track 모델', () => {
	let testTrackName: string = '경제학과';

	it('createTrack', async () => {
		const result = await track.createTrack({
			trackName: testTrackName
		});
		console.log(result);
		expect(result).instanceof(Object);
	});

	it('deleteTrack', async () => {
		const result = await track.deleteTrack(testTrackName);
		// console.log(result);
		expect(result).instanceof(Object);
	})
});