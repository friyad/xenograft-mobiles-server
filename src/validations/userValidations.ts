import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,15}$"),
      "1 small letter, 1 capital letter, length must be 8, length can't me more than 15"
    )
    .required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,15}$"),
      "1 small letter, 1 capital letter, length must be 8, length can't me more than 15"
    )
    .required(),
});
