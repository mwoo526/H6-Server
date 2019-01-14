import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { restaurantSubscriber } from '../model/restaurantSubscriber.model';

export class RestaurantSubscriberRoutes {
    public restaurantSubscriberRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    public router() {
        this.restaurantSubscriberRouter.put('/restaurantSubscriber/restaurantIndex/:restaurantIndex', putRestaurantSubscriber);;
    }
}

/**
 * route: restaurantSubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function putRestaurantSubscriber(req, res): Promise<void> {
    const {restaurantIndex} = req.params;
    const {tokenIndex} = auth(req);
    try {
        let result: any = await restaurantSubscriber.updateRestaurantSubscriber(tokenIndex, restaurantIndex, req.body);
        if (result.changedRows == 0) {
            result = await restaurantSubscriber.createRestaurantSubscriber({
                userIndex: tokenIndex,
                restaurantIndex: restaurantIndex,
                isGood: 1
            });
        }
        else {
            result = await restaurantSubscriber.getRestaurantSubscriber(tokenIndex, restaurantIndex);
            if (result[0].isGood == 0) {
                await restaurantSubscriber.deleteRestaurantSubscriber(tokenIndex, restaurantIndex);
            }
            result = result[0];
        }

        delete result.userIndex;
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'putRestaurantSubscriber: 200'
        });

    } catch(err) {
        switch (err) {
            case 'The ID does not exist':
                res.send({
                    success: false,
                    statusCode: 404,
                    message: 'putRestaurantSubscriber : 40401'
                });
                break;
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'putRestaurantSubscriber : 50000'
                });
                break;
        }
    }
}

export const restaurantSubscriberRoutes: RestaurantSubscriberRoutes = new RestaurantSubscriberRoutes();