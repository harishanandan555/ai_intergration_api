import { NextFunction, Response, Request } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { any, z, ZodObject } from "zod";
// const JsonWebToken = require("jsonwebtoken");
const async = require("async");
import mongoose from "mongoose";

import {logger, prepLogData} from '../shared/Logger';
// const jsonAttributesUser = require("../validation/auth_attributes");
import Helper from "../pool/helper";

const appSetting = JSON.parse(process.env.APPSETTING || "{}");
const IGNORETOKEN_URL_LIST = JSON.parse(process.env.IGNORETOKEN_URL_LIST || "{}");

declare module "express-serve-static-core" {
  interface Request {
    decoded_info?: {};
    attachment_list?: any;
  }
}

class INTERCEPT {

    public static handle = ( schema: ZodObject <{
        body?: z.ZodObject<any, any, any>;
        query?: z.ZodObject<any, any, any>;
        params?: z.ZodObject<any, any, any>;
      }>) => async (req: Request, res: Response, next: NextFunction) => {
    
        const originalUrl = req.originalUrl;
    
        if (originalUrl === "/" || IGNORETOKEN_URL_LIST.indexOf(originalUrl) > -1) {
          return next();
        }
        else {

          next();
    
          // const token = req.headers["qmetrix-token"] as string | undefined;
    
          // if (!token) {
    
          //   res.status(200).send({
          //     code: "001",
          //     messageText: "Missing auth token",
          //   });
    
          // } 
          // else {
    
          //   const secret = appSetting.jwtSecret;
    
          //   try {
    
          //     async.waterfall(
          //       [
          //         async function (callback: any) {
          //           try {
                      
          //             JsonWebToken.verify(token, secret, function (err: Error | null, decoded_info: any) {
    
          //               if (err) {
                          
          //                 let responseJson = {
          //                   code: "004",
          //                   messageText: err.message,
          //                   navigateScreen: "signin",
          //                 };
    
          //                 if (err.name.toUpperCase() === "TOKENEXPIREDERROR")
          //                   responseJson["messageText"] = "Token Expired";
    
          //                 else if (err.name.toUpperCase() === "JSONWEBTOKENERROR")
          //                   responseJson["messageText"] = "Invalid Token";
    
          //                 callback(null, responseJson, false);
    
          //               } 
          //               else {
          //                 callback(null, decoded_info, true);
          //               }
          //             });
          //           } 
          //           catch (err: any) {
          //             console.error(err);
          //           }
          //         },
          //         async function (decoded_info: any, isValid: any, callback: any) {
    
          //           if (isValid) {
    
          //             try {
    
          //               decoded_info["_id"] = new mongoose.Types.ObjectId(decoded_info["_id"]);
    
          //               req.decoded_info = decoded_info;
    
          //               const pool = Helper.mongodbpool();
    
          //               const _model = await pool.getModels("auth",process.env);
    
          //               await _model.authTokenModel.aggregate([
          //                 {
          //                   $lookup: {
          //                     from: "tbl_qmetrix_auth_login",
          //                     localField: "fk_auth_id",
          //                     foreignField: "_id",
          //                     as: "auth_login_details",
          //                   },
          //                 },
          //                 {
          //                   $unwind: "$auth_login_details",
          //                 },
          //                 {
          //                   $match: {
          //                     fk_auth_id: decoded_info["_id"],
          //                     auth_token_value: token,
          //                   },
          //                 },
          //               ])
          //               .exec()
          //               .then((result_token: any) => {
    
          //                 if (result_token.length > 0 && result_token[0]["auth_login_details"]) {
    
          //                   if (result_token[0]["auth_login_details"] && (result_token[0]["auth_login_details"]["_id"] || result_token[0]["auth_login_details"].length >0)) {
          //                     callback(
          //                       null,
          //                       Object.assign(
          //                         result_token[0]["auth_login_details"]["_id"]
          //                           ? result_token[0]["auth_login_details"]
          //                           : result_token[0]["auth_login_details"][0],
          //                         {
          //                           config_details:
          //                             result_token[0]["config_details"],
          //                         }
          //                       ),
          //                       true
          //                     );
          //                   } 
          //                   else {
          //                     callback(
          //                       null,
          //                       {
          //                         config_details: result_token[0]["config_details"],
          //                       },
          //                       true
          //                     );
          //                   }
          //                 } 
          //                 else {
          //                   callback(null, {}, false);
          //                 }
          //               });
          //             } 
          //             catch (error) {
          //               callback(error, null, false);
          //             }
          //           } 
          //           else {
          //             callback(null, decoded_info, false);
          //           }
          //         }
          //       ],
          //       async function (err: Error | null, responseJson: any, is_valid: any) {
    
          //         if (is_valid) {
    
          //           let decoded_token_information = responseJson;
    
          //           decoded_token_information["auth_token_value"] = token;
    
          //           if (responseJson["is_active"]) {
          //             next();
          //           } 
          //           else {
    
          //             if (responseJson["is_cancelled"]) {
          //               res.status(200).send({
          //                 code: "003",
          //                 messageText: "Sorry your mobile number is not active",
          //                 navigateScreen: "signin",
          //               });
          //             } 
          //             else {
    
          //               if (!responseJson["login_is_validated"]) {
          //                 next();
          //               } 
          //               else {
          //                 res.status(200).send({
          //                   code: "003",
          //                   messageText: "Invalid Login",
          //                   navigateScreen: "signin",
          //                 });
          //               }
    
          //             }
          //           }
    
          //         } 
          //         else {
    
          //           if (responseJson && responseJson["validation_check"] === "otp") {
          //             next();
          //           } 
          //           else {
          //             res.status(200).send({
          //               code: "003",
          //               messageText:
          //                 "Your session timed out. Kindly logon again for a fresh start.",
          //               navigateScreen: "signin",
          //             });
          //           }
    
          //         }
          //       }
          //     );
          //   } 
          //   catch (error_main) {
          //     res.status(200).send({
          //       code: "003",
          //       messageText: error_main,
          //     });
          //   } 
          //   finally {}
          // }
        }
        
      };
}

export default INTERCEPT