require('dotenv').config();

const commands = require('./commands');

const {App} = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.command('/nkudos', async (slackData) => {
  await slackData.ack();

  const arg = slackData.body.text;
  const commandMethod = commands[arg || 'give'];

  if (commandMethod) await commands[arg || 'give'](slackData);
  else console.log('Command not found');
});

app.view('give_modal', async ({ack, view, logger}) => {
  await ack();
  // logger.info(view);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('nKudos server is running');
})();
