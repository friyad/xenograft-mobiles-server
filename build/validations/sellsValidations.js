"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellValidation = void 0;
const zod_1 = require("zod");
const inventoryValidations_1 = require("./inventoryValidations");
exports.sellValidation = zod_1.z
    .object({
    buyerName: zod_1.z
        .string()
        .min(2, "Must be at least 2 characters")
        .max(80, "Can't be more than 100 characters")
        .trim(),
    totalQuantity: zod_1.z.coerce.number().min(1),
    saleDate: zod_1.z.string(),
    product: inventoryValidations_1.smartPhoneValidation,
})
    .required();
