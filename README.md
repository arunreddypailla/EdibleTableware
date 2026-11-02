# The Edible Cart

A creative eco tableware storefront inspired by Eco Eat, built with a React + TypeScript frontend and a Java Spring Boot backend for demo-ready ecommerce flows.

## Tech stack
- Frontend: React + TypeScript + Vite
- Backend: Java 17 + Spring Boot 3
- Database: H2 by default, with PostgreSQL/MySQL compatibility via environment variables

## Run locally

### 1. Start the backend
```bash
cd backend
mvn spring-boot:run
```

### 2. Start the frontend
```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Then open:
- Frontend: http://localhost:5173
- API: http://localhost:8081/api/products

## Database configuration
The backend supports real SQL databases using environment variables:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/ediblecart
export DB_DRIVER=org.postgresql.Driver
export DB_USERNAME=postgres
export DB_PASSWORD=postgres
export DB_DIALECT=org.hibernate.dialect.PostgreSQLDialect
export DDL_AUTO=update
```

or:

```bash
export DB_URL=jdbc:mysql://localhost:3306/ediblecart
export DB_DRIVER=com.mysql.cj.jdbc.Driver
export DB_USERNAME=root
export DB_PASSWORD=root
export DB_DIALECT=org.hibernate.dialect.MySQLDialect
export DDL_AUTO=update
```

## Product data source
All storefront products live in a single central file so they are easy to replace or extend:

- frontend/src/constants/products.ts

## Render deployment guide

### 1. Backend deployment on Render (Docker-based)
Because Render does not offer a native Java runtime option in the service creation UI, deploy the backend as a Docker service.

Create a new Web Service and connect your GitHub repository.

Use these settings:
- Root directory: `backend`
- Runtime: `Docker`
- Build command: leave empty
- Start command: leave empty

The backend includes a Dockerfile at `backend/Dockerfile` that builds the app automatically.

Set these environment variables in Render:
```bash
DB_URL=jdbc:postgresql://<host>:5432/<database>
DB_DRIVER=org.postgresql.Driver
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_DIALECT=org.hibernate.dialect.PostgreSQLDialect
DDL_AUTO=update
PORT=8080
```

Notes:
- Render automatically injects `$PORT`, and the app listens on that value.
- The backend is already configured to read these values from environment variables.
- For the free tier, use a free Render PostgreSQL database.

### 2. Frontend deployment on Render
Create a new Static Site and connect the same GitHub repo.

Use these settings:
- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `dist`

Set this environment variable:
```bash
VITE_API_URL=https://your-backend-name.onrender.com
```

### 3. PostgreSQL database on Render
Create a PostgreSQL database and copy the values into the backend environment variables.

Example:
```bash
DB_URL=jdbc:postgresql://dpg-abc123xyz.oregon-postgres.render.com:5432/ediblecart
DB_DRIVER=org.postgresql.Driver
DB_USERNAME=ediblecart_user
DB_PASSWORD=your-real-render-password
DB_DIALECT=org.hibernate.dialect.PostgreSQLDialect
DDL_AUTO=update
```

### 4. Live login and checkout flow
Once deployed, the app will work like this:
- Frontend loads and calls your backend URL via `VITE_API_URL`
- User signs up or logs in through the backend auth API
- Tokens are stored in browser localStorage
- Checkout sends order data to `/api/payments/checkout`
- Orders are saved in PostgreSQL

### 5. CORS for live production
The backend already allows Render/Vercel/Netlify origins in `CorsConfig`, including common `*.onrender.com` patterns.
