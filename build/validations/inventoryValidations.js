"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spDeleteValidation = exports.smartPhoneValidation = void 0;
const zod_1 = require("zod");
exports.smartPhoneValidation = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .min(10, "Must be at least 10 characters")
        .max(200, "Can't be more than 200 characters")
        .trim(),
    price: zod_1.z.coerce.number().min(1),
    quantity: zod_1.z.coerce.number().min(1),
    images: zod_1.z.array(zod_1.z.string().trim(), {
        required_error: "Please upload your images",
    }),
    releasedDate: zod_1.z.string(),
    brand: zod_1.z.string().min(2, "Must be at least 2 characters").trim(),
    model: zod_1.z.string().min(2, "Must be at least 2 characters").trim(),
    opSystem: zod_1.z.string().min(2, "Must be at least 2 characters").trim(),
    storageCapacityGB: zod_1.z.array(zod_1.z.coerce.number().min(1)),
    ram: zod_1.z.array(zod_1.z.coerce.number().min(1)),
    processor: zod_1.z.string().min(2, "Must be at least 2 characters").trim(),
    screenSize: zod_1.z.coerce.number().min(1),
    color: zod_1.z.string().min(2, "Must be at least 2 characters").trim(),
    cellularTechnology: zod_1.z
        .string()
        .min(2, "Must be at least 2 characters")
        .trim(),
    battery: zod_1.z.coerce.number().min(1),
    simCard: zod_1.z.string().min(2, "Must be at least 2 characters").trim(),
    camera: zod_1.z.array(zod_1.z.coerce.number().min(1)),
    charger: zod_1.z.coerce.number().min(1),
    usbType: zod_1.z.string().min(2, "Must be at least 2 characters").trim(),
    aboutThisPhone: zod_1.z.string().min(30, "Must be at least 30 characters"),
    condition: zod_1.z
        .string()
        .min(2, "Must be at least 2 characters")
        .includes("New")
        .or(zod_1.z.string().includes("Used")),
    rating: zod_1.z.coerce.number().min(0, "rating property is required"),
    sells: zod_1.z.coerce.number().min(0, "sells property is required"),
    inStock: zod_1.z.boolean({ required_error: "inStock property is required" }),
})
    .required();
exports.spDeleteValidation = zod_1.z
    .object({
    smartphones: zod_1.z.array(zod_1.z.string().trim(), {
        required_error: "Must need to provide smartphone ids",
    }),
})
    .required();
