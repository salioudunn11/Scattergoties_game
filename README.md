# Scattergories Game API

A small REST API for a Scattergories-style game, built with **Express 5**, **Prisma 6**, and **PostgreSQL**.
You create a game room (which is assigned a random letter and category), then submit answers that must
start with that letter.

## Team
- Devonte Allen
- Muhammad Usman
- Mamadou Dunn

## Requirements
- **Node.js** 18 or newer
- **Yarn 4** (managed by Corepack, which ships with Node) — enable it once with `corepack enable`
- **PostgreSQL** 14 or newer, running locally

## Setup

1. **Install dependencies**
   ```bash
   corepack enable
   yarn install
   ```

2. **Create your environment file**
   Copy the example and fill in your database connection:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and set `DATABASE_URL` to point at your PostgreSQL database.

3. **Create the database** (once), for example:
   ```bash
   createdb scattergories
   ```

4. **Generate the Prisma client and run migrations**
   ```bash
   yarn prisma generate
   yarn prisma migrate deploy
   ```

## Running the app
```bash
yarn start
```
The server starts on `http://localhost:8080` (or the `PORT` set in `.env`).

For development with auto-restart on file changes:
```bash
yarn dev
```

## API Endpoints

### `POST /games`
Create a new game room. A random letter and category are assigned.

Request body:
```json
{ "roomCode": "ROOM1" }
```
Response `201`:
```json
{ "roomCode": "ROOM1", "letters": "N", "category": "Animals" }
```

### `GET /games`
List all games.

Response `200`:
```json
[{ "roomCode": "ROOM1", "letters": "N", "category": "Animals" }]
```

### `POST /answers`
Submit an answer to a game. The answer text must start with the game's letter.

Request body:
```json
{ "roomCode": "ROOM1", "username": "alice", "text": "Nash" }
```
Response `201`:
```json
{ "accepted": true }
```

### Status codes
| Code | Meaning |
|------|---------|
| `201` | Created successfully |
| `400` | Invalid or missing input |
| `404` | Game / route not found |
| `409` | Duplicate room code or answer |

## Project structure
```
srcs/
  server.js      # starts the HTTP server
  index.js       # builds the Express app and mounts routers
  games.js       # /games routes
  answers.js     # /answers routes
  game_info.js   # letter pool, category list, random picker
  db.js          # shared Prisma client
prisma/
  schema.prisma  # database models (Game, Answer)
  migrations/    # database migrations
```
