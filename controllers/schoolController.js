import db from "../config/db.js";
import { calculateDistance } from "../utils/distance.js";
import { validationResult } from "express-validator";

export const addSchool = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, address, latitude, longitude } = req.body;

  const query =
    "INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)";

  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "School added successfully",
    });
  });
};

export const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  db.query("SELECT * FROM schools", (err, schools) => {
    if (err) {
      return res.status(500).json(err);
    }

    const sorted = schools
      .map((school) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude,
        );

        return { ...school, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  });
};
