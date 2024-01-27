import { Response } from "express";
import { InventoriesModel } from "../models/inventoryModels";
import { CRequest } from "../types/globalTypes";
import { smartPhoneValidation } from "../validations/inventoryValidations";

export const getSmartPhones = async (req: CRequest, res: Response) => {
  const user = req.user;

  try {
    const inventory = await InventoriesModel.findOne({
      userID: user!._id,
    });

    res.status(200).json({
      status: true,
      data: inventory?.smartPhones,
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const getSingleSmartPhone = async (req: CRequest, res: Response) => {
  const user = req.user;
  const id = req.params.id;

  try {
    const inventory: any = await InventoriesModel.findOne({
      userID: user!._id,
    });
    if (!inventory) {
      res.status(400).json({
        status: false,
        message: "Failed to get your smartphone",
      });
      return;
    }

    const smartphone = await inventory.smartPhones.id(id);
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
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const postSingleSmartPhone = async (req: CRequest, res: Response) => {
  const user = req.user;
  const smartphone = req.body;

  try {
    const isValidte = smartPhoneValidation.validate(req.body);
    if (isValidte.error) {
      throw new Error(isValidte.error.message);
    }

    const inventory: any = await InventoriesModel.findOne({
      userID: user!._id,
    });

    if (!inventory) {
      res.status(500).json({
        status: false,
        message: "Failed to add your smartphone",
      });
      return;
    }
    inventory.smartPhones.push(smartphone);
    await inventory.save();

    res.status(200).json({
      status: true,
      message: "Smartphone added successfully!",
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};
