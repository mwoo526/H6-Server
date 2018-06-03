import * as nodemailer from 'nodemailer';

export module emailUtil {
    export const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "h6.verifying.email",
            pass: "starbucks0123"
        }
    });

    export function sendEmail(mailOptions: any, resolve: any, reject: any) {
        smtpTransport.sendMail(mailOptions , function(err, res) {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                console.log('Email sent: ' + res.response);
                resolve("Sent ok!!");
            }
        })
    }
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