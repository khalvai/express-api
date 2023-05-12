import { NextFunction } from 'express';
import { HttpException } from '../error/http-exception';

export function DoItSafe() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const next: NextFunction = args[args.length - 1];
      try {
        console.log(this);

        return await method.bind(this)(...args);
      } catch (error: any) {
        next(error);
      }
    };
  };
}
