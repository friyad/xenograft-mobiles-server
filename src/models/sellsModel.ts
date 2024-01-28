import mongoose, { Schema } from "mongoose";
import { smartPhoneSchema } from "./inventoryModels";

const sellSchema: Schema = new Schema({
  totalQuantity: { type: Number, required: true },
  buyerName: { type: String, required: true },
  saleDate: { type: String, required: true },
  product: smartPhoneSchema,
});

export const sellsSchema: Schema = new mongoose.Schema({
  userID: String,
  sellsData: [sellSchema],
});

export const SellsModel = mongoose.model("sells", sellsSchema);
