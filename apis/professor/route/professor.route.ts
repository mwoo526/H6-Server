import * as express from 'express';
import {professor} from "../model/professor.model";
import {ProfessorResource} from "../../../resource/professorResource";

export class ProfessorRoute {
    public professorRouter: express.Router = express.Router();

    constructor(){
        this.router();
    }

    public router() {
        this.professorRouter.post('/professors', createProfessor);
        this.professorRouter.get('/professors', listProfessor);
        this.professorRouter.get('/professors/:professorIndex/professorIndex', getProfessorIndex);
        this.professorRouter.get('/professors/:professorName/professorName', getProfessorName);
        this.professorRouter.put('/professors/:professorIndex', updateProfessor);
        this.professorRouter.delete('/professors/:professorIndex', deleteProfessor);
    }
}


/**
 * route: professor 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createProfessor(req, res): Promise<void> {
    try {
        let professorData: any = new ProfessorResource(req.body);
        const result: any = await professor.createProfessor(professorData.getProfessor());
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}


/**
 * route: professor 리스트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listProfessor(req, res): Promise<void> {
    try {
        const result: any = await professor.listProfessor();
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

/**
 * route: professorIndex 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getProfessorIndex(req, res): Promise<void> {
    try {
        let professorIndex: number = req.params.professorIndex;
        const result: any = await professor.getProfessorIndex(professorIndex);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

/**
 * route: professorName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getProfessorName(req, res): Promise<void> {
    try {
        let professorName: string = req.params.professorName;
        const result: any = await professor.getProfessorName(professorName);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

/**
 * route: professor 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateProfessor(req, res): Promise<void> {
    try {
        let professorIndex: number = req.params.professorIndex;
        let professorData: any = new ProfessorResource(req.body);
        const result: any = await professor.updateProfessor(professorIndex, professorData);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

/**
 * route: professor 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteProfessor(req, res): Promise<void> {
    try {
        let professorIndex: number = req.params.professorIndex;
        const result: any = await professor.deleteProfessor(professorIndex);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

export const professorRoutes: ProfessorRoute = new ProfessorRoute();