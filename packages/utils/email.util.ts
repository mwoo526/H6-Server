import * as fs from "fs";
import * as nodemailer from 'nodemailer';

export module emailUtil {
	const file = './packages/utils/config/email.json';
	let emailData: any = fs.readFileSync(file, 'utf8');
	emailData = JSON.parse(emailData);

	export const smtpTransport = nodemailer.createTransport({
		service: emailData.service,
		auth: {
			user: emailData.auth.user,
			pass: emailData.auth.pass
		}
	});
}

/*
export module emailUtil {
	export const smtpTransport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'kingdom0608@gmail.com',
			pass: '비밀번호'
		}
	});

	export function sendEmail(from: string, to: string, subject: string, text: string) {
		smtpTransport.sendMail({
			from: from,
			to: to,
			subject: subject,
			text: text
		}, function(error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		})
	}
}
*/