import { expect } from 'chai';
import { boardReply } from './boardReply.model';

describe('boardReply 모델', () => {

    before(async () => {
        try {
            const result: any = await boardReply.createBoardReply({
                boardIndex: 1,
                userIndex: 1,
                boardReplyContent: '테스트 댓글입니다'
            });
            // console.log(result);
            expect(result).to.instanceof(Object);
        } catch (err) {
            console.error('err', err);
        }
    })

    after(async () => {
        try {
            const result: any = await boardReply.deleteBoardReply(33);
            // console.log(result);
            expect(result).to.instanceof(Object);
        } catch (err) {
            console.error('err', err);
        }
    })

    it('createBoardReplyComments', async () => {
        const boardData: any = {
            boardIndex: 33,
            userIndex: 10,
            boardReplyContent: '테스트 답글입니다'
        };
        const result: any = await boardReply.createBoardReplyComments(boardData, 41);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('listBoardReplyByBoardIndex', async () => {
        const result: any = await boardReply.listBoardReplyByBoardIndex(20);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardReplyByBoardIndex', async () => {
        const result: any = await boardReply.pageListBoardReplyByBoardIndex(20, 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardReplyByComments', async () => {
        const result: any = await boardReply.listBoardReplyByComments(4);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardReplyByComments', async () => {
        const result: any = await boardReply.pageListBoardReplyByComments(4, 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardReplyComments', async () => {
        const result: any = await boardReply.listBoardReplyComments(23);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardReplyComments', async () => {
        const result: any = await boardReply.pageListBoardReplyComments(23, 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('updateBoardReply', async () => {
        const result: any = await boardReply.updateBoardReply(8, {
            boardReplyContent: '테스트 업데이트 댓글입니다'
        });
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

})
