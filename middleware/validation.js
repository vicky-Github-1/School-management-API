import { body } from "express-validator";

export const schoolValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("address").notEmpty().withMessage("Address is required"),

  body("latitude").isFloat().withMessage("Latitude must be a number"),

  body("longitude").isFloat().withMessage("Longitude must be a number"),
];
