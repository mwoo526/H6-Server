import * as express from 'express';
// import * as fs from 'fs';
import * as aws from 'aws-sdk';
import { file } from '../model/file.model';
import { FileResource } from '../../../resources/file.resource';
import { s3Util } from '../../../packages/utils/s3.util';


let upload = s3Util.upload.single('upload');
let s3 = new aws.S3();

export class FileRoutes {
    public fileRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    public router() {
        this.fileRouter.post('/file', createFile);
        this.fileRouter.post('/file/fileIndex/:fileIndex/uploadFile', uploadFile);
        this.fileRouter.get('/file', listFile);
        this.fileRouter.get('/file/fileIndex/:fileIndex', getFileIndex);
        this.fileRouter.put('/file/fileIndex/:fileIndex', updateFile);
        this.fileRouter.delete('/file/fileIndex/:fileIndex', deleteFile);
        this.fileRouter.delete('/file/fileIndex/:fileIndex/deleteUpload', deleteUploadFile);
       //  this.fileRouter.get('/file/fileIndex/:fileIndex/downloadFile', downloadFile);
    }
}

/**
 * route: file 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createFile(req, res): Promise<void> {
    let fileData: any = new FileResource(req.body);
    try {
        const result: any = await file.createFile(fileData.getFile());
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createFile: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'createFile: 50000'
                });
                break;
        }
    }
}

/**
 * route: file 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listFile(req, res): Promise<void> {
    try {
        const result = await file.listFile();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listFile: 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'listFile: 50000'
                });
                break;
        }
    }
}

/**
 * route: file FileIndex 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getFileIndex(req, res): Promise<void> {
    let fileIndex: number = req.params.fileIndex;
    try {
        const result: any = await file.getFileIndex(fileIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result[0],
            message: 'getFileIndex: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getFileIndes: 50000'
                });
                break;
        }
    }
}








/**
 * route: file 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateFile(req, res): Promise<void> {
    let fileIndex: number = req.params.boardFileIndex;
    let fileData: any = new FileResource(req.body);
    try {
        const result: any = await file.updateFile(fileIndex, fileData.getFile());
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateFile: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'updateFile: 50000'
                });
                break;
        }
    }
}

/**
 * route: File 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteFile(req, res): Promise<void> {
    let fileIndex: number = req.params.fileIndex;
    try {

        await file.deleteFile(fileIndex);
        res.send({
            success: true,
            statusCode: 200,
            message: 'deleteFile: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'deleteFile: 50000'
                });
                break;
        }
    }
}




/**
 * route: filePath 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function deleteUploadFile(req, res): Promise<void> {
    let fileIndex: number = req.params.fileIndex;
    try {
        const resultFile = await file.getFileIndex(fileIndex);
        if (resultFile[0].filePath) {
            let splitUpload = resultFile[0].filePath.split('/');
            let splitUploadStage = splitUpload[2].split('.');
            await s3.deleteObject(
                {
                    Bucket: `${splitUploadStage[0]}/${splitUpload[3]}`,
                    Key: `${splitUpload[4]}`
                },
                (err) => {
                    if (err) {
                        throw err;
                    }
                }
            );
            await file.updateFile(fileIndex, {
                filePath: null
            });
            res.send({
                success: true,
                statusCode: 200,
                message: 'deleteFile: 200'
            });
        } else {
            res.send({
                success: true,
                statusCode: 404,
                message: 'deleteFile: 40401'
            });
        }
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: err,
                    message: 'deleteFile: 50000'
                });
                break;
        }
    }
}


/**
 * route: file 업로드
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function uploadFile(req, res): Promise<void> {
    let fileIndex : number =  req.params.fileIndex;
    upload(req, res, async function (err) {
        if (err) {
            if (err.message === 'The AWS Access Key Id you provided does not exist in our records.') {
                res.send({
                    success: false,
                    statusCode: 403,
                    message: 'uploadFile: 40301'
                });
            }
            if (err.message === 'The request signature we calculated does not match the signature you provided. Check your key and signing method.') {
                res.send({
                    success: false,
                    statusCode: 403,
                    message: 'uploadFile: 40302'
                });
            }
        }
        try {
            let result = req.file;

            /** 파일 등록 */
            await file.updateFile(fileIndex, {
                filePath: result.location
            });
            res.send({
                success: true,
                statusCode: 200,
                result: result.location,
                message: 'uploadFile: 200'
            });
        } catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'uploadFile: 50000'
                    });
                    break;
            }
        }
    });
}
/*
async function downloadFile(req, res): Promise<any> {
    let fileIndex : number = req.params.fileIndex;
    let file = fs.createWriteStream('avatar/req[0].fileName');

    try {
        const result = await  s3.getObject({
            Bucket: 'dv-handam/avatar',
            Key: 'avatar/req[0].fileName'
        }).createReadStream().pipe(file);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'downloadFile: 200'
        })
    } catch (err) {
        switch (err) {
            default:
                console.log(err);
                res.send({
                    success: false,
                    statusCode: err,
                    message: 'downloadFile: 50000'
                });
                break;
        }
    }
}
*/
export const fileRoutes : FileRoutes = new FileRoutes();
