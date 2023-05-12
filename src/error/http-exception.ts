import { Response } from 'express';
export class HttpException extends Error {
  status: number;
  message: string;
  constructor(message: string, status: number,) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
