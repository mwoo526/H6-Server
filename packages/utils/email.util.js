"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const nodemailer = require("nodemailer");
var emailUtil;
(function (emailUtil) {
  emailUtil.smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "h6.verifying.email",
      pass: "starbucks0123"
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