# School Management API

A Node.js REST API built with Express and MySQL to manage schools and fetch schools based on proximity to a user's location.

## Features

- Add a new school
- List schools sorted by distance from user's location
- Input validation
- RESTful API design

## Tech Stack

- Node.js
- Express.js
- MySQL
- Railway (Database)
- Render (Deployment)
- Postman (API Testing)

## API Endpoints

### 1. Add School

POST `/addSchool` (also available as `/api/addSchool`)

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

GET `/listSchools?latitude=28.6&longitude=77.2` (also available as `/api/listSchools?...`)

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

## Installation

Clone the repository
git clone https://github.com/vicky-Github-1/School-management-API.git

Install dependencies
npm install

Create `.env` file
DB_HOST=your_host
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=railway
DB_PORT=your_port
PORT=5000

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
Database hosted on Railway

---

## Author

Shubham Gupta
