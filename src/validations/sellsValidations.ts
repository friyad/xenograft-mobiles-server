import Joi from "joi";
import { smartPhoneValidation } from "./inventoryValidations";

export const sellValidation = Joi.object({
  totalQuantity: Joi.number().required(),
  buyerName: Joi.string().required(),
  saleDate: Joi.string().required(),
  product: smartPhoneValidation,
});
