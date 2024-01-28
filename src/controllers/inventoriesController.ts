import { Response } from "express";
import { InventoriesModel } from "../models/inventoryModels";
import { CRequest } from "../types/globalTypes";
import {
  smartPhoneValidation,
  spDeleteValidation,
} from "../validations/inventoryValidations";

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

export const deleteSmartPhones = async (req: CRequest, res: Response) => {
  const user = req.user;
  const smartphoneIds = req.body.smartphones;

  try {
    const isValidte = spDeleteValidation.validate(req.body);
    if (isValidte.error) {
      throw new Error(isValidte.error.message);
    }

    const result: any = await InventoriesModel.updateOne(
      {
        userID: user!._id,
      },
      { $pull: { smartPhones: { _id: { $in: smartphoneIds } } } }
    );

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
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const updateSingleSmartPhone = async (req: CRequest, res: Response) => {
  const user = req.user;
  const smartphone = req.body;
  const id = req.params.id;

  try {
    const isValidte = smartPhoneValidation.validate(req.body);
    if (isValidte.error) {
      throw new Error(isValidte.error.message);
    }

    const result: any = await InventoriesModel.updateOne(
      {
        userID: user!._id,
        "smartPhones._id": id,
      },
      { $set: { "smartPhones.$": smartphone } }
    );

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
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const duplicateSmartPhone = async (req: CRequest, res: Response) => {
  const user = req.user;
  const smartphone = req.body;
  const eixstId = req.params.id;

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
    const curtPhone = inventory.smartPhones.id(eixstId);
    inventory.smartPhones.splice(
      inventory.smartPhones.indexOf(curtPhone) + 1,
      0,
      smartphone
    );
    await inventory.save();
    res.status(200).json({
      status: true,
      message: "Smartphone Duplicated successfully!",
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};
