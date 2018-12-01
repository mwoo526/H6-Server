import * as aws from 'aws-sdk';
import * as express from 'express';
import {s3Util} from '../../../packages/utils/s3.util';
import {file} from '../model/file.model';


let upload = s3Util.upload.array('upload', 3);
let s3 = new aws.S3();

export class FileRoutes {
    public fileRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    public router() {

        this.fileRouter.get('/file', listFile);
        this.fileRouter.get('/file/postsIndex/:postsIndex', getPostsIndex);
        this.fileRouter.get('/file/fileIndex/:fileIndex/downloadCount', downloadCount);
        this.fileRouter.post('/file/fileIndex/:postsIndex/uploadFile', uploadFile);
        this.fileRouter.post('/file/fileIndex/:fileIndex/downloadFile', downloadFile);
        this.fileRouter.delete('/file/fileIndex/:fileIndex/deleteFile', deleteFile);
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

async function getPostsIndex(req, res): Promise<void> {
    let postsIndex: number = req.params.postsIndex;
    try {
        const result: any = await file.getPostsIndex(postsIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getPostsIndex: 200'
        });
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'getPostsIndex: 50000'
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
    let postsIndex: number = req.params.postsIndex;
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
            for (let i = 0; i < result.length; i++) {
                await file.createFile({
                    postsIndex: postsIndex,
                    fileName: result[i].originalname,
                    filePath: result[i].location,
                    fileSize: result[i].size,
                    fileExtension: result[i].mimetype
                });
                res.send({
                    success: true,
                    statusCode: 200,
                    //result: result[i].location,
                    message: 'uploadFile: 200'
                });
            }
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

/**
 * route: file 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function deleteFile(req, res): Promise<void> {
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
            await file.deleteFile(fileIndex);
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
                    statusCode: 500,
                    message: 'deleteFile: 50000'
                });
                break;
        }
    }
}

/**
 * route: file 다운로드
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function downloadFile(req, res): Promise<void> {
    const signedUrlExpireSeconds = 60 * 5 // your expiry time in seconds.
    let fileIndex: number = req.params.fileIndex;
    try {
        const resultFile = await file.getFileIndex(fileIndex);
        if (resultFile[0].filePath) {
            let splitUpload = resultFile[0].filePath.split('/');
            let splitUploadStage = splitUpload[2].split('.');
            const url = s3.getSignedUrl('getObject', {
                    Bucket: `${splitUploadStage[0]}/${splitUpload[3]}`,
                    Key: `${splitUpload[4]}`,
                    Expires: signedUrlExpireSeconds
                },
                (err) => {
                    if (err) {
                        throw err;
                    }
                }
            );
            await file.updateFile(fileIndex, {
                downloadCount: +1
            });
            res.send({
                success: true,
                statusCode: 200,
                message: 'downloadFile: 200'
            });
        } else {
            res.send({
                success: true,
                statusCode: 404,
                message: 'downloadFile: 40401'
            });
        }
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'downloadFile: 50000'
                });
                break;
        }
    }
}

/**
 * route: downloadCount 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function downloadCount(req, res): Promise<void> {
    let fileIndex: number = req.params.fileIndex;
    try {
        const result = await file.downloadCount(fileIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'downloadCount: 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'downloadCount: 50000'
                });
                break;
        }
    }
}

export const fileRoutes: FileRoutes = new FileRoutes();
