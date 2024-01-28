import { Response } from "express";
import { SellsModel } from "../models/sellsModel";
import { CRequest } from "../types/globalTypes";
import { sellValidation } from "../validations/sellsValidations";

export const postSellNow = async (req: CRequest, res: Response) => {
  const user = req.user;
  const smartphone = req.body;

  try {
    const isValidte = sellValidation.validate(req.body);
    if (isValidte.error) {
      throw new Error(isValidte.error.message);
    }

    const sellsCollection: any = await SellsModel.findOne({
      userID: user!._id,
    });

    if (!sellsCollection) {
      res.status(500).json({
        status: false,
        message: "Failed to sell your smartphone",
      });
      return;
    }
    sellsCollection.sellsData.push(smartphone);
    await sellsCollection.save();

    res.status(200).json({
      status: true,
      message: "Smartphone sold successfully!",
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};
