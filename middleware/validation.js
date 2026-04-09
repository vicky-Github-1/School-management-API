import { body, query } from "express-validator";

export const schoolValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 })
    .withMessage("Name must be at most 255 characters"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ max: 500 })
    .withMessage("Address must be at most 500 characters"),

  body("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a number between -90 and 90")
    .toFloat(),

  body("longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a number between -180 and 180")
    .toFloat(),
];

export const listSchoolsQueryValidation = [
  query("latitude")
    .notEmpty()
    .withMessage("latitude query param is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("latitude must be between -90 and 90")
    .toFloat(),
  query("longitude")
    .notEmpty()
    .withMessage("longitude query param is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("longitude must be between -180 and 180")
    .toFloat(),
];
