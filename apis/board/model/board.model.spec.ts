import { expect } from 'chai';
import { board } from './board.model';

describe('board 모델', async () => {
    it('createBoard', async () => {
        const result: any = await board.createBoard({
            boardIndex: 9,
            userIndex: 1,
            category: '분실물',
            boardTitle: '분실물 타이틀2',
            boardContent: '분실물 컨텐츠2'
        });
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('listBoard', async () => {
        const sort: string = 'sort';
        const result: any = await board.listBoard(sort);
        console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoard', async () => {
        const sort: string = 'recommend';
        const result: any = await board.pageListBoard(sort, 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardByCategory', async () => {
        const category: string = '연애';
        const sort: string = 'createdAt';
        const result: any = await board.listBoardByCategory(category, sort);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardByCategory', async () => {
        const category: string = '연애';
        const sort: string = 'createdAt';
        const result: any = await board.pageListBoardByCategory(category, sort, 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardInfoBySearchTerm', async () => {
        const result: any = await board.listBoardBySearchTerm('컨텐');
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardInfoBySearchTerm', async () => {
        const result: any = await board.pageListBoardBySearchTerm('자유', 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardInfoByUserIndex', async () => {
        const result: any = await board.listBoardInfoByUserIndex(1);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardInfoByUserIndex', async () => {
        const result: any = await board.pageListBoardInfoByUserIndex(1, 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('getBoardPost', async () => {
        const result: any = await board.getBoardPost(33);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('getBoardGood', async () => {
        const result: any = await board.getBoardGood(33);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('getBoardBad', async () => {
        const result: any = await board.getBoardBad(33);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('updateBoard', async () => {
        const result: any = await board.updateBoard(20, {
            category: '자유',
            boardTitle: '테스트 타이틀',
            boardContent: '테이트 컨텐츠'
        })
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('updateBoardByCount', async () => {
        const result: any = await board.updateBoardByCount(1);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('updateBoardByRecommendUp', async () => {
        const result: any = await board.updateBoardByRecommendUp(16);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('updateBoardByRecommendDown', async () => {
        const result: any = await board.updateBoardByRecommendDown(16);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('updateBoardByGood', async () => {
        const result: any = await board.updateBoardByGood(33);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('updateBoardByBad', async () => {
        const result: any = await board.updateBoardByBad(33);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('deleteBoard', async () => {
        const result: any = await board.deleteBoard(20);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

})
