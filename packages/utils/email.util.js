"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const nodemailer = require("nodemailer");
var emailUtil;
(function (emailUtil) {
    const file = './packages/utils/config/email.json';
    let emailData = fs.readFileSync(file, 'utf8');
    emailData = JSON.parse(emailData);
    emailUtil.smtpTransport = nodemailer.createTransport({
        service: emailData.service,
        auth: {
            user: emailData.auth.user,
            pass: emailData.auth.pass
        }
    });
})(emailUtil = exports.emailUtil || (exports.emailUtil = {}));
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
//# sourceMappingURL=email.util.js.map