import { expect } from 'chai';
import { lecture } from './lecture.model';

describe('lecture 모델', () => {
	const testLectureIndex: number = 29;
	const testLectureCode: string = 'IDE0001';

	it('createLecture', async () => {
		const result = await lecture.createLecture({
			lectureCode: 'IDE0001',
			lectureName: 'Node.js',
			track: 'IT'
		});
		// console.log(result);
		expect(result).instanceof(Object);
	});

	it('listLecture', async () => {
		const result = await lecture.listLecture();
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureByLectureIndex', async () => {
		const result = await lecture.getLectureByLectureIndex(testLectureIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getLectureByLectureCode', async () => {
		const result = await lecture.getLectureByLectureCode(testLectureCode);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('deleteLecture', async () => {
		const result = await lecture.deleteLecture(testLectureIndex);
		// console.log(result);
		expect(result).instanceof(Object);
	})
});