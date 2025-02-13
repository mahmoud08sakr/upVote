import Joi from 'joi';

export const validation = (schema) => {
    return (req, res, next) => {
        if (!Joi.isSchema(schema)) {
            return res.status(500).json({ message: 'Invalid schema provided' });
        }
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};
