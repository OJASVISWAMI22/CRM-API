# CRM API - Lead Management System

A robust backend API service for a mock CRM application that manages leads with CRUD operations and features an AI-powered lead scoring system.

## Features

- **Complete Lead Management**: Full CRUD operations for lead data
- **AI-Powered Lead Scoring**: Intelligent scoring system to prioritize leads
- **RESTful API Architecture**: Well-designed endpoints following REST principles
- **Robust Data Validation**: Input validation to ensure data integrity
- **Comprehensive Error Handling**: User-friendly error responses
- **PostgreSQL Integration**: Reliable and scalable data storage
- **API Documentation**: Complete Postman collection for easy testing

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Unique IDs**: UUID for secure identification
- **Documentation**: Postman Collection

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OJASVISWAMI22/CRM-API.git
   cd CRM-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   
   Create a PostgreSQL database:
   ```bash
   psql -U postgres
   postgres=# CREATE DATABASE crm_db;
   postgres=# \q
   ```
   
   The application will automatically create the necessary tables on startup, or you can run:
   ```bash
   npm run migrate
   ```

4. **Environment Configuration**
   
   Copy the example environment file and update with your details:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your PostgreSQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=crm_db
   PORT=5000
   ```

5. **Start the server**
   
   For production:
   ```bash
   npm start
   ```
   
   For development with automatic restart:
   ```bash
   npm run dev
   ```
   
   The server will start running at `http://localhost:5000`.

## API Endpoints

### Leads

#### Create a lead
```
POST /leads
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "status": "new"
}
```

#### Get all leads
```
GET /leads
```

#### Get lead by ID
```
GET /leads/:id
```

#### Update lead
```
PUT /leads/:id
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "status": "contacted"
}
```

#### Delete lead
```
DELETE /leads/:id
```

#### Score lead
```
POST /leads/:id/score
```
**Response:**
```json
{
  "lead_id": "abc123",
  "score": 86
}
```

## Lead Status Values

The lead status can be one of the following values:
- `new`: Lead has been created but no action taken
- `contacted`: Lead has been contacted
- `converted`: Lead has been successfully converted to a customer

## API Documentation

A comprehensive Postman collection is available for testing and documentation. Import the `CRM_API.postman_collection.json` file into Postman to get started quickly.

## Project Structure

```
├── config/             # Configuration files
├── controllers/        # Request handlers
├── models/             # Database models
├── routes/             # API routes
├── services/           # Business logic
├── utils/              # Utility functions
├── middleware/         # Express middleware
├── .env.example        # Example environment variables
├── package.json        # Project dependencies
└── server.js           # Application entry point
```

## License

ISC

## Author

**Ojasvi Swami**

- GitHub: [OJASVISWAMI22](https://github.com/OJASVISWAMI22)
- LinkedIn: [Ojasvi Swami](https://www.linkedin.com/in/ojasvi-swami-704359253/)


