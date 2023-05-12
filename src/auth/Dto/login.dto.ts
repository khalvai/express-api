import Joi from 'joi';

export const LoginDto = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).max(15).required(),
});

export interface LoginData {
  email: string;
  password: string;
}
