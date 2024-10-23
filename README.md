This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# contact-management

# Contact Management System

This is a comprehensive Contact Management System built with Next.js, featuring user authentication, advanced contact management capabilities, file handling, and data validation. The application allows users to register, log in, manage contacts, and perform bulk operations through CSV and Excel file uploads.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Running the Backend Server](#running-the-backend-server)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [File Handling](#file-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login using JWT.
- Email verification upon registration.
- Advanced contact management:
  - Add, retrieve, update, and delete contacts (soft delete).
  - Filter and sort contacts by various fields.
  - Batch processing for adding/updating multiple contacts.
- Robust data validation for user input.
- Timezone handling for contact timestamps.
- CSV and Excel file upload functionality for bulk contact operations.
- API rate limiting for sensitive endpoints.

## Technologies Used

- Next.js
- SQLite
- JWT (JSON Web Tokens)
- Bcrypt (for password hashing)
- Joi (for data validation)
- Multer (for file uploads)
- Moment-timezone (for date-time handling)

## Getting Started

To set up this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/contact-management-system.git
   cd contact-management-system


API Documentation:
  API endpoints are available under the /api path. You can use tools like Postman or Swagger for testing the API. Here are some key endpoints:

User Authentication:
  POST /api/auth/register - Register a new user.
  POST /api/auth/login - Log in a user.
  
Contacts Management:
  POST /api/contacts - Add a new contact.
  GET /api/contacts - Retrieve all contacts.
  PUT /api/contacts/:id - Update a contact by ID.
  DELETE /api/contacts/:id - Soft delete a contact by ID.

  
Database Setup:
  Database migrations can be handled manually or with a migration tool. Ensure the SQLite database is initialized with the required tables (users, contacts, etc.).

File Handling:
File Upload Functionality
  CSV/Excel Upload: Implemented for bulk contact creation and updates.
  Download Endpoint: Allows users to download all contacts in CSV/Excel format.
  
Testing:
To test the application, you can use Postman or write unit tests using Jest. Check if:
  User registration and login functionalities work as expected.
  Contact CRUD operations are functioning properly.
  File uploads parse and validate data correctly.
  
Test File Upload:
  Prepare a sample CSV/Excel file according to the specified format.
  Use the /api/contacts/upload endpoint to upload the file and check for successful parsing and validation messages.




