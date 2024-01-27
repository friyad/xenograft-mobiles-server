import mongoose, { Schema } from "mongoose";

const smartPhoneSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  images: { type: [String], required: true },
  releasedDate: { type: Date, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  opSystem: { type: String, required: true },
  storageCapacityGB: { type: Number, required: true },
  ram: { type: Number, required: true },
  processor: { type: String, required: true },
  screenSize: { type: Number, required: true },
  color: { type: String, required: true },
  cellularTechnology: { type: String, required: true },
  battery: { type: Number, required: true },
  simCard: { type: String, required: true },
  camera: { type: [Number], required: true },
  charger: { type: Number, required: true },
  usbType: { type: String, required: true },
  aboutThisPhone: { type: String, required: true },
  condition: { type: String, enum: ["New", "Used"], required: true },

  rating: { type: Number, required: true },
  sells: { type: Number, required: true },
  isStock: { type: Boolean, required: true },
});

const inventorySchema: Schema = new mongoose.Schema({
  userID: String,
  smartPhones: [smartPhoneSchema],
});

export const InventoriesModel = mongoose.model("inventories", inventorySchema);
