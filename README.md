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

POST `/api/addSchool`

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

---

### 2. List Schools

GET `/api/listSchools?latitude=28.6&longitude=77.2`

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


Run server
npm run dev


---

## Deployment

Backend deployed on Render  
Database hosted on Railway

---

## Author

Shubham Gupta