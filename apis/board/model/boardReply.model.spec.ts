import { expect } from 'chai';
import { boardReply } from './boardReply.model';

describe('boardReply 모델',() => {

    before(async () => {
        try {
            const result: any = await boardReply.createBoardReply({
                boardIndex: 20,
                userIndex: 1,
                boardReplyContent: "테스트 댓글입니다"
            });
            // console.log(result);
            expect(result).to.instanceof(Object);
        } catch(err) {
            console.error('err',err);
        }
    })

    after(async () => {
        try {
            const result: any = await boardReply.deleteBoardReply(8);
            // console.log(result);
            expect(result).to.instanceof(Object);
        } catch(err) {
            console.error('err',err);
        }
    })

    it('listBoardReplyByBoardIndex', async () => {
        const result: any = await boardReply.listBoardReplyByBoardIndex(20);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardReplyByBoardIndex', async () => {
        const result: any = await boardReply.pageListBoardReplyByBoardIndex(20,1,5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardReplyByUserIndex', async () => {
        const result: any = await boardReply.listBoardReplyByUserIndex(2);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardReplyByUserIndex', async () => {
        const result = await boardReply.pageListBoardReplyByUserIndex(2,1,5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('updateBoardReply', async () => {
        const result: any = await boardReply.updateBoardReply(8,{
            boardReplyContent : "테스트 업데이트 댓글입니다"
        });
        // console.log(result);
        expect(result).to.instanceof(Object);
    })


})
