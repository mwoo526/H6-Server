import { expect } from 'chai';
import { reportLog } from './reportLog.model';

describe('reportLog 모델', () => {

    let userIndex: number = 1;
    let boardIndex: number = 20;
    let reportLogTitle: string = "신고 테스트";
    let reportLogContent: string = "허위정보로 인한 신고!!"

    /*** 테스트 용도로 사용 ***/
    /*
    it('createReportLog', async () => {
        try {
            const result = await reportLog.createReportLog({
                userIndex: userIndex,
                boardIndex: boardIndex,
                reportLogTitle: reportLogTitle,
                reportLogContent: reportLogContent
            });
            //console.log(result);
            expect(result).to.be.eqls({
                userIndex: userIndex,
                boardIndex: boardIndex,
                reportLogTitle: reportLogTitle,
                reportLogContent: reportLogContent
            });
        } catch (err) {
            console.error('err', err);
        }
    });
    */

    let listCount: number;
    it('listReportLogInfo', async () => {
        const result = await reportLog.listReportLogInfo();
        //console.log(result);
        listCount = result.length;
        expect(result).to.instanceof(Array);
    });

    let page: number = 1;
    let count: number = 3;
    let pageListCount: number;
    it('pageListReportLogInfo', async () => {
       const result = await reportLog.pageListReportLogInfo(page, count);
       //console.log(result);
       expect(result).to.instanceof(Array);
       pageListCount = result.length;
       if(listCount >= 3) {
           expect(pageListCount).to.eql(count);
       }
       else {
           expect(pageListCount).to.eql(listCount);
       }
    });

    let reportLogIndex: number = 6;
    it('getReportLogContent', async () => {
        const result = await reportLog.getReportLogContent(reportLogIndex);
        //console.log(result);
        expect(result).to.instanceof(Array);
        if(result.length === 1) {
            //console.log(result[0].reportLogIndex);
            expect(result[0].reportLogIndex).to.eql(reportLogIndex);
        }

    });

    let updateReportLogTitle: string = "신고 타이틀 업데이트2";
    let updateReportLogContent: string = "신고 내용 업데이트2";
    it('updateReportLog', async () => {
       const result = await reportLog.updateReportLog(reportLogIndex, {
           reportLogIndex: reportLogIndex,
           userIndex: userIndex,
           boardIndex: boardIndex,
           reportLogTitle: updateReportLogTitle,
           reportLogContent: updateReportLogContent
       });
       //console.log(result);
       expect(result).to.instanceof(Object);
       expect(result).to.be.eqls({
           reportLogIndex: reportLogIndex,
           userIndex: userIndex,
           boardIndex: boardIndex,
           reportLogTitle: updateReportLogTitle,
           reportLogContent: updateReportLogContent
       });
    });

    /*** 테스트 용도로 사용 ***/
    /*
    it('deleteReportLog', async () => {
        const result = await reportBoard.deleteReportLog(10);
        //console.log(result);
        expect(result).to.instanceof(Object);
    });
    */
});