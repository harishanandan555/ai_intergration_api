import { Request, Response, NextFunction, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
const path = require('path');

import Helper from '../pool/helper';
import { IntegrationService } from "../services/integration_service";
import { Auth } from '../properties/auth';
import { paramMissingError } from '../shared/constants';
import  CORS from "../providers/cors";
import  INTERCEPT from "../providers/intercept";
import * as validationSchema from "../validation/general";

const router = Router();  

let _integrationService = new IntegrationService();

/*********************** POST /v1/auth/add ********************/
router.post('/register', CORS.handle, INTERCEPT.handle(validationSchema.registrationSchema), async (req: Request, res: Response) => {

    const param_bady: Auth = req.body || {};

    try {
      if (!param_bady) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      } 
      else {
        const userResponse: any = await _integrationService.signinMethod(param_bady);

        if (userResponse.code === '000') {
          return res.status(OK).json({
            code: "000",
            messageText: userResponse.message,
            result: userResponse.result
          });
        }
        else {
          return res.status(OK).json({
            code: "405",
            messageText: userResponse.message,
            navigateScreen: userResponse.navigateScreen || '',
            result: userResponse
          });
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }

});

router.get('/ai/test', CORS.handle, INTERCEPT.handle(validationSchema.registrationSchema), async (req: Request, res: Response) => {

    const param_bady: Auth = req.body || {};

    try {
      if (!param_bady) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      } 
      else {
        const userResponse: any = await _integrationService.PortfolioManagement1(param_bady);

        if (userResponse.code === '000') {
          return res.status(OK).json({
            code: "000",
            messageText: userResponse.message,
            result: userResponse.result
          });
        }
        else {
          return res.status(OK).json({
            code: "405",
            messageText: userResponse.message,
            navigateScreen: userResponse.navigateScreen || '',
            result: userResponse
          });
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }

});

export default router;