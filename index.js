require("dotenv").config();
const _ = require("lodash");
// stored messages that can be send by the bot
let data = require("./messages.json");
const consejos = data.mensajes;
const TelegramBot = require("node-telegram-bot-api");
var CronJob = require("cron").CronJob;

const SILENT_MESSAGE = {
  parse_mode: "HTML",
  disable_notification: true,
};

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Words that will trigger the responses
const triggers = ["projecto", "tarea", "card", "integraciones"];

// Set response for command start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Hola, te vas a conectar a la daily? \nApreta start para comenzar"
  );
});

// Set response for command start
bot.onText(/\/play/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Hola, te vas a conectar a la daily? \nApreta start para comenzar"
  );
});

// Set response for command Acamica
bot.on("message", (msg) => {
  let consejo = _.sample(consejos);
  let chatId = msg.chat.id;
  let messageId = msg.message_id;
  let user = msg.from.first_name;
  let ready = false;
  // Set response if trigger word is named
  triggers.forEach((word) => {
    if (msg.text && msg.text.toLowerCase().includes(word) && !ready) {
      // send a recomendation
      bot.sendMessage(chatId, "<code>" + consejo + "</code> \u{1F916}", {
        parse_mode: "HTML",
        reply_to_message_id: messageId,
        disable_notification: true,
      });
      ready = true;
    }
  });
  if (msg.text && msg.text.toLowerCase().endsWith("hola") && !ready) {
    // reply to 'hi' message in silence
    bot.sendMessage(chatId, `<code>Buenas ${user} </code> \u{1F4BB}`, {
      parse_mode: "HTML",
      disable_notification: true,
      reply_to_message_id: messageId,
    });
  }
});

// for debugging errors
bot.on("webhook_error", (error) => {
  console.log(error.code); // => 'EPARSE'
});

var job = new CronJob(
  "30 9 * * 1-5",
  function () {
    bot.sendMessage(
      process.env.MY_GROUP,
      "<code>Hola, se van a conectar a la daily? </code> \u{1f412}",
      SILENT_MESSAGE
    );
  },
  null,
  true,
  "America/Argentina/Buenos_Aires"
);

var job = new CronJob(
  "30 18 * * 1-5",
  function () {
    bot.sendMessage(
      process.env.MY_GROUP,
      "<code>Hola, no se olviden de cerrar las cards, como vienen con eso? </code> \u{1f412}",
      SILENT_MESSAGE
    );
  },
  null,
  true,
  "America/Argentina/Buenos_Aires"
);

job.start();