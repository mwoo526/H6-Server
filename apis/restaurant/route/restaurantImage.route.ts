import * as express from 'express';
import { RestaurantImageResource } from '../../../resources/restaurantImage.resource';
import { restaurantImage } from '../model/restaurantImage.model';

export class RestaurantImageRoute {
	public restaurantImageRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantImageRouter.post('/restaurantImage', createRestaurantImage);
		this.restaurantImageRouter.get('/restaurantImage', listRestaurantImages);
		this.restaurantImageRouter.get('/restaurantImage/restaurantIndex/:restaurantIndex', listRestaurantImagesByRestaurantIndex);
		this.restaurantImageRouter.get('/restaurantImage/restaurantImageIndex/:restaurantImageIndex', getRestaurantImage);
		this.restaurantImageRouter.put('/restaurantImage/restaurantImageIndex/:restaurantImageIndex', updateRestaurantImage);
		this.restaurantImageRouter.delete('/restaurantImage/restaurantImageIndex/:restaurantImageIndex', deleteRestaurantImage);
	}
}

/**
 * route: restaurantImage 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createRestaurantImage(req, res): Promise<void> {
	const restaurantImageData: any = new RestaurantImageResource(req.body);
	try {
		const result: any = await restaurantImage.createRestaurantImage(restaurantImageData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createRestaurantImage: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createRestaurantImage: 50000'
				});
		}
	}
}

/**
 * route: 모든 restaurantImage 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listRestaurantImages(req, res): Promise<void> {
	try {
		const results: any = await restaurantImage.listRestaurantImage();
		res.send({
			success: true,
			statusCode: 200,
			result: results,
			message: 'listRestaurantImages: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listRestaurantImages: 50000'
				});
		}
	}
}

/**
 * route: restaurantIndex 에 따른 restaurantImage 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listRestaurantImagesByRestaurantIndex(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	try {
		const result: any = await restaurantImage.listRestaurantImagesByRestaurantIndex(restaurantIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'listRestaurantImagesByRestaurantIndex: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listRestaurantImagesByRestaurantIndex: 50000'
				});
		}
	}
}

/**
 * route: restaurantImage 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getRestaurantImage(req, res): Promise<void> {
	const {restaurantImageIndex} = req.params;
	try {
		const result: any = await restaurantImage.getRestaurantImage(restaurantImageIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getRestaurantImage: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurantImage: 50000'
				});
		}
	}
}

/**
 * route: restaurantImage 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateRestaurantImage(req, res): Promise<void> {
	const {restaurantImageIndex} = req.params;
	const restaurantImageData: any = new RestaurantImageResource(req.body);
	try {
		const result: any = await restaurantImage.updateRestaurantImage(restaurantImageIndex, restaurantImageData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateRestaurantImage: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateRestaurantImage: 50000'
				});
		}
	}
}

/**
 * route: restaurantImage 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteRestaurantImage(req, res): Promise<void> {
	const {restaurantImageIndex} = req.params;
	try {
		const result: any = restaurantImage.deleteRestaurantImage(restaurantImageIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteRestaurantImage: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteRestaurantImage: 50000'
				});
		}
	}
}

export const restaurantImageRoutes: RestaurantImageRoute = new RestaurantImageRoute();