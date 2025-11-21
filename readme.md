<div align="center">
<h1>CourseStore Backend</h1>
<p>Modular Node.js / Express backend for a course marketplace with versioned APIs, JWT auth, MongoDB (Mongoose), Cloudinary media, and clean MVC/service architecture.</p>
</div>

## Table of Contents
1. Overview
2. Features
3. Tech Stack
4. Architecture & Folder Structure
5. Environment Variables
6. Installation & Development
7. API Routes (v1)
8. Response Pattern & Errors
9. Security Considerations
10. Conventions (Commits & Naming)
11. Roadmap / Future Improvements
12. License / Usage

## 1. Overview
This backend powers a course marketplace, separating concerns into controllers, services, models, middlewares, and utilities. It supports versioned routing (`/api/v1`, `/api/v2`), role‑based admin actions for managing courses, and secure JWT-based authentication with refresh/access token rotation.

## 2. Features
- API Versioning: Mounts `v1` and `v2` namespaces for evolvability.
- Authentication: Register, login, logout, access token refresh, password reset.
- Role-Based Course Management (Admin): Create, update, delete, preview courses.
- User Browsing (User): List all courses, view single course, (placeholder) purchase flow.
- File Uploads: Image upload for course creation/update (Multer + Cloudinary).
- Central Error Handling: Custom `AppError` and structured JSON responses.
- Input Validation: Zod-based validators for auth and course endpoints.
- Rate Limiting & Secure Cookies: Mitigates brute force and secures tokens.

## 3. Tech Stack
| Layer        | Tech / Library                  |
|--------------|----------------------------------|
| Runtime      | Node.js (ES Modules)             |
| Web Framework| Express 5.x                      |
| Database     | MongoDB + Mongoose               |
| Auth         | JWT (access + refresh), bcrypt   |
| Uploads      | Multer + Cloudinary              |
| Validation   | Zod                              |
| Utilities    | http-status-codes, cookie-parser |

## 4. Architecture & Folder Structure
```
src/
	config/          # ENV loading & configuration
	controller/      # Route handlers (auth, admin, user)
	middlewares/     # Auth, validation, error handler, etc.
	models/          # Mongoose schemas (user, course, purchase, cart*)
	routes/          # Versioned routers (index, v1/, v2/, router/)
		v1/            # Assembles routers for version 1
		v2/            # Future / experimental endpoints
	service/         # Business logic (auth, course, user, cloudinary)
	utils/           # Helpers (token generation, response, errors)
	db.js            # Database connection bootstrap
	index.js         # Express app setup & server start
```
`cart.model.js` may be removed/refactored if embedded in user documents (pending changes). Purchase flow now implemented with duplicate purchase protection (consider changing route to POST).

## 5. Environment Variables
Create a `.env` file at the project root:
```
PORT=3000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/dbname
JWT_SECRET=supersecretjwtkey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
Node 20+ `process.loadEnvFile()` is used; if using earlier versions, switch to `dotenv`.

## 6. Installation & Development
```powershell
# Clone
git clone https://github.com/anas18x/courseStore-backend.git
cd courseStore-backend

# Install dependencies
npm install

# Add .env file (see section 5)
notepad .env

# Start dev server (nodemon)
npm run dev

# Or production start
npm start
```
Server listens on `PORT` and mounts API under `/api` (e.g. `/api/v1/auth/login`).

## 7. API Routes (v1)
Assuming base path: `/api/v1`

### Auth
| Method | Endpoint            | Description                   |
|--------|---------------------|-------------------------------|
| POST   | /auth/register      | Create new user               |
| POST   | /auth/login         | Login, sets access & refresh cookies |
| POST   | /auth/logout        | Clear auth cookies            |
| POST   | /auth/refresh-token | Issue new access token        |
| POST   | /auth/reset-password| Reset password (auth required)|

### Admin (requires JWT & role/admin validation)
| Method | Endpoint                     | Description               |
|--------|------------------------------|---------------------------|
| GET    | /admin/preview-all-courses   | List all courses          |
| GET    | /admin/preview-course/:id    | Get single course         |
| POST   | /admin/add-course            | Create course (image required) |
| PUT    | /admin/update-course/:id     | Update course (optional new image) |
| DELETE | /admin/delete-course/:id     | Delete course             |

### User
| Method | Endpoint                         | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| GET    | /user/my-courses                 | List enrolled/purchased courses             |
| GET    | /user/get-all-courses            | List all courses (public browsing)          |
| POST   | /user/get-course/:courseId       | Fetch single course by id (returns details) |
| POST   | /user/purchase-course/:courseId  | Purchase a course (creates purchase record) |

> NOTE: Consider renaming to more RESTful forms: `GET /user/courses`, `GET /user/courses/:courseId`, `POST /user/courses/:courseId/purchase`.

## 8. Response Pattern & Errors
All successful responses use `SuccessResponse(res, data, message, statusCode)` producing a JSON shape similar to:
```json
{
	"success": true,
	"message": "course fetched successfully",
	"data": { "course": { /* ... */ } }
}
```
Errors use `AppError` and either the global error middleware or direct `ErrorResponse`, typically:
```json
{
	"success": false,
	"message": "course not found"
}
```
Standard HTTP status codes come from `http-status-codes` for consistency.

## 9. Security Considerations
- HTTP-only cookies for `accessToken` and `refreshToken` to mitigate XSS theft.
- `sameSite="Strict"` reduces CSRF risk; consider adding CSRF tokens for state-changing POSTs.
- Rate limiting via `express-rate-limit` prevents brute force credential stuffing.
- Passwords hashed with bcrypt (cost factor 5 currently—consider raising to 10+ for production).
- Refresh token rotation supported; ensure invalidation strategy if storing tokens server-side (future enhancement).

## 10. Conventions (Commits & Naming)
Conventional Commit prefixes recommended:
```
feat(controller): implement admin course CRUD
docs(controller): add JSDoc for auth handlers
refactor(service): rename cloudinary service & centralize upload
fix(routes): correct Router import and HTTP verb for purchase
chore(models): remove deprecated cart model
```
File naming: `*.controller.js`, `*.service.js`, `*.model.js`. Barrel exports via `index.js` for grouped imports.

## 11. Roadmap / Future Improvements
- Complete user course purchase (POST endpoint + transaction logic).
- Implement cart or wishlist as embedded doc vs separate collection.
- Add OpenAPI / Swagger documentation under `/api/docs`.
- Unit & integration tests (Jest / Supertest) for controllers and services.
- Add role enforcement middleware (admin vs user) beyond basic Auth.
- Enhance Cloudinary service (delete old images on update, transformations).
- Add metrics / logging (Winston + Prometheus).
- Implement email notifications (verification, password reset flow).
- Payment integration (Stripe) & order lifecycle.

## 12. License / Usage
Currently no explicit license specified (default: All rights reserved). Add a license file (MIT/Apache) if open-sourcing.

## Quick Start Snippet
```js
// src/index.js (excerpt)
import express from 'express';
import router from './routes/index.js';
const app = express();
app.use('/api', router);
app.listen(process.env.PORT || 3000);
```

