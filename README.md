# Learn with Jiji — Backend API

### VeidaLabs Software Developer Hiring Assignment

---

## 📌 Project Summary

This project implements a backend API for **Learn with Jiji — an AI Learning Companion**.
The service accepts a user learning query, searches stored learning resources, and returns a structured response containing an answer and related materials (PPT + Video).

The goal of this implementation is to demonstrate practical backend skills including:

* API design
* Supabase database usage
* Authentication
* Row Level Security (RLS)
* Secure configuration
* Clean project structure

No real AI is used — responses are mocked from stored learning content as required by the assignment.

---

## ⚙️ Tech Stack

* **Node.js**
* **Express.js**
* **Supabase**

  * PostgreSQL Database
  * Authentication (Email/Password)
  * Storage (learning resources)
* dotenv (environment config)

---

## ✅ Features Implemented

* User login using Supabase Auth
* Protected API endpoint with Bearer token
* Query validation
* Learning resource search from Supabase DB
* Structured JSON response for frontend
* Query logging per user
* Supabase Storage integration (PPT & Video links)
* Row Level Security (RLS) policies
* Secrets stored in environment variables
* Modular, industry-style folder structure
* Error handling for invalid requests

---

## 🧩 API Endpoints

Base path: `/api`

---

### 🔐 POST `/api/login`

Authenticates a user using Supabase Auth and returns an access token.

#### Request Body

```json
{
  "email": "test@example.com",
  "password": "test123456"
}
```

#### Success Response

```json
{
  "access_token": "jwt-token-here",
  "user": {
    "id": "user-uuid",
    "email": "test@example.com"
  }
}
```

This token must be used in protected endpoints.

---

### 🤖 POST `/api/ask-jiji`

Main learning query endpoint.
Returns answer + key points + learning resources.

**Authentication required**

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "query": "RAG"
}
```

#### Success Response

```json
{
  "answer": "Retrieval Augmented Generation (RAG) enhances AI models by retrieving external knowledge before generating responses.",
  "bullet_points": [
    "Fetches external knowledge",
    "Improves accuracy",
    "Reduces hallucinations"
  ],
  "resources": {
    "ppt": "https://storage-link",
    "video": "https://video-link"
  }
}
```

---

### ❤️ GET `/health`

Health check endpoint.

```json
{
  "status": "OK",
  "message": "Jiji API is running"
}
```

---

## 🗄️ Database Schema (Supabase)

### profiles

* id (uuid, primary key)
* email (text)

### resources

* id (uuid)
* topic (text)
* answer (text)
* key_points (text array)
* ppt_url (text)
* video_url (text)

### queries

* id (uuid)
* user_id (uuid)
* query (text)
* created_at (timestamp)

Schema SQL is included in:

```
schema.sql
```

---

## 📦 Supabase Storage

Bucket name: `learning`

Contains:

* Sample PPT file
* Sample video file

Public URLs are stored in the `resources` table and returned by the API.

---

## 🔒 Auth & Security

* Supabase Email/Password Auth enabled
* Bearer token required for protected routes
* Row Level Security (RLS) enabled
* Policies implemented:

**queries table**

* User can insert only their own queries

**resources table**

* Authenticated users can read resources

**profiles table**

* Users can read their own profile

* No secrets in source code

* `.env` used for Supabase keys

* `.env` excluded via `.gitignore`

---

## 🧱 Project Structure

```
src/
  config/        → Supabase client
  controllers/   → Route logic
  middleware/    → Auth middleware
  routes/        → Express routes
  services/      → DB operations
  app.js         → Express app setup

server.js        → Entry point
```

This structure keeps logic separated and maintainable.

---

## ▶️ How to Run Locally

### 1️⃣ Clone the repository

```
git clone <repo-url>
cd project-folder
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Create `.env`

```
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key
PORT=3000
```

### 4️⃣ Start server

```
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## 🧪 Testing Flow (Postman)

### Step 1 — Login

```
POST /api/login
```

Copy access_token from response.

---

### Step 2 — Ask Jiji

```
POST /api/ask-jiji
```

Header:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "query": "RAG"
}
```

---

## 🧠 Mock AI Behavior

This project intentionally uses stored content instead of live AI calls.
Responses are fetched from Supabase resources table to simulate AI output.

---

## 🚀 Possible Improvements (With More Time)

* Semantic search with embeddings
* Vector similarity matching
* Resource ranking
* Query analytics dashboard
* Rate limiting
* Caching layer
* API documentation with Swagger

---

## 👤 Author

**Piyush Bhakre**
VeidaLabs Software Developer Hiring Assignment
