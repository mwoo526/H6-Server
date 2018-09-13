import * as express from 'express';
import {CategoryResource} from '../../../resources/category.resource';
import {category} from '../model/category.model';

export class CategoryRoutes {
    public categoryRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    public router() {
        this.categoryRouter.post('/category', createCategory);
        this.categoryRouter.get('/category', listCategory);
        this.categoryRouter.put('/category/:categoryName', updateCategory);
        this.categoryRouter.delete('/category/:categoryName', deleteCategory);
    }
}

/**
 * route : category 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createCategory(req, res) {
    let categoryData: CategoryResource = new CategoryResource(req.body);
    try {
        const result: any = await category.createCategory(categoryData.getCategory());
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createCategory 200'
        })
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createCategory 500'
        })
    }
}

/**
 * route : category 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listCategory(req, res) {
    try {
        const result: any = await category.listCategory();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'listCategory 200'
            })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'updateCategory 500'
                })
                break;
        }
    }
}

/**
 * route : category 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateCategory(req, res) {
    let categoryName: string = req.params.categoryName;
    let categoryData: CategoryResource = new CategoryResource(req.body);
    try {
        const result: any = await category.updateCategory(categoryName, categoryData);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateCategory 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'updateCategory 500'
                })
                break;
        }
    }
}

/**
 * category 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteCategory(req, res) {
    let categoryName: string = req.params.categoryName;
    try {
        const result: any = await category.deleteCategory(categoryName);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteCategory 200'
        })
    } catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'deleteCategory 500'
                })
                break;
        }
    }
}

export const categoryRoutes: CategoryRoutes = new CategoryRoutes();