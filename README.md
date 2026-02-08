# Learn with Jiji — Backend API (VeidaLabs Hiring Assignment)

## Overview

This project implements a simple backend service for **Learn with Jiji — The AI Learning Companion**.
It provides an API endpoint that accepts a user query, retrieves matching learning resources from Supabase, and returns a structured response with answer text and resource links.

This implementation focuses on backend fundamentals, Supabase integration, API design, validation, and basic security practices.

---

## Tech Stack

* Node.js
* Express.js
* Supabase

  * Database
  * Auth (enabled)
  * Storage (PPT & Video links)

---

## Features Implemented

* POST API endpoint to accept user query
* Query validation
* Resource lookup from Supabase database
* Structured JSON response
* Supabase Storage integration for PPT & Video links
* Row Level Security (RLS) enabled
* Environment variables used for secrets
* Basic error handling

---

## API Endpoint

### POST `/ask-jiji`

Accepts a learning query and returns answer + resources.

### Request Body

```json
{
  "query": "Explain RAG"
}
```

### Success Response

```json
{
  "answer": "RAG stands for Retrieval Augmented Generation...",
  "resources": {
    "ppt": "https://...",
    "video": "https://..."
  }
}
```

### Error Response

```json
{
  "error": "Invalid query"
}
```

---

## Database Schema (Supabase)

### profiles

* id (uuid, primary key)
* email (text)

### resources

* id (uuid, primary key)
* topic (text)
* answer (text)
* ppt_url (text)
* video_url (text)

### queries

* id (uuid, primary key)
* user_id (uuid)
* query (text)
* created_at (timestamp)

Schema SQL file is included in the repo as:

```
schema.sql
```

---

## Supabase Storage

Bucket: `learning`

Contains:

* Sample PPT file
* Sample video file (or placeholder)

Public URLs are stored in the `resources` table.

---

## Auth & Security

* Supabase Auth is enabled (email auth)
* Row Level Security (RLS) enabled on tables
* Example policy: users can insert only their own queries
* No secrets stored in source code
* Supabase keys stored in `.env`
* `.env` is excluded via `.gitignore`

---

## How to Run Locally

### 1. Clone repo

```
git clone <your-repo-link>
cd project-folder
```

### 2. Install dependencies

```
npm install
```

### 3. Create environment file

Create `.env`

```
SUPABASE_URL=your_url
SUPABASE_KEY=your_anon_key
PORT=3000
```

### 4. Start server

```
node server.js
```

Server runs at:

```
http://localhost:3000
```

---

## Testing the API

Use Postman or curl:

```
POST http://localhost:3000/ask-jiji
```

Body:

```json
{
  "query": "RAG"
}
```

---

## Mock AI Behavior

This assignment uses mocked answer text stored in the database.
No external AI or internet content is used, as per assignment requirements.

---

## One Improvement With More Time

With more time, I would add:

* Semantic search using embeddings
* Query logging + analytics
* JWT-based user auth in API layer
* Better topic matching with keyword scoring
* Multiple resource ranking

---

## Author

Piyush Bhakre
VeidaLabs Software Developer Hiring Assignment
