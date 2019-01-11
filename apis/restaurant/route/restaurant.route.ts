import * as express from 'express';
import { RestaurantResource } from '../../../resources/restaurant.resource';
import { restaurant } from '../model/restaurant.model';

export class RestaurantRoutes {
	public restaurantRouter: express.Route = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantRouter.post('/restaurant', createRestaurant);
		this.restaurantRouter.get('/restaurant', listRestaurants);
		this.restaurantRouter.get('/restaurant/restaurantIndex/:restaurantIndex', getRestaurant);
		this.restaurantRouter.put('/restaurant/restaurantIndex/:restaurantIndex', updateRestaurant);
		this.restaurantRouter.delete('/restaurant/restaurantIndex/:restaurantIndex', deleteRestaurant);
	}
}

/**
 * route: restaurant 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createRestaurant(req, res): Promise<void> {
	const restaurantData: any = new RestaurantResource(req.body);
	try {
		const result: any = await restaurant.createRestaurant(restaurantData.getRestaurant());
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createRestaurant: 50000'
				});
		}
	}
}

/**
 * route: 모든 restaurant 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listRestaurants(req, res): Promise<void> {
	try {
		const results: any = await restaurant.listRestaurants();
		res.send({
			success: true,
			statusCode: 200,
			result: results,
			message: 'listRestaurants: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listRestaurants: 50000'
				});
		}
	}
}

/**
 * route: restaurant 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getRestaurant(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	try {
		const result: any = await restaurant.getRestaurant(restaurantIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurant: 50000'
				});
		}
	}
}

/**
 * route: restaurant 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateRestaurant(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	const restaurantData: any = new RestaurantResource(req.body);
	try {
		const result: any = await restaurant.updateRestaurant(restaurantIndex, restaurantData);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateRestaurant: 50000'
				});
		}
	}
}

/**
 * route: restaurant 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteRestaurant(req, res): Promise<void> {
	const {restaurantIndex} = req.params;
	try {
		const result: any = await restaurant.deleteRestaurant(restaurantIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteRestaurant: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteRestaurant: 50000'
				});
		}
	}
}

export const restaurantRoutes: RestaurantRoutes = new RestaurantRoutes();