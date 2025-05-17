CRM API - Lead Management System
A simple backend API service for a mock CRM application to manage Leads, with basic CRUD operations and a lead scoring endpoint.
Features

CRUD operations for Leads (Create, Read, Update, Delete)
Lead scoring endpoint (mock AI implementation)
RESTful API design
PostgreSQL database integration
Error handling and validation
API documentation

Tech Stack

Node.js with Express
PostgreSQL database
UUID for unique IDs
Docker support (optional)

Prerequisites

Node.js (v12 or higher)
PostgreSQL (v10 or higher)
npm or yarn

Installation and Setup
1. Clone the repository
bashgit clone <repository-url>
cd crm_api
2. Install dependencies
bashnpm install
3. Database Setup
Create a PostgreSQL database:
bashpsql -U postgres
postgres=# CREATE DATABASE crm_db;
postgres=# \q
Run the schema.sql file to create the necessary tables:
bashpsql -U postgres -d crm_db -f schema.sql
4. Environment Configuration
Copy the .env.example file to .env and update the values:
bashcp .env.example .env
Update the .env file with your PostgreSQL credentials.
5. Start the server
bashnpm run start
For development with automatic restart:
bashnpm run dev
The server will start running at http://localhost:3000.
API Endpoints
Leads

Create a lead:

POST /leads
Body: { "name": "John Doe", "email": "john@example.com", "company": "Acme Inc", "status": "new" }


Get all leads:

GET /leads


Get lead by ID:

GET /leads/:id


Update lead:

PUT /leads/:id
Body: { "name": "John Doe", "email": "john@example.com", "company": "Acme Inc", "status": "contacted" }


Delete lead:

DELETE /leads/:id


Score lead:

POST /leads/:id/score
Response: { "lead_id": "abc123", "score": 86 }



API Documentation
A Postman collection is available for testing and documentation. Import the CRM_API.postman_collection.json file into Postman.
Running with Docker (Optional)
Build and run with Docker Compose
bashdocker-compose up --build
License
ISC
Author

Ojasvi Swami