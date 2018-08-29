import { expect } from 'chai';
import { professor } from './professor.model';

describe('professor 모델', () => {
	let testprofessorName: string = '이현아';
	let testdepartment: string = '컴퓨터';
	let testaddress: string = '서울';
	let testtel: any = '01023074151';
	let testemail: string = 'lha0610@naver.com';

	it('createProfessor', async () => {
		const result = await professor.createProfessor({
			professorName: testprofessorName,
			department: testdepartment,
			address: testaddress,
			tel: testtel,
			email: testemail
		});
		console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listProfessor', async () => {
		const result = await professor.listProfessor();
		console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getProfessorByProfessorIndex', async () => {
		const result = await professor.getProfessorByProfessorIndex(0);
		console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getProfessorByProfessorName', async () => {
		const result = await professor.getProfessorByProfessorName('이현아');
		console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateProfessor', async () => {
		const result = await professor.updateProfessor(0, {
			professorName: '나다'
		});
		console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteProfessor', async () => {
		const result = await professor.deleteProfessor(0);
		console.log(result);
		expect(result).to.instanceof(Object);
	});
});


