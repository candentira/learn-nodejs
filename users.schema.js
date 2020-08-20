import { passwordValidation } from './validation';
import Joi from 'joi';

export const post = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required().custom(passwordValidation),
    age: Joi.number().min(4).max(120).required()
});

export const put = post.keys({ isDeleted: Joi.boolean().required() });
