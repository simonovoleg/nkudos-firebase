require('dotenv').config();

const commands = require('./commands');
const {getUsers, getUser} = require('./service');

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
  else slackData.logger.info('Command not found');
});

app.view('give_modal', async ({ack, body, view, client, logger}) => {
  await ack();

  // const users = await getUsers()
  // console.log(users)
  // const user = await getUser('D05KDGZ25LY')
  // console.log(body.user.id, user)

  const senderId = body.user.id;
  const receiverId = view.state.values.receiver.receiver.selected_user;
  const message = view.state.values.message.message.value;
  const value = view.state.values.value.value.selected_option.value;
  const type = view.state.values.type.type.selected_option.value;
  const channel = type === 'public' ? 'C05LAE04988' : receiverId;
  const kudo = `:tada: Congrats <@${receiverId}>!!` +
    ` You just received kudos from <@${senderId}>!\n` +
    `>*Value displayed*: ${value} \n` +
    `>*Message*: ${message}`;

  try {
    await client.chat.postMessage({
      channel,
      text: kudo
    });
  } catch (e) {
    logger.error(e);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log(`nKudos server is running on port ${process.env.PORT || 3000}`);
})();
