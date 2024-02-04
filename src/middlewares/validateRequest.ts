import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      return res.status(400).json({ status: false, error: error });
    }
  };

export default validateRequest;
