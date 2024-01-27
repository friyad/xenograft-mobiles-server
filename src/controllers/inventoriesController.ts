import { Response } from "express";
import { InventoriesModel } from "../models/inventoryModels";
import { CRequest } from "../types/globalTypes";

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
