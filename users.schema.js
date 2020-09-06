import { passwordValidation } from './validation';
import Joi from 'joi';

export const userCreateSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required().custom(passwordValidation),
    age: Joi.number().min(4).max(120).required()
});

export const userUpdateSchema = userCreateSchema.keys({ isDeleted: Joi.boolean().required() });
