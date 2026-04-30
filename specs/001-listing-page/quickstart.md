# Quickstart: Listing Page

This document provides instructions for setting up and running the Listing Page feature locally.

## Prerequisites
- JDK 17+
- Node.js 18+
- PostgreSQL 14+

## Backend Setup (Spring Boot)
1. Navigate to `backend/`
2. Configure `src/main/resources/application.properties` with your local Postgres credentials.
3. Run `./mvnw spring-boot:run`
4. Verify API is running at `http://localhost:8080/lulu/pets`

## Frontend Setup (React)
1. Navigate to `frontend/`
2. Run `npm install`
3. Create a `.env` file with `VITE_API_BASE_URL=http://localhost:8080`
4. Run `npm run dev`
5. Open `http://localhost:5173` in your browser.

## Testing
- Backend: `./mvnw test`
- Frontend: `npm test`
