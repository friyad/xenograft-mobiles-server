import { z } from "zod";

export const smartPhoneValidation = z
  .object({
    name: z
      .string()
      .min(10, "Must be at least 10 characters")
      .max(200, "Can't be more than 200 characters")
      .trim(),
    price: z.coerce.number().min(1),
    quantity: z.coerce.number().min(1),
    images: z.array(z.string().trim(), {
      required_error: "Please upload your images",
    }),
    releasedDate: z.string(),
    brand: z.string().min(2, "Must be at least 2 characters").trim(),
    model: z.string().min(2, "Must be at least 2 characters").trim(),
    opSystem: z.string().min(2, "Must be at least 2 characters").trim(),
    storageCapacityGB: z.array(z.coerce.number().min(1)),
    ram: z.array(z.coerce.number().min(1)),
    processor: z.string().min(2, "Must be at least 2 characters").trim(),
    screenSize: z.coerce.number().min(1),
    color: z.string().min(2, "Must be at least 2 characters").trim(),
    cellularTechnology: z
      .string()
      .min(2, "Must be at least 2 characters")
      .trim(),
    battery: z.coerce.number().min(1),
    simCard: z.string().min(2, "Must be at least 2 characters").trim(),
    camera: z.array(z.coerce.number().min(1)),
    charger: z.coerce.number().min(1),
    usbType: z.string().min(2, "Must be at least 2 characters").trim(),
    aboutThisPhone: z.string().min(30, "Must be at least 30 characters"),
    condition: z
      .string()
      .min(2, "Must be at least 2 characters")
      .includes("New")
      .or(z.string().includes("Used")),
    rating: z.coerce.number().min(0, "rating property is required"),
    sells: z.coerce.number().min(0, "sells property is required"),
    inStock: z.boolean({ required_error: "inStock property is required" }),
  })
  .required();

export const spDeleteValidation = z
  .object({
    smartphones: z.array(z.string().trim(), {
      required_error: "Must need to provide smartphone ids",
    }),
  })
  .required();
