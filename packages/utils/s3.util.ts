import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as path from 'path';

export module s3Util {
	aws.config.loadFromPath(__dirname + "/config/awsconfig.json");
	let s3 = new aws.S3();

	export const upload = multer({
		storage: multerS3({
			s3: s3,
			bucket: "dv-handam/avatar",
			key: function (req, file, cb) {
				let extension = path.extname(file.originalname);
				cb(null, Date.now().toString() + extension)
			},
			acl: 'public-read-write',
		})
	});
}