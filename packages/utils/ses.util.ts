import * as aws from 'aws-sdk';
import * as fs from "fs";

export module sesUtil {
    aws.config.loadFromPath(__dirname + '/config/env.json');
    aws.config.update({region:"us-west-2"});
    const file = './packages/utils/config/env.json';
    let emailData: any = fs.readFileSync(file, 'utf8');
    emailData = JSON.parse(emailData);

    export const ses = new aws.SES();

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