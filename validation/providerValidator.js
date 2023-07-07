import Joi from "joi";

export function validateCreateOffer(body) {
    const offerValidationSchema = Joi.object({
        userId: Joi.string().required().messages({
          'any.required': 'The userId field is required.',
          'string.base': 'The userId must be a string.',
        }),
        title: Joi.string().required().messages({
          'any.required': 'The title field is required.',
          'string.base': 'The title must be a string.',
        }),
        description: Joi.string().required().messages({
          'any.required': 'The description field is required.',
          'string.base': 'The description must be a string.',
        }),
        type: Joi.string().required().messages({
          'any.required': 'The type field is required.',
          'string.base': 'The type must be a string.',
        }),
        hourRate: Joi.string().required().messages({
          'any.required': 'The hourRate field is required.',
          'string.base': 'The hourRate must be a string.',
        }),
      });
      return offerValidationSchema.validate(body);

}
 