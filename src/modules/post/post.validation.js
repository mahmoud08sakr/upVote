import Joi from "joi";


export const createPostValidation = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    isPublished: Joi.boolean().truthy('true').falsy('false').default(false),
    image: Joi.string().optional(),
});


export const updatePostValidation = Joi.object({
    title: Joi.string().optional(),
    body: Joi.string().optional(),
    image: Joi.string().optional(),
});
