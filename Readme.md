# XenoGraft Mobiles Server

\
[Live Server Demo Link](https://xenograft-mobiles-server.vercel.app/)\
\
\
![Server Home Page](https://github.com/friyad/xenograft-mobiles-server/assets/86700138/6ca4f625-c74e-40f0-882a-60a0ac6bd70d)


## Description

XenoGraft Mobiles Server is the backend component of the smartphone management dashboard, responsible for managing, selling, and tracking the sales of smartphones. It handles authentication, CRUD operations, sales management, and more.

## Features

### 1. Authentication

- Secure authentication using JWT.
- User Registration and Login.
- Single user role for managing the system.

### 2. Smartphone Management

#### CRUD Operations

- Add, delete, update smartphone details.
- Duplicate & Edit / Create Variant from existing smartphones.
- Supply smartphone list to view from the inventory.

### 3. Sales Management

- Handle smartphone sales.
- Update the inventory upon a successful sale.

### 4. Express Server Features

- Secured with Helmet for enhanced security.
- CORS enabled for cross-origin resource sharing.
- Cookie parsing for handling cookies.
- Use of bcrypt for password hashing.
- Dotenv for environment variable management.

### 5. Request Validation

- Input validation using Zod for enhanced security.

## Technologies

- Express.js
- TypeScript
- MongoDB with Mongoose
- Bcrypt
- Helmet
- JWT (JSON Web Tokens)
- Zod for validation
- Dotenv

## Dependencies

- List of dependencies mentioned in `package.json`.

## Setup

1. Clone the repository.

```
git clone <repo_url>
```

2. Run this command to install dependencies.

```
npm install
```

3. Use scripts mentioned above for various tasks.
