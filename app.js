require('dotenv').config();
const commands = require('./commands');
const submitKudosModal = require('./commands/give/submit');
const {App} = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.command('/nkudos-th', async (slack) => {
  await slack.ack();

  let arg = slack.body.text;

  if (arg === 'g') arg = 'give'
  if (arg === 'b') arg = 'balance'
  if (arg === 'l') arg = 'leaderboard'
  if (arg === 'h') arg = 'help'

  const commandMethod = commands[arg || 'give'];

  if (commandMethod) await commands[arg || 'give'](slack);
  else slack.logger.info('Command not found');
});

app.view('give_modal', async (slack) => {
  await slack.ack();
  await submitKudosModal(slack);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log(`nKudos server is running on port ${process.env.PORT || 3000}`);
})();
