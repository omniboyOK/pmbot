/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
import fetch from 'node-fetch';

const COLORS = {
  error: 16711680,
  info: 3367935,
  warning: 16734720,
};

const makeContent = (msg, color = 3367935) =>
  JSON.stringify({
    embeds: [
      {
        title: 'PM Bot',
        description: msg,
        color,
      },
    ],
  });

export function LogError(log) {
  if (process.env.NODE_ENV) {
    fetch(process.env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: makeContent(log, COLORS.error),
    }).catch((error) => console.error(error));
  } else {
    console.error(log);
  }
}

export function LogDiscord(log) {
  if (process.env.NODE_ENV) {
    fetch(process.env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: makeContent(log, COLORS.info),
    }).catch((error) => console.error(error));
  } else {
    console.log(log);
  }
}

export function LogWarning(log) {
  if (process.env.NODE_ENV) {
    fetch(process.env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: makeContent(log, COLORS.warning),
    }).catch((error) => console.error(error));
  } else {
    console.log(log);
  }
}
