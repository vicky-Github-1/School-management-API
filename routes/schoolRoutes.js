import express from "express";

import { addSchool, listSchools } from "../controllers/schoolController.js";

import { schoolValidation } from "../middleware/validation.js";

const router = express.Router();

router.post("/addSchool", schoolValidation, addSchool);
router.get("/listSchools", listSchools);

export default router;
