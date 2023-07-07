import Joi from "joi";


export function validateRegister(body) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(24).required()
      .messages({
        'string.base': 'Full name should be a string',
        'string.empty': 'Full name cannot be empty',
        'string.min': 'Full name should have a minimum length of {#limit}',
        'string.max': 'Full name should have a maximum length of {#limit}',
        'any.required': 'Full name is required',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),
    phoneNumber: Joi.string().min(8).required()
      .messages({
        'string.base': 'Phone number should be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.min': 'Phone number should have a minimum length of {#limit}',
        'any.required': 'Phone number is required',
      }),
    password: Joi.string().min(8).max(20).required()
      .messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should have a minimum length of {#limit}',
        'string.max': 'Password should have a maximum length of {#limit}',
        'any.required': 'Password is required',
      }),
   
    isServiceProvider: Joi.bool().required()
      .messages({
        'boolean.base': 'isServiceProvider should be a boolean',
        'any.required': 'isServiceProvider is required',
      }),
  });
  return schema.validate(body);
}

export function validateLogin(body) {
    const schema = Joi.object({
      email: Joi.string().email().required()
        .messages({
          'string.base': 'Email should be a string',
          'string.empty': 'Email cannot be empty',
          'string.email': 'Invalid email format',
          'any.required': 'Email is required',
        }),
      password: Joi.string().min(8).max(20).required()
        .messages({
          'string.base': 'Password should be a string',
          'string.empty': 'Password cannot be empty',
          'string.min': 'Password should have a minimum length of {#limit}',
          'string.max': 'Password should have a maximum length of {#limit}',
          'any.required': 'Password is required',
        }),
    });
    return schema.validate(body);
  }



export function validateCreateReservation(body) {
  const schema = Joi.object({
    idApartment: Joi.number().integer().required(),
    idEvent: Joi.number().integer().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    numberPerson: Joi.number().integer().required(),
    type: Joi.number().integer().required(),
  });
  return schema.validate(body);
}

export function validatecreatePayment(body) {
  const schema = Joi.object({
    idReservation: Joi.number().integer().required(),
    amount: Joi.number().required(),
    typePayment: Joi.number().integer().required(),
    status:Joi.number().integer().required(),
    errorMessage: Joi.string(),
  });
  return schema.validate(body);
}

export function validateAddFavorite(body) {
  const schema = Joi.object({
    idApartment: Joi.number().integer().required(),
  });
  return schema.validate(body);
}

export function validateCreateComment(body) {
  const schema = Joi.object({
    logementId: Joi.number().integer(),
    rating: Joi.number().integer().required(),
    comment: Joi.string().required(),
  });
  return schema.validate(body);
}





