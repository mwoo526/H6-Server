"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom = require("boom");
const logger_1 = require("logger");
class Raise {
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
    create(tags, statusCode, message, err) {
        if (err instanceof Error === true && err.isBoom) {
            return err;
        }
        else {
            const boomed = boom.create(statusCode, message, err);
            logger_1.logger.error(tags, err);
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
    badRequest(tags, errorCode, err = new Error('badRequest')) {
        if (err instanceof Error === true && err.isBoom) {
            return err;
        }
        else {
            const boomed = boom.badRequest(errorCode, err);
            logger_1.logger.error(tags, err);
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
    unauthorized(tags, errorCode, scheme, attributes) {
        const boomed = boom.unauthorized(errorCode, scheme, attributes);
        logger_1.logger.error(tags, boomed);
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
    forbidden(tags, errorCode, err = new Error('notFound')) {
        const boomed = boom.forbidden(errorCode, err);
        logger_1.logger.error(tags, err);
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
    notFound(tags, errorCode, err = new Error('notFound')) {
        if (err instanceof Error === true && err.isBoom) {
            return err;
        }
        else {
            const boomed = boom.notFound(errorCode, err);
            logger_1.logger.error(tags, err);
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
    conflict(tags, errorCode, err = new Error('conflict')) {
        if (err instanceof Error === true && err.isBoom) {
            return err;
        }
        else {
            const boomed = boom.conflict(errorCode, err);
            logger_1.logger.error(tags, err);
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
    entityTooLarge(tags, errorCode, err = new Error('entityTooLarge')) {
        if (err instanceof Error === true && err.isBoom) {
            return err;
        }
        else {
            const boomed = boom.entityTooLarge(errorCode, err);
            logger_1.logger.error(tags, err);
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
    badImplementation(tags, errorCode, err = new Error('badImplementation')) {
        if (err instanceof Error === true && err.isBoom) {
            return err;
        }
        else {
            const boomed = boom.badImplementation(errorCode, err);
            logger_1.logger.raven(tags, err, {
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
    awsError(tags, errorCode, err = new Error('awsError')) {
        if (err instanceof Error === true && err.isBoom) {
            return err;
        }
        else {
            const boomed = boom.badImplementation(errorCode, err);
            logger_1.logger.error(tags.concat(this.awsErrorTags), boomed);
            return boomed;
        }
    }
}
exports.Raise = Raise;
exports.raise = new Raise();
//# sourceMappingURL=error.util.js.map