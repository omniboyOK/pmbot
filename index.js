import { readFile } from 'fs/promises';
import initBot from './bot.js';

// stored messages that can be send by the bot
const data = JSON.parse(await readFile(new URL('./messages.json', import.meta.url)));
const MESSAGES = data.mensajes;

initBot(MESSAGES);
