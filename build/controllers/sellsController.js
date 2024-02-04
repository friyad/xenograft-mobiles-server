"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelesHistory = exports.postSellNow = void 0;
const sellsModel_1 = require("../models/sellsModel");
const inventoryModels_1 = require("../models/inventoryModels");
const postSellNow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { buyerName, totalQuantity, saleDate, product } = req.body;
    try {
        const sellsCollection = yield sellsModel_1.SellsModel.findOne({
            userID: user._id,
        });
        const inventory = yield inventoryModels_1.InventoriesModel.findOne({
            userID: user._id,
        });
        // If these two collections not found then return an error message
        if (!sellsCollection || !inventory) {
            res.status(500).json({
                status: false,
                message: "Failed to sell your smartphone",
            });
            return;
        }
        // If Seles quantity exceed the available products amount
        if (totalQuantity > product.quantity) {
            res.status(400).json({
                status: false,
                message: `Quantity cannot exceed the available products: ${product.quantity}`,
            });
            return;
        }
        // If everything is OK then save this product to sales data
        const newSell = {
            buyerName,
            totalQuantity,
            saleDate,
            product,
        };
        sellsCollection.sellsData.push(newSell);
        yield sellsCollection.save();
        // Check the current quantity of this product and delete this product
        // from user's inventory if current quantity reaches to 0 or < 0
        const currentQuantity = product.quantity - totalQuantity;
        if (currentQuantity <= 0) {
            const result = yield inventoryModels_1.InventoriesModel.updateOne({
                userID: user._id,
            }, { $pull: { smartPhones: { _id: { $in: [product.prevID] } } } });
            if (result.modifiedCount < 1) {
                res.status(500).json({
                    status: false,
                    message: "Something went wrong!",
                });
                return;
            }
            // Otherwise update the current quantity of this product after sold
        }
        else {
            const updateProduct = Object.assign(Object.assign({}, product), { quantity: currentQuantity });
            const result = yield inventoryModels_1.InventoriesModel.updateOne({
                userID: user._id,
                "smartPhones._id": product.prevID,
            }, { $set: { "smartPhones.$": updateProduct } });
            if (result.modifiedCount < 1) {
                res.status(500).json({
                    status: false,
                    message: "Something went wrong!",
                });
                return;
            }
        }
        res.status(200).json({
            status: true,
            message: `Smartphone sold successfully to ${buyerName}`,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
exports.postSellNow = postSellNow;
const getSelesHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const sellsCollection = yield sellsModel_1.SellsModel.findOne({
            userID: user._id,
        });
        if (!sellsCollection) {
            res.status(500).json({
                status: false,
                message: "Failed to load your seles history",
            });
            return;
        }
        res.status(200).json({
            status: true,
            data: sellsCollection.sellsData,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
exports.getSelesHistory = getSelesHistory;
