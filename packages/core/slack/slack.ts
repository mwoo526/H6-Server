import axios from 'axios';
import * as fs from 'fs';

export class Slack {

	constructor(private paths?: object) {
		this.paths = (this.paths) ? this.paths : {
			deploy: 'T8L9Z0KGC/BC6G0C4CF/uuKe61Z8pfbA6aEc86YZt6SL',
			report: 'T8L9Z0KGC/BF8QZNNQ6/HmLda4Al4DtfsXjsRZnPgLAP'
		};
	}

	/**
	 * 슬렉 메시지 전송
	 * @param channel
	 * @param message
	 * @returns {string}
	 */
	sendMessage(channel: string, message: Object): void {
		const path = this.getChannelPath(channel);
		const url: string = `https://hooks.slack.com/services/${path}`;
		const options = {
			url: `https://hooks.slack.com/services/${path}`,
			method: 'POST',
			json: true,
			body: message
		};
		/**
		 * 슬랙 메시지 전송 실패시 서버 에러가 발생하지 않게 하기 위해 setImmediate으로 처리
		 */
		setImmediate(() => {
			axios.post(url, message)
				.then((response) => response.data)
				.catch((err) => {
					console.log(err);
				});
		});
	}

	async sendReportMessage(channel: string, postsIndex: number, reportCount: number) {
		const file = './packages/utils/config/env.json';
		let envData: any = await fs.readFileSync(file, 'utf8');
		envData = JSON.parse(envData);
		const path = this.getChannelPath(channel);
		const url: string = `https://hooks.slack.com/services/${path}`;

		const message = {
			attachments: [
				{
					'color': '#36a64f',
					'mrkdwn_in': ['text', 'fields'],
					'fields': [
						{
							'title': `${envData.stage} 서버 / Report 알림`,
							'value': `postsIndex=${postsIndex}, reportCount=${reportCount} `,
							'short': false
						}
					]
				}
			]
		};

		const options = {
			url: `https://hooks.slack.com/services/${path}`,
			method: 'POST',
			json: true,
			body: message
		};

		/**
		 * 슬랙 메시지 전송 실패시 서버 에러가 발생하지 않게 하기 위해 setImmediate으로 처리
		 */
		setImmediate(() => {
			axios.post(url, message)
				.then((response) => response.data)
				.catch((err) => {
					console.log(err);
				});
		});
	}

	async sendDeployMessage(channel: string) {
		/** 환경변수 파일 읽어오기 */
		const file = './packages/utils/config/env.json';
		let envData: any = await fs.readFileSync(file, 'utf8');
		envData = JSON.parse(envData);

		const path = this.getChannelPath(channel);
		const url: string = `https://hooks.slack.com/services/${path}`;
		const message = {
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
		};
		const options = {
			url: `https://hooks.slack.com/services/${path}`,
			method: 'POST',
			json: true,
			body: message
		};

		/**
		 * 슬랙 메시지 전송 실패시 서버 에러가 발생하지 않게 하기 위해 setImmediate으로 처리
		 */
		setImmediate(() => {
			axios.post(url, message)
				.then((response) => response.data)
				.catch((err) => {
					console.log(err);
				});
		});
	}

	/**
	 * Webhook path 선택
	 * @param channel
	 * @returns string
	 */
	private getChannelPath(channel: string): string {
		const path: string = this.paths[channel];
		if (!path) {
			throw new Error('Channels not supported');
		}
		return path;
	}
}

export const slack: Slack = new Slack();
