"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
var emailUtil;
(function (emailUtil) {
    emailUtil.smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kingdom0608@gmail.com',
            pass: '비밀번호'
        }
    });
    function sendEmail(from, to, subject, text) {
        emailUtil.smtpTransport.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text
        }, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    emailUtil.sendEmail = sendEmail;
})(emailUtil = exports.emailUtil || (exports.emailUtil = {}));
//# sourceMappingURL=email.util.js.map