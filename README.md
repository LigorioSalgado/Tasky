### README.md

# Fullstack Project with React, Next.js, FastAPI, Graphene, and DynamoDB

## Overview

This project is a fullstack application using modern technologies. The frontend is built with React and Next.js, while the backend is powered by FastAPI and Graphene for GraphQL. DynamoDB is used as the database. The project is containerized using Docker and managed with Docker Compose.

## Technologies Used

- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS

- **Backend**:
  - FastAPI
  - Graphene (GraphQL)
  - PynamoDB (DynamoDB ORM)
  - DynamoDB Local (for local development)

- **Containerization**:
  - Docker
  - Docker Compose

## Future Improvements

- Integration of Redux for state management in the frontend.
- Server-side authentication and authorization.
- Enhanced testing and CI/CD setup.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### Step 2: Setup Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
AWS_REGION=us-west-2
DYNAMODB_HOST=http://dynamodb-local:8000
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
BACKEND_URL=http://my-backend-app:8080
```

### Step 3: Build and Run the Containers

Use Docker Compose to build and run the containers:

```bash
docker-compose up --build
```

This command will start the following services:
- **DynamoDB Local**: Running on port 8000.
- **Backend (FastAPI)**: Running on port 8080.
- **Frontend (Next.js)**: Running on port 3000.

### Step 4: Access the Application

- **Frontend**: Open your browser and navigate to `http://localhost:3000`.
- **Backend Health Check**: Navigate to `http://localhost:8080/health`.
- **GraphQL Playground**: Navigate to `http://localhost:8080/graphql`.

## Directory Structure

```plaintext
.
├── backend
│   ├── __pycache__
│   ├── models
│   ├── schemas
│   │   ├── tests
│   │   ├── __init__.py
│   │   ├── ProjectSchema.py
│   ├── __init__.py
│   ├── create_table.py
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── frontend
│   ├── .next
│   ├── node_modules
│   ├── public
│   ├── src
│   ├── .env.local
│   ├── .eslintrc.json
│   ├── babel.config.js
│   ├── codegen.yml
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── jest.setup.js
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tailwind.config.ts
│   └── tsconfig.json
```

## Backend Development

### Creating DynamoDB Tables

The backend includes a script `create_table.py` to create the necessary DynamoDB tables. This script is run automatically when the backend container starts.

### Running Backend Tests

To run tests for the backend, navigate to the backend directory and run:

```bash
pytest
```

## Frontend Development

### Starting the Frontend Locally

To start the frontend locally for development purposes:

```bash
cd frontend
npm install
npm run dev
```

### Running Frontend Tests

To run tests for the frontend:

```bash
cd frontend
npm run test
```