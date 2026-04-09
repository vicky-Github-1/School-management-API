import db from "../config/db.js";
import { calculateDistance } from "../utils/distance.js";
import { validationResult } from "express-validator";
import { redis } from "../config/redis.js";

// Controller to add a new school
export const addSchool = async (req, res) => {
  // Validate incoming request data
  const errors = validationResult(req);

  // If validation fails, return error response
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  // Extract data from request body
  const { name, address, latitude, longitude } = req.body;

  // SQL query to insert new school into database
  const query =
    "INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)";

  // Execute database query
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    // Handle database error
    if (err) {
      return res.status(500).json(err);
    }

    // Send success response
    res.json({
      message: "School added successfully",
    });
  });
};

// Controller to list schools sorted by distance
export const listSchools = async (req, res) => {
  // Validate query parameters
  const errors = validationResult(req);

  // If validation fails, return error response
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  // Extract latitude and longitude from query params
  const { latitude, longitude } = req.query;

  // Create a unique cache key based on location
  const cacheKey = `schools:${latitude}:${longitude}`;

  try {
    // Check if data exists in Redis
    const cachedData = await redis.get(cacheKey);

    // If cache hit, return cached response
    if (cachedData) {
      console.log("Cache HIT");
      return res.json(cachedData);
    }

    console.log("Cache MISS");

    // Fetch all schools from database
    db.query("SELECT * FROM schools", async (err, schools) => {
      // Handle database error
      if (err) {
        return res.status(500).json(err);
      }

      // Calculate distance for each school and sort them
      const sorted = schools
        .map((school) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            school.latitude,
            school.longitude
          );

          return { ...school, distance };
        })
        .sort((a, b) => a.distance - b.distance);

      // Store sorted result in Redis with expiration time (60 seconds)
      await redis.set(cacheKey, sorted, { ex: 60 });

      // Send sorted response
      res.json(sorted);
    });
  } catch (error) {
    // Handle Redis or server errors
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};