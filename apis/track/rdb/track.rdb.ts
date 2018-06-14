import { expect } from 'chai';
import { track } from '../model/track.model';

describe('track 모델', () => {
	let testTrackName: Array<string> = [];
	testTrackName = [
		'산업경영공학과',
		'IT응용시스템공학과',
		'컴퓨터공학과',
		'기계시스템공학과'
	];

	it('createTrack', async () => {
		for (let i = 0; i < testTrackName.length; i++) {
			const result = await track.createTrack({
				trackName: testTrackName[i]
			});
			// console.log(result);
			expect(result).instanceof(Object);
		}
	});

	it('deleteTrack', async () => {
		for (let i = 0; i < testTrackName.length; i++) {
			const result = await track.deleteTrack(testTrackName[i]);
			// console.log(result);
			expect(result).instanceof(Object);
		}
	})
});