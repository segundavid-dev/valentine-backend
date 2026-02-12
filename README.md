# Valentine Backend

A TypeScript-based Express backend with MongoDB for generating and retrieving Valentine messages.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env` and update the values.
   ```bash
   cp .env.example .env
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Routes

- `POST /api/messages`: Create a new Valentine message.
- `GET /api/messages/:shortId`: Retrieve a message by its short ID.
