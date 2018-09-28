import { expect } from 'chai';
import { file } from './file.model';

describe('file 모델', () => {
    let testBoardFileIndex: number = 11;
    let testBoardIndex: number = 11;
    let testUserIndex: number = 11;
    let testFileName: string = '꿀잼';
    let testFilePath: any = 'www.amazon.com';
    let testFileExtension: string = 'jpg';
    let testdownloadCount: number = 3;

    it('createFile', async () => {
        const result = await file.createFile({
            BoardFileIndex: testBoardFileIndex,
            BoardIndex: testBoardIndex,
            UserIndex: testUserIndex,
            FileName: testFileName,
            FilePath: testFilePath,
            FileExtenstion: testFileExtension,
            downloadCount: testdownloadCount
        });
        //console.log(result);
        expect(result).to.instanceof(Object);
    });

    it('listFile', async () => {
        const result = await file.listFile();
        //console.log(result);
        expect(result).to.instanceof(Array);
    });

    it('getFileIndex', async () => {
        const result = await file.getFileIndex(11);
         //console.log(result);
        expect(result).to.instanceof(Array);
    });

    it('getBoardIndex', async () => {
        const result = await file.getBoardIndex(11);
        //console.log(result);
        expect(result).to.instanceof(Array);
    });

    it('updateFile', async () => {
        const result = await file.updateFile(11, {
            FileName: '노잼'
        });
        //console.log(result);
        expect(result).to.instanceof(Object);
    });

    it('deleteFile', async () => {
        const result = await file.deleteFile(11);
        //console.log(result);
        expect(result).to.instanceof(Object);
    });
});
