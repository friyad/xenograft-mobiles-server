import { Response } from "express";
import { SellsModel } from "../models/sellsModel";
import { CRequest } from "../types/globalTypes";
import { InventoriesModel } from "../models/inventoryModels";

export const postSellNow = async (req: CRequest, res: Response) => {
  const user = req.user;
  const { buyerName, totalQuantity, saleDate, product } = req.body;

  try {
    const sellsCollection: any = await SellsModel.findOne({
      userID: user!._id,
    });
    const inventory: any = await InventoriesModel.findOne({
      userID: user!._id,
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
    await sellsCollection.save();

    // Check the current quantity of this product and delete this product
    // from user's inventory if current quantity reaches to 0 or < 0
    const currentQuantity = product.quantity - totalQuantity;
    if (currentQuantity <= 0) {
      const result: any = await InventoriesModel.updateOne(
        {
          userID: user!._id,
        },
        { $pull: { smartPhones: { _id: { $in: [product.prevID] } } } }
      );

      if (result.modifiedCount < 1) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!",
        });
        return;
      }
      // Otherwise update the current quantity of this product after sold
    } else {
      const updateProduct = {
        ...product,
        quantity: currentQuantity,
      };
      const result: any = await InventoriesModel.updateOne(
        {
          userID: user!._id,
          "smartPhones._id": product.prevID,
        },
        { $set: { "smartPhones.$": updateProduct } }
      );
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
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const getSelesHistory = async (req: CRequest, res: Response) => {
  const user = req.user;

  try {
    const sellsCollection: any = await SellsModel.findOne({
      userID: user!._id,
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
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};
