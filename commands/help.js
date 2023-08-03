const { getUser } = require('../datastore/service');

module.exports = async ({body, client, logger}) => {
  try {
    let message = '';
      message += 'We are excited for you to use nKudos! Here are the possible commands: \n' +
      `\n> *give*: Open a form to recognize a peer for Living the Six` +
      `\n> *balance*: Check how many nKudos you can give this month, and how many you've received` +
      `\n> *leaderboard*: See which of your peers has received the most nKudos in each category`;
    try {
      await client.chat.postEphemeral({
        text: message,
        user: body.user_id,
        channel: body.channel_id
      });

    } catch (error) {
      logger.error(error);
    }

  } catch (error) {
    logger.error(error);
  }
};
