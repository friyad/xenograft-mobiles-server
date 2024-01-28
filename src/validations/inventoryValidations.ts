import Joi from "joi";

export const smartPhoneValidation = Joi.object({
  name: Joi.string().max(200).required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  images: Joi.array().items(Joi.string()).required(),
  releasedDate: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  opSystem: Joi.string().required(),
  storageCapacityGB: Joi.array().items(Joi.number()).required(),
  ram: Joi.array().items(Joi.number()).required(),
  processor: Joi.string().required(),
  screenSize: Joi.number().required(),
  color: Joi.string().required(),
  cellularTechnology: Joi.string().required(),
  battery: Joi.number().required(),
  simCard: Joi.string().required(),
  camera: Joi.array().items(Joi.number()).required(),
  charger: Joi.number().required(),
  usbType: Joi.string().required(),
  aboutThisPhone: Joi.string().required(),
  condition: Joi.string().valid("New", "Used").required(),
  rating: Joi.number().required(),
  sells: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

export const spDeleteValidation = Joi.object({
  smartphones: Joi.array()
    .items(Joi.string())
    .required()
    .error(new Error("Please provide smartphone Ids")),
});
