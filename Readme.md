# MERN Stack Booking Application

Welcome to the MERN stack booking application! This application allows users to book hotels and rooms, featuring a complete authentication system and more features currently in progress.

## Tech Stack

- **TypeScript**
- **TailwindCSS**
- **React**
- **Node.js**
- **Express**
- **MongoDB**
- **React Hook Form**
- **React Query**
- **Stripe Payment**
- **Cloudinary**
- **End-to-End Testing**

## Features

- Full Authentication
- Additional features are in progress...

## Setup Configuration

Follow these steps to set up and run the project locally:

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Clone the Repository

```bash
git clone git@github.com:rohitbisht01/mern-booking-application.git
cd mern-booking-app
```

Navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Navigate to the backend directory:

```bash
cd backend
npm install
npm run dev
```

#### Environment Variables

Create a .env file in the backend directory and add the following environment variables:

```bash
PORT=your_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Replace your_mongodb_connection_string, your_jwt_secret_key, your_port, your_stripe_secret_key, your_cloudinary_cloud_name, your_cloudinary_api_key, and your_cloudinary_api_secret with your actual values.

### Running End-to-End Tests

To run the end-to-end tests, follow the setup instructions and then use the appropriate testing commands defined in your testing framework.
