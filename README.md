# API Gateway

This service acts as an API Gateway for the BUXLO application. It's the single entry point for all client requests and routes them to the appropriate microservice. It also handles authentication and other cross-cutting concerns.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Running Tests](#running-tests)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

- Node.js (v18)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akhiln2003/Buxlo-api-gateway.git
   ```
2. Navigate to the `apiGateway` directory:
   ```bash
   cd Microservices/apiGateway
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the service in development mode, run:

```bash
npm start
```

This will start the server using `ts-node-dev`.

## Environment Variables

This service requires the following environment variables to be set. You can create a `.env` file in the root of the `apiGateway` directory and add the following:

| Variable                   | Description                                    | Default Value                      |
| -------------------------- | ---------------------------------------------- | ---------------------------------- |
| `PORT`                     | The port the service will run on.              | `4000`                             |
| `JWT_ACCESS_SECRET`        | The secret key for JWT access tokens.          | `Buxlo_JWT_ACCESS_SECRET`          |
| `FRONT_END_BASE_URL`       | The base URL of the frontend application.      | `http://localhost:5173`            |
| `AUTH_SERVICE_URL`         | The URL of the authentication service.         | `http://buxlo-auth:4001/api`       |
| `USER_SERVICE_URL`         | The URL of the user service.                   | `http://buxlo-user:4002/api`       |
| `PAYMENT_SERVICE_URL`      | The URL of the payment service.                | `http://buxlo-payment:4003/api`    |
| `CHAT_SERVICE_URL`         | The URL of the chat service.                   | `http://buxlo-chat:4004/api`       |
| `NOTIFICATION_SERVICE_URL` | The URL of the notification service.           | `http://buxlo-notification:4005/api` |
| `BOOKING_SERVICE_URL`      | The URL of the booking service.                | `http://buxlo-booking:4006/api`    |
| `ADV_SERVICE_URL`          | The URL of the advertisement service.          | `http://buxlo-adv:4007/api`        |


## API Routes

The API Gateway routes requests to the following microservices:

- **/api/auth**: Authentication Service
- **/api/users**: User Service
- **/api/payment**: Payment Service
- **/api/chat**: Chat Service
- **/api/notification**: Notification Service
- **/api/booking**: Booking Service
- **/api/adv**: Advertisement Service

<!-- ## Running Tests

There are no test scripts configured for this service yet. -->

## Deployment

This service can be containerized using Docker. A `Dockerfile` is provided in the root of the `apiGateway` directory.

To build the Docker image:

```bash
docker build -t api-gateway .
```

To run the Docker container:

```bash
docker run -p 4000:4000 api-gateway
```
