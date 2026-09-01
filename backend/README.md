# Card Validation API

A REST API that validates credit/debit card numbers using the Luhn algorithm, built with NestJS and TypeScript.

## Tech Stack

- Node.js
- TypeScript
- NestJS
- class-validator / class-transformer

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

Clone the repository:

git clone <your-repo-url>
cd card-validation-api

Install dependencies:

npm install

### Running the App

npm run start

The server will start at: http://localhost:3000

### Running Tests

npm run test

### Environment Variables

See `.env.example`:

- `PORT` — defaults to 3000 locally; Render provides this automatically in production.
- `CORS_ORIGIN` — comma-separated list of allowed origins. Leave unset to allow any origin. In production, set it to your Vercel frontend URL.

## Deploying to Render

A `render.yaml` blueprint is included at the root of this folder.

1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, point it at the repo. Render will detect `backend/render.yaml` (root directory `backend`) and create a web service with `npm install && npm run build` as the build command and `npm run start:prod` as the start command.
3. After the frontend is deployed to Vercel, set `CORS_ORIGIN` on the Render service to the Vercel URL and redeploy.

## API Reference

### POST /card/validate

Validates a card number using the Luhn algorithm.

**Request Body:**
```json
{
  "cardNumber": "4111111111111111"
}
```

**Success Response (200):**
```json
{
  "valid": true,
  "message": "Card number is valid"
}
```

**Failure Response (400 — bad input):**
```json
{
  "message": ["cardNumber should not be empty"],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Design Decisions

### Why NestJS?
NestJS enforces a clean, modular structure out of the box — separating controllers, services, and modules. This makes the codebase easy to scale and maintain.

### Why is cardNumber a string and not a number?
Card numbers can have leading zeros and are never used mathematically. Treating them as strings avoids data loss and is more accurate to real-world usage.

### Why the Luhn algorithm?
The Luhn algorithm is the industry-standard checksum formula used by all major card networks (Visa, Mastercard, Amex) to validate card numbers. It catches typos and invalid numbers without needing a database lookup.

### Why whitelist: true on ValidationPipe?
It strips any extra fields the client sends that are not defined in the DTO, preventing unexpected data from reaching the service layer.

### Error Handling
- Missing or empty input returns 400 with a descriptive message
- Non-numeric characters are caught in the service layer
- Card numbers outside the valid length range (13–19 digits) are rejected

### Why `strict: true`?
The spec requires it. `tsconfig.json` previously had strict mode effectively disabled via individual overrides (`noImplicitAny: false`, `strictBindCallApply: false`, no top-level `strict`), which doesn't satisfy that requirement. It's now `"strict": true` with no overrides. The one place this mattered in practice: `ValidateCardDto.cardNumber` had no initializer, which fails under `strictPropertyInitialization`; it now uses a definite assignment assertion (`cardNumber!: string`) since class-validator populates it at runtime, not in a constructor.

### Why were `AppController`/`AppService` removed?
They were unused leftovers from the Nest CLI scaffold — never registered in `AppModule` (which only imports `CardModule`), so the `GET /` "Hello World" route they defined was dead code. Their presence was also actively breaking the e2e test, which booted the real `AppModule` and asserted on a route that no longer existed. Removed the dead files and rewrote `test/card.e2e-spec.ts` to exercise the actual `/card/validate` endpoint instead.