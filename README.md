# Real-Time Poll Rooms

A full-stack MERN application that allows users to create polls and see live, real-time results as people vote. Built with Socket.io for instant updates and JWT for secure authentication.

## Features

- **Real-Time Updates**: Uses WebSockets (Socket.io) to push vote updates to all connected clients instantly.
- **Secure Authentication**: Signup/Login system with JWT tokens and password hashing (bcrypt).
- **Anti-Abuse Mechanisms**: 
  - **UserID-based restriction**: One vote per registered user.
  - **IP-based restriction**: Prevents spamming from the same network.
  - **Rate Limiting**: Protects endpoints from automated flooding.
- **Dynamic Poll Creation**: Add up to 6 options per poll.
- **Live Result Bars**: Visual percentage-based feedback with smooth animations.
- **Shareable Links**: One-click "Copy to Clipboard" for easy sharing.

## Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Socket.io Client
- Axios & React Router

**Backend:**
- Node.js & Express
- MongoDB (Mongoose)
- Socket.io
- JWT (jsonwebtoken)
- Express Rate Limit

## Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB running locally or an Atlas URI

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## How it Works (Under the Hood)

1. **Socket Rooms**: When you view a poll, you are placed in a Socket.io "Room" specific to that `pollId`. When anyone in that room votes, the server emits an event only to that room.
2. **Persistence**: Every poll and vote is stored in MongoDB. The "Real-time" effect is a UI layer over a solid persistent database.
3. **Fairness**: The voting controller checks the `Vote` collection for an existing entry with the same `userId` OR `ipAddress` before allowing a new vote.

## License
MIT
