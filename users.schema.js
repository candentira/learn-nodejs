import { passwordValidation } from './validation';
import Joi from 'joi';

export default Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required().custom(passwordValidation),
    age: Joi.number().min(4).max(120).required(),
    isDeleted: Joi.boolean().required()
});
