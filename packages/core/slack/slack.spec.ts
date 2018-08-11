import { expect } from 'chai';
import { slack } from './slack';
import * as fs from 'fs';

describe('slack', () => {
	it('sendMessage - JSON 메시지 전송 성공', async (done) => {
		let file = './packages/core/env/env.json';
		let envData: any = await fs.readFileSync(file, 'utf8');
		envData = JSON.parse(envData);
		await slack.sendMessage('deploy', {
			attachments: [
				{
					'color': '#36a64f',
					'mrkdwn_in': ['text', 'fields'],
					'fields': [
						{
							'title': `${envData.stage} 서버 배포`,
							'value': `${envData.stage} 서버가 정상적으로 배포되었습니다.`,
							'short': false
						}
					]
				}
			]
		});
		setTimeout(done, 1000);
	});

	// it('sendMessage - 메시지 전송 실패', (done) => {
	//   slack.sendMessage('debug', 'LogSlack: sendMessage(): FAIL');
	//   setTimeout(done, 1000);
	// });
});