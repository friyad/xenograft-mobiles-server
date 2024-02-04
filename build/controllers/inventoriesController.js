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
exports.duplicateSmartPhone = exports.updateSingleSmartPhone = exports.deleteSmartPhones = exports.postSingleSmartPhone = exports.getSingleSmartPhone = exports.getSmartPhones = void 0;
const inventoryModels_1 = require("../models/inventoryModels");
const getSmartPhones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const inventory = yield inventoryModels_1.InventoriesModel.findOne({
            userID: user._id,
        });
        res.status(200).json({
            status: true,
            data: inventory === null || inventory === void 0 ? void 0 : inventory.smartPhones,
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
exports.getSmartPhones = getSmartPhones;
const getSingleSmartPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const id = req.params.id;
    try {
        const inventory = yield inventoryModels_1.InventoriesModel.findOne({
            userID: user._id,
        });
        if (!inventory) {
            res.status(400).json({
                status: false,
                message: "Failed to get your smartphone",
            });
            return;
        }
        const smartphone = yield inventory.smartPhones.id(id);
        if (!smartphone) {
            res.status(400).json({
                status: false,
                message: "Failed to get your smartphone",
            });
            return;
        }
        res.status(200).json({
            status: true,
            data: smartphone,
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
exports.getSingleSmartPhone = getSingleSmartPhone;
const postSingleSmartPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const smartphone = req.body;
    try {
        const inventory = yield inventoryModels_1.InventoriesModel.findOne({
            userID: user._id,
        });
        if (!inventory) {
            res.status(500).json({
                status: false,
                message: "Failed to add your smartphone",
            });
            return;
        }
        inventory.smartPhones.push(smartphone);
        yield inventory.save();
        res.status(200).json({
            status: true,
            message: "Smartphone added successfully!",
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
exports.postSingleSmartPhone = postSingleSmartPhone;
const deleteSmartPhones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const smartphoneIds = req.body.smartphones;
    try {
        const result = yield inventoryModels_1.InventoriesModel.updateOne({
            userID: user._id,
        }, { $pull: { smartPhones: { _id: { $in: smartphoneIds } } } });
        if (result.modifiedCount < 1) {
            res.status(400).json({
                status: false,
                message: "Failed to delete your smartphone",
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Deleted successfully!",
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
exports.deleteSmartPhones = deleteSmartPhones;
const updateSingleSmartPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const smartphone = req.body;
    const id = req.params.id;
    try {
        const result = yield inventoryModels_1.InventoriesModel.updateOne({
            userID: user._id,
            "smartPhones._id": id,
        }, { $set: { "smartPhones.$": smartphone } });
        if (result.modifiedCount < 1) {
            res.status(400).json({
                status: false,
                message: "Failed to update your smartphone",
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Smartphone updated successfully!",
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
exports.updateSingleSmartPhone = updateSingleSmartPhone;
const duplicateSmartPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const smartphone = req.body;
    const eixstId = req.params.id;
    try {
        const inventory = yield inventoryModels_1.InventoriesModel.findOne({
            userID: user._id,
        });
        if (!inventory) {
            res.status(500).json({
                status: false,
                message: "Failed to add your smartphone",
            });
            return;
        }
        const curtPhone = inventory.smartPhones.id(eixstId);
        inventory.smartPhones.splice(inventory.smartPhones.indexOf(curtPhone) + 1, 0, smartphone);
        yield inventory.save();
        res.status(200).json({
            status: true,
            message: "Smartphone Duplicated successfully!",
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
exports.duplicateSmartPhone = duplicateSmartPhone;
