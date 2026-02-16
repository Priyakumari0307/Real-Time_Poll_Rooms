import { io } from 'socket.io-client';

// Use environment variable for production, fallback to local for development
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
    autoConnect: true
});
