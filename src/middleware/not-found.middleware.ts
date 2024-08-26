import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
    const message = "We are sorry the resource you are looking for is not found";
    response.status(200).send(message);
};