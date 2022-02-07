import { io } from 'socket.io-client';
import { SERVER } from '../constants/server';

export const socket = io(SERVER);
