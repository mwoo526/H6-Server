import {expect} from 'chai';
import {board} from './board.model';

describe('board 모델', () => {
    it('createBoard', async () => {
        const result: any = await board.createBoard({
            userIndex: 1,
            category: "자유",
            boardTitle: "테스트 타이틀",
            boardContent: "테이스 컨텐츠"
        });
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('listBoardInfo', async () => {
        const result: any = await board.listBoardInfo();
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardInfo', async () => {
        const result: any = await board.pageListBoardInfo(1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardInfoBySearchTerm', async () => {
        const result: any = await board.listBoardInfoBySearchTerm("자유");
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardInfoBySearchTerm', async () => {
        const result: any = await board.pageListBoardInfoBySearchTerm("자유", 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardInfoByCategory', async () => {
        const result: any = await board.listBoardInfoByCategory("취업");
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardInfoByCategory', async () => {
        const result: any = await board.pageListBoardInfoByCategory("취업", 1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('listBoardInfoByPost', async () => {
        const result: any = await board.listBoardInfoByPost("고민");
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('pageListBoardInfoByPost', async () => {
        const result: any = await board.pageListBoardInfoByPost("고민", 1, 5);
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

    it('getPostByBoardIndex', async () => {
        const result: any = await board.getPostByBoardIndex(16);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('pageListBoardInfoByCount', async () => {
        const result: any = await board.pageListBoardInfoByCount(1, 5);
        // console.log(result);
        expect(result).to.instanceof(Array);
    })

    it('updateBoard', async () => {
        const result: any = await board.updateBoard(20, {
            category: "자유",
            boardTitle: "테스트 타이틀",
            boardContent: "테이트 컨텐츠"
        })
        // console.log(result);
        expect(result).to.instanceof(Object);
    })

    it('deleteBoard', async () => {
        const result: any = await board.deleteBoard(20);
        // console.log(result);
        expect(result).to.instanceof(Object);
    })


})
