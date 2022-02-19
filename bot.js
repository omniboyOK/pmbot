import TelegramBot from 'node-telegram-bot-api';
import _ from 'lodash';
import os from 'os';
import { LogError, LogDiscord } from './debugger.js';

const HOSTNAME = os.hostname();

const TOKEN = process.env.BOT_TOKEN;
// Words that will trigger the responses
const TRIGGERS = ['projecto', 'tarea', 'card', 'integraciones'];

export default function initBot(messages) {
  LogDiscord(`Iniciando Bot in ${HOSTNAME}`);

  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(TOKEN, { polling: true });

  // Set response for command start
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      'Hola, te vas a conectar a la daily? \nApreta start para comenzar',
    );
  });

  // Set response for command start
  bot.onText(/\/play/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      'Hola, te vas a conectar a la daily? \nApreta start para comenzar',
    );
  });

  // Set response for command Acamica
  bot.on('message', (msg) => {
    const consejo = _.sample(messages);
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const user = msg.from.first_name;
    let ready = false;
    // Set response if trigger word is named
    TRIGGERS.forEach((word) => {
      if (msg.text && msg.text.toLowerCase().includes(word) && !ready) {
        // send a recomendation
        bot.sendMessage(chatId, `<code>${consejo}</code>`, {
          parse_mode: 'HTML',
          reply_to_message_id: messageId,
          disable_notification: true,
        });
        ready = true;
      }
    });
    if (msg.text && msg.text.toLowerCase().endsWith('hola') && !ready) {
      // reply to 'hi' message in silence
      bot.sendMessage(chatId, `<code>Buenas ${user} </code>`, {
        parse_mode: 'HTML',
        disable_notification: true,
        reply_to_message_id: messageId,
      });
    }
  });

  // for debugging errors
  bot.on('webhook_error', (error) => {
    LogError(error.code);
  });
}
