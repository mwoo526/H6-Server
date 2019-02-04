import * as aws from 'aws-sdk';
import * as fs from "fs";
import * as nodemailer from 'nodemailer';

export module sesUtil {
    aws.config.loadFromPath(__dirname + '/config/env.json');
    aws.config.update({region:"us-west-2"});
    const file = './packages/utils/config/env.json';
    let emailData: any = fs.readFileSync(file, 'utf8');
    emailData = JSON.parse(emailData);

    const ses = new aws.SES();

    export const smtpTransport = nodemailer.createTransport({
        SES: ses
    });

    export const mailOptions = (to, pw) => {
       return {
            from: emailData.auth.user,
            subject: "한담 비밀번호 재발급 메일",
            html: `${to} 님 안녕하세요.<br><br> 임시비밀번호는 ${pw} 입니다.<br><br>`,
            to: to
        }
    };
    export const params = (subject, html, receiverMail) => {
        return {
            Source: `Handam <${emailData.auth.user}>`,
            Destination: { ToAddresses : [receiverMail]},
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: html
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject
                }
            }
        };
    };
}