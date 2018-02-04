import * as boom from 'boom';
import { logger } from 'logger';

export class Raise {
	awsErrorTags: string[];

	constructor() {
		this.awsErrorTags = ['awsError'];
	}

	/**
	 * HTTP 응답 생성
	 *
	 * @param tags
	 * @param statusCode
	 * @param message
	 * @param err
	 * @returns boom.BoomError
	 */
	create(tags: string[], statusCode: number, message: string, err: any): boom.BoomError {
		if (err instanceof Error === true && err.isBoom) {
			return err;
		} else {
			const boomed: boom.BoomError = boom.create(statusCode, message, err);
			logger.error(tags, err);
			return boomed;
		}
	}

	/**
	 * HTTP 상태 코드: 400(Bad Request)
	 *
	 * @param tags
	 * @param errorCode
	 * @param err
	 * @returns boom.BoomError
	 */
	badRequest(tags: string[], errorCode: string, err: any = new Error('badRequest')): boom.BoomError {
		if (err instanceof Error === true && err.isBoom) {
			return err;
		} else {
			const boomed: boom.BoomError = boom.badRequest(errorCode, err);
			logger.error(tags, err);
			return boomed;
		}
	}

	/**
	 * HTTP 상태 코드: 401(Unauthorized)
	 *
	 * @param tags
	 * @param errorCode
	 * @param scheme
	 * @param attributes
	 * @returns boom.BoomError
	 */
	unauthorized(tags: string[], errorCode: string, scheme?: any, attributes?: any): boom.BoomError {
		const boomed: boom.BoomError = boom.unauthorized(errorCode, scheme, attributes);
		logger.error(tags, boomed);
		return boomed;
	}

	/**
	 * HTTP 상태 코드: 403(Forbidden)
	 *
	 * @param tags
	 * @param errorCode
	 * @param err
	 * @returns boom.BoomError
	 */
	forbidden(tags: string[], errorCode: string, err: any = new Error('notFound')): boom.BoomError {
		const boomed: boom.BoomError = boom.forbidden(errorCode, err);
		logger.error(tags, err);
		return boomed;
	}

	/**
	 * HTTP 상태 코드: 404(Not Found)
	 *
	 * @param tags
	 * @param errorCode
	 * @param err
	 * @returns Boom.BoomError
	 */
	notFound(tags: string[], errorCode: string, err: any = new Error('notFound')): boom.BoomError {
		if (err instanceof Error === true && err.isBoom) {
			return err;
		} else {
			const boomed: boom.BoomError = boom.notFound(errorCode, err);
			logger.error(tags, err);
			return boomed;
		}
	}

	/**
	 * HTTP 상태 코드: 409(Conflict)
	 *
	 * @param tags
	 * @param errorCode
	 * @param err
	 * @returns boom.BoomError
	 */
	conflict(tags: string[], errorCode: string, err: any = new Error('conflict')): boom.BoomError {
		if (err instanceof Error === true && err.isBoom) {
			return err;
		} else {
			const boomed: boom.BoomError = boom.conflict(errorCode, err);
			logger.error(tags, err);
			return boomed;
		}
	}

	/**
	 * HTTP 상태 코드: 413(Request Entity Too Large)
	 *
	 * @param tags
	 * @param errorCode
	 * @param err
	 * @returns boom.BoomError
	 */
	entityTooLarge(tags: string[], errorCode: string, err: any = new Error('entityTooLarge')): boom.BoomError {
		if (err instanceof Error === true && err.isBoom) {
			return err;
		} else {
			const boomed: boom.BoomError = boom.entityTooLarge(errorCode, err);
			logger.error(tags, err);
			return boomed;
		}
	}

	/**
	 * HTTP 상태 코드: 500(Internal Server Error)
	 *
	 * @param tags
	 * @param errorCode
	 * @param err
	 * @returns boom.BoomError
	 */
	badImplementation(tags: string[], errorCode: string, err: any = new Error('badImplementation')): boom.BoomError {
		if (err instanceof Error === true && err.isBoom) {
			return err;
		} else {
			const boomed: boom.BoomError = boom.badImplementation(errorCode, err);
			logger.raven(tags, err, {
				errorCode: errorCode
			});
			return boomed;
		}
	}

	/**
	 * HTTP 상태 코드: 500(AWS Error)
	 *
	 * @param tags
	 * @param errorCode
	 * @param err
	 * @returns boom.BoomError
	 */
	awsError(tags: string[], errorCode: string, err: any = new Error('awsError')): boom.BoomError {
		if (err instanceof Error === true && err.isBoom) {
			return err;
		} else {
			const boomed: boom.BoomError = boom.badImplementation(errorCode, err);
			logger.error(tags.concat(this.awsErrorTags), boomed);
			return boomed;
		}
	}
}

export const raise: Raise = new Raise();
