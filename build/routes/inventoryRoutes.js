"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartphonesDatas = void 0;
const express_1 = __importDefault(require("express"));
const inventoriesController_1 = require("../controllers/inventoriesController");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const inventoryValidations_1 = require("../validations/inventoryValidations");
const inventoryRoutes = express_1.default.Router();
inventoryRoutes.get("/smartphones", inventoriesController_1.getSmartPhones);
inventoryRoutes.get("/smartphone/:id", inventoriesController_1.getSingleSmartPhone);
inventoryRoutes.put("/smartphone/:id", (0, validateRequest_1.default)(inventoryValidations_1.smartPhoneValidation), inventoriesController_1.updateSingleSmartPhone);
inventoryRoutes.post("/smartphone/duplicate/:id", (0, validateRequest_1.default)(inventoryValidations_1.smartPhoneValidation), inventoriesController_1.duplicateSmartPhone);
inventoryRoutes.post("/smartphone", (0, validateRequest_1.default)(inventoryValidations_1.smartPhoneValidation), inventoriesController_1.postSingleSmartPhone);
inventoryRoutes.delete("/smartphones", (0, validateRequest_1.default)(inventoryValidations_1.spDeleteValidation), inventoriesController_1.deleteSmartPhones);
exports.default = inventoryRoutes;
exports.smartphonesDatas = [
    {
        name: "Samsung Galaxy S20 Ultra",
        price: 999.99,
        quantity: 50,
        images: [
            "https://i.ibb.co/VpHJHHQ/612-Is-Cbjo5-L-AC-SX679.jpg",
            "https://i.ibb.co/gjPnXYd/31-Ng-JG-u9-GL-AC-SY741.jpg",
            "https://i.ibb.co/yNChCTc/51v-QHlx-Mb3-L-AC-SX679.jpg",
        ],
        releasedDate: new Date("2022-01-01"),
        brand: "Samsung",
        model: "S20 Ultra",
        opSystem: "Android",
        storageCapacityGB: [128, 256],
        ram: [12, 16],
        processor: "Octa-core (1x3.3 GHz Cortex-X4 & 5x3.2 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)",
        screenSize: 6.78,
        color: "Mystic Black",
        cellularTechnology: "4G",
        battery: 5000,
        simCard: "Nano",
        camera: [50, 12],
        charger: 65,
        usbType: "USB Type-C",
        aboutThisPhone: "High-end smartphone with advanced camera features.",
        condition: "New",
        rating: 4.8,
        sells: 20,
        inStock: true,
    },
    {
        name: "Galaxy S20",
        price: 799.99,
        quantity: 50,
        images: [
            "https://i.ibb.co/f9DhsT6/61-Uv-Osa00-TL-AC-SX679.jpg",
            "https://i.ibb.co/c8x1PhN/61y-XXlk-U9n-L-AC-SX679.jpg",
            "https://i.ibb.co/sm99rgG/41c-SFu-DAVAL-AC-SX679.jpg",
            "https://i.ibb.co/LZm29Z7/61-DWhogl5-AL-AC-SX679.jpg",
        ],
        releasedDate: new Date("2022-01-01"),
        brand: "Samsung",
        model: "S20",
        opSystem: "Android",
        storageCapacityGB: [128, 256],
        ram: [8, 12],
        processor: "Octa-core (2x2.73 GHz Mongoose M5 & 2x2.50 GHz Cortex-A76 & 4x2.0 GHz Cortex-A55)",
        screenSize: 6.2,
        color: "Blue",
        cellularTechnology: "4G",
        battery: 4000,
        simCard: "Nano",
        camera: [64, 12],
        charger: 25,
        usbType: "USB Type-C",
        aboutThisPhone: "Powerful flagship phone with a stunning display.",
        condition: "New",
        rating: 4.5,
        sells: 20,
        inStock: true,
    },
    {
        name: "iPhone 12",
        price: 899.99,
        quantity: 30,
        images: [
            "https://i.ibb.co/Vm0V1NQ/51f-YXSn-Su9-L-AC-SY741.jpg",
            "https://i.ibb.co/3pQs1ft/51d-RIf-Zd-Ps-L-AC-SX679.jpg",
            "https://i.ibb.co/DGy120V/51q-FTmwn-JUL-AC-SX679.jpg",
        ],
        releasedDate: new Date("2022-02-15"),
        brand: "Apple",
        model: "12",
        opSystem: "iOS",
        storageCapacityGB: [64, 128, 256],
        ram: [4, 6],
        processor: "Hexa-core (2x3.1 GHz Firestorm & 4x1.8 GHz Icestorm)",
        screenSize: 6.1,
        color: "Silver",
        cellularTechnology: "5G",
        battery: 2815,
        simCard: "Nano",
        camera: [12, 12],
        charger: 20,
        usbType: "Lightning",
        aboutThisPhone: "Sleek and powerful iPhone with a superior camera system.",
        condition: "New",
        rating: 4.8,
        sells: 25,
        inStock: true,
    },
    {
        name: "OnePlus 9",
        price: 749.99,
        quantity: 40,
        images: [
            "https://i.ibb.co/pdwzq6v/81-ZEdt-YBYf-L-AC-SX466.jpg",
            "https://i.ibb.co/mSNjJcM/71e7z4-Qnqr-L-AC-SY741.jpg",
            "https://i.ibb.co/D4rJtx0/41t-HEJ-Y0-ML-AC-SY741.jpg",
        ],
        releasedDate: new Date("2022-03-10"),
        brand: "OnePlus",
        model: "9",
        opSystem: "Android",
        storageCapacityGB: [128, 256],
        ram: [8, 12],
        processor: "Octa-core (1x3.2 GHz Kryo 585 & 3x2.42 GHz Kryo 585 & 4x1.8 GHz Kryo 585)",
        screenSize: 6.55,
        color: "Black",
        cellularTechnology: "5G",
        battery: 4500,
        simCard: "Nano",
        camera: [48, 50, 2],
        charger: 65,
        usbType: "USB Type-C",
        aboutThisPhone: "Flagship killer with top-notch performance and camera capabilities.",
        condition: "New",
        rating: 4.7,
        sells: 18,
        inStock: true,
    },
    {
        name: "Google Pixel 5",
        price: 699.99,
        quantity: 25,
        images: [
            "https://i.ibb.co/XkR0KTg/516wyv8w-YGL-AC-SX679.jpg",
            "https://i.ibb.co/SJ24f9G/51-Uo-Fh-Zh-m-L-AC-SX679.jpg",
            "https://i.ibb.co/vxG3THf/31f-Lj6j-U-TL-AC-SX679.jpg",
        ],
        releasedDate: new Date("2022-04-05"),
        brand: "Google",
        model: "Pixel 5",
        opSystem: "Android",
        storageCapacityGB: [128],
        ram: [8],
        processor: "Octa-core (1x2.4 GHz Kryo 475 Prime & 1x2.2 GHz Kryo 475 Gold & 6x1.8 GHz Kryo 475 Silver)",
        screenSize: 6.0,
        color: "Sorta Sage",
        cellularTechnology: "5G",
        battery: 4080,
        simCard: "eSIM",
        camera: [12.2, 16],
        charger: 18,
        usbType: "USB Type-C",
        aboutThisPhone: "Pure Android experience with an impressive camera system.",
        condition: "New",
        rating: 4.6,
        sells: 15,
        inStock: true,
    },
];
/*
if (!inventory) {
      res.status(500).json({
        status: false,
        message: "Failed to add your smartphone",
      });
      return;
    }
    // @ts-ignore
    inventory.smartPhones.push(smartphonesDatas[2]);
    await inventory.save();
 */
