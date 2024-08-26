import { Request, Response, NextFunction, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import Helper from '../pool/helper';
import { MasterService } from "../services/master_service";
// import { User } from "../models/user";
import { Master } from "../properties/master";
import { paramMissingError } from '../shared/constants';
import  CORS from "../providers/cors"
import  INTERCEPT from "../providers/intercept"

const path = require('path');
const router = Router();

// let _masterService = new MasterService({});
let _masterService = new MasterService();
const _combinations = ['exception', 'insert', 'bulkinsert', 'query', 'update', 'create'];

/*********************** POST /v1/auth/add ********************/
router.post('/sebiadviser/list', CORS.handle, INTERCEPT.handle, async (req: Request, res: Response) => {

    const param_user: Master = req.body || {};

    if (!param_user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    else {
        const _result = await _masterService.getSebiAdviserList(param_user)

        res.status(OK).json({
            code: '000', message: 'list loaded successfully',
            result: _result
        });
    }
    // return res.status(OK).end();

});

/*********************** 
router.put('/update', CORS.handle, INTERCEPT.handle, async (req: Request, res: Response) => {
router.delete('/delete/:id', CORS.handle, INTERCEPT.handle, async (req: Request, res: Response) => { 
***********/

export default router;
