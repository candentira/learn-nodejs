import { StatusCodes } from 'http-status-codes';

const errorResponse = schemaErrors => {
    const errors = schemaErrors.map(({ path, message }) => ({ path, message }));
    return { errors };
};

export const passwordValidation = (value, helpers) => {
    if (!/.*[a-zA-Z].*/.test(value) || !/.*\d.*/.test(value)) {
        return helpers.message({ custom: 'Password must contain both letters and numbers' });
    }
    return value;
};

export const validateSchema = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false
        });
        if (error && error.isJoi) {
            res.status(StatusCodes.BAD_REQUEST).json(errorResponse(error.details));
            return;
        }
        next();
    };
};
