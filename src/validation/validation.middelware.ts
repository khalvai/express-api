import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

function validateRequestBody(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.send(error.message);
    }

    next();
  };
}

export { validateRequestBody };
