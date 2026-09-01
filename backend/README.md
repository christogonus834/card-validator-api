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