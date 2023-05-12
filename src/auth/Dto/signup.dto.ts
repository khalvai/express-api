import Joi from 'joi';

export const SignUpDto = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).max(15).required(),
  phone: Joi.string(),
});
export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}
