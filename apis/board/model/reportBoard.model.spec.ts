import { expect } from 'chai';
import { reportBoard } from './reportBoard.model';

describe('reportBoard 모델', () => {

	let userIndex: number = 1;
	let boardIndex: number = 20;
	let reportBoardTitle: string = '신고 테스트';
	let reportBoardContent: string = '허위정보로 인한 신고!!'

	/*** 테스트 용도로 사용 ***/
	/*
	it('createReportBoard', async () => {
			try {
					const result = await reportBoard.createReportBoard({
							userIndex: userIndex,
							boardIndex: boardIndex,
							reportBoardTitle: reportBoardTitle,
							reportBoardContent: reportBoardContent
					});
					//console.log(result);
					expect(result).to.be.eqls({
							userIndex: userIndex,
							boardIndex: boardIndex,
							reportBoardTitle: reportBoardTitle,
							reportBoardContent: reportBoardContent
					});
			} catch (err) {
					console.error('err', err);
			}
	});
	*/

	let listCount: number;
	it('listReportBoardInfo', async () => {
		const result = await reportBoard.listReportBoardInfo();
		//console.log(result);
		listCount = result.length;
		expect(result).to.instanceof(Array);
	});

	let page: number = 1;
	let count: number = 3;
	let pageListCount: number;
	it('pageListReportBoardInfo', async () => {
		const result = await reportBoard.pageListReportBoardInfo(page, count);
		//console.log(result);
		expect(result).to.instanceof(Array);
		pageListCount = result.length;
		if (listCount >= 3) {
			expect(pageListCount).to.eql(count);
		}
		else {
			expect(pageListCount).to.eql(listCount);
		}
	});

	let reportBoardIndex: number = 6;
	it('getReportBoardContent', async () => {
		const result = await reportBoard.getReportBoardContent(reportBoardIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
		if (result.length === 1) {
			//console.log(result[0].reportBoardIndex);
			expect(result[0].reportBoardIndex).to.eql(reportBoardIndex);
		}

	});

	let updateReportBoardTitle: string = '신고 타이틀 업데이트2';
	let updateReportBoardContent: string = '신고 내용 업데이트2';
	it('updateReportBoard', async () => {
		const result = await reportBoard.updateReportBoard(reportBoardIndex, {
			reportBoardIndex: reportBoardIndex,
			userIndex: userIndex,
			boardIndex: boardIndex,
			reportBoardTitle: updateReportBoardTitle,
			reportBoardContent: updateReportBoardContent
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
		expect(result).to.be.eqls({
			reportBoardIndex: reportBoardIndex,
			userIndex: userIndex,
			boardIndex: boardIndex,
			reportBoardTitle: updateReportBoardTitle,
			reportBoardContent: updateReportBoardContent
		});
	});

	/*** 테스트 용도로 사용 ***/
	/*
	it('deleteReportBoard', async () => {
			const result = await reportBoard.deleteReportBoard(10);
			//console.log(result);
			expect(result).to.instanceof(Object);
	});
	*/
});