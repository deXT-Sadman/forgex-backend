# Forgex Backend

Minimal Node.js + Express backend for the Forgex application.

It provides authentication, user profile management, and task CRUD APIs backed by MongoDB.

## Requirements

- Node.js 24+
- MongoDB database

## Environment Variables

Create a `.env` file with:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_at_least_32_characters
```

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Or start production mode with:

```bash
npm start
```

## API Routes

- `GET /api/health` - health check
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forget-password`
- `GET /api/users/me` - requires `Authorization: Bearer <token>`
- `PATCH /api/users/me` - requires `Authorization: Bearer <token>`
- `GET /api/tasks` - requires `Authorization: Bearer <token>`
- `POST /api/tasks` - requires `Authorization: Bearer <token>`
- `GET /api/tasks/:id` - requires `Authorization: Bearer <token>`
- `PUT /api/tasks/:id` - requires `Authorization: Bearer <token>`
- `DELETE /api/tasks/:id` - requires `Authorization: Bearer <token>`
