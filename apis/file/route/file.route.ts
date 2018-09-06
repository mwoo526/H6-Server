import * as express from 'express';
import * as fs from 'fs';
import { file } from '../model/file.model';
import { FileResource } from '../../../resources/file.resource';
import { s3Util } from '../../../packages/utils/s3.util';
import * as path from "path";


let upload = s3Util.upload.array('upload',5);

export class FileRoutes {
    public fileRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    public router() {
        this.fileRouter.post('/file', createFile);
        this.fileRouter.get('/file', listFile);
        this.fileRouter.put('/file/fileIndex/:fileIndex', updateFile);
        this.fileRouter.delete('/file/fileIndex/:fileIndex', deleteFile);
        this.fileRouter.post('/file/fileIndex/:fileIndex/uploadFile', uploadFile);
        this.fileRouter.get('/file/fileIndex/:fileIndex/:filePath/downloadFile', downloadFile);
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
            resul: result,
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
 * route: file 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteFile(req, res): Promise<void> {
    let fileIndex: number = req.params.boardFileIndex;
    try {
        const result = await file.deleteFile(fileIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteFile: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                console.log(err);
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
            let result = req.files;

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
                    console.log(err);
                    res.send({
                        success: false,
                        statusCode: err,
                        message: 'uploadFile: 50000'
                    });
                    break;
            }
        }
    });
}

async function downloadFile(req, res): Promise<void> {
    let fileIndex : number = req.params.fileIndex;
    let filePath : any = req.params.filePath;
    let file = fs.createWriteStream(filePath);
    let params ={bucket: "dv-handam/avatar",
        key: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension)
    }};
    try {

        const result = await  s3Util.upload.s3.getObject(params).createReadStream().pipe(file);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'downloadFile: 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: err,
                    message: 'downloadFile: 50000'
                });
                break;
        }
    }
}

export const fileRoutes : FileRoutes = new FileRoutes();
