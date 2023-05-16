import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { HttpException } from '../error/http-exception';

function validateRequestBody(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpException(error.message, 400);
    }

    next();
  };
}

export { validateRequestBody };
