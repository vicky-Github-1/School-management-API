# School Management API

A Node.js REST API built with Express and MySQL to manage schools and fetch schools based on proximity to a user's location. The API also includes caching using Redis and rate limiting for better performance and security.

## Features

- Add a new school
- List schools sorted by distance from user's location
- Input validation
- Redis caching for faster responses
- Global rate limiting to prevent abuse
- RESTful API design

## Tech Stack

- Node.js
- Express.js
- MySQL
- Redis (Upstash)
- Render (Deployment)
- Postman (API Testing)

## API Endpoints

### 1. Add School

POST `/addSchool`

Request Body:

{
"name": "ABC School",
"address": "Delhi",
"latitude": 28.7041,
"longitude": 77.1025
}

Response:

{
"message": "School added successfully"
}

Validation rules:

- `name`: required, non-empty, max 255 chars
- `address`: required, non-empty, max 500 chars
- `latitude`: required, float between -90 and 90
- `longitude`: required, float between -180 and 180

---

### 2. List Schools

GET `/listSchools?latitude=28.6&longitude=77.2`

Response:

[
{
"id": 1,
"name": "ABC School",
"address": "Delhi",
"latitude": 28.7041,
"longitude": 77.1025,
"distance": 12.4
}
]

Query validation:

- `latitude`: required, float between -90 and 90
- `longitude`: required, float between -180 and 180

---

## Performance Optimizations

### Redis Caching

- The `/listSchools` endpoint uses Redis to cache results based on latitude and longitude
- Cached responses are returned instantly without hitting the database
- Cache expires automatically after 60 seconds (TTL)
- Reduces database load and improves response time

### Rate Limiting

- Global rate limiting is applied to all API routes
- Prevents excessive requests and protects the server from abuse
- Ensures fair usage of the API

---

## Installation

Clone the repository  
git clone https://github.com/vicky-Github-1/School-management-API.git

Install dependencies  
npm install

Create `.env` file  

DB_HOST=your_host  
DB_USER=root  
DB_PASSWORD=your_password  
DB_NAME=your_db  
DB_PORT=your_port  
PORT=5000  

# Upstash Redis Config
UPSTASH_REDIS_REST_URL=your_url  
UPSTASH_REDIS_REST_TOKEN=your_token  

Create table in MySQL  
Run the SQL from `schema.sql`, or execute:

CREATE TABLE IF NOT EXISTS schools (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
address VARCHAR(500) NOT NULL,
latitude FLOAT NOT NULL,
longitude FLOAT NOT NULL
);

Run server  
npm run dev

---

## Deployment

Backend deployed on Render   
Redis hosted on Upstash

---

## Author

Shubham Gupta
