import * as express from 'express';
import { s3Util } from '../../../packages/utils/s3.util';
import { notice } from '../model/notice.model';
const upload = s3Util.noticeUpload('notice').single('notice');

export class NoticeRoutes {
	public noticeRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.noticeRouter.post('/notice/:noticeIndex', createNotice);
		this.noticeRouter.get('/notice', listNotice);
		this.noticeRouter.get('/notice/img', listNoticeImg);
	}
}

const createNotice = (req, res) => {
	//const {noticeUrl, noticeSubject} = req.body;
	upload(req, res, async (err) => {
		if (err) {
			if (err.message === 'The AWS Access Key Id you provided does not exist in our records.') {
				res.send({
					success: false,
					statusCode: 403,
					message: 'createNotice: 40301'
				});
			}
			if (err.message === 'The request signature we calculated does not match the signature you provided. Check your key and signing method.') {
				res.send({
					success: false,
					statusCode: 403,
					message: 'createNotice: 40302'
				});
			}
		}
		try {
			const file = req.file;
			const result = await notice.createNotice({
                noticeIndex: req.params.noticeIndex,
				noticeImg: s3Util.getS3URL() + `resized-${file.fieldname}/${file.key}`
			});

			res.send({
				success: true,
				statusCode: 200,
				result: result,
				message: 'createNotice: 200'
			})
		} catch (err) {
			switch (err) {
				default:
					res.send({
						success: false,
						statusCode: 500,
						message: 'createNotice: 50000'
					});
					break;
			}
		}

	})
};

const listNotice = async (req, res) => {
	try {
		const result = await notice.listNotice();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'listNotice 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listNotice: 50000'
				});
		}
	}
};

const listNoticeImg = async (req, res) => {
	try {
		const result = await notice.listNoticeImg();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'listNoticeImg: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listNoticeImg: 50000'
				});
				break;
		}
	}
};

export const noticeRoutes: NoticeRoutes = new NoticeRoutes();
