const { getUser } = require('../datastore/service');

module.exports = async ({body, client, logger}) => {
  try {
    let user = await getUser(body.user_id)
    let message = '';
    message += 'Here is your nKudos Balance: \n' +
    `\n> Points to give:  ${ user.nkudos_to_give }` +
    `\n> Points received: ${ user.nkudos_balance }`;
    try {
      const result = await client.chat.postMessage({
        text: message,
        channel: 'C05KBKTQU95'
      });

      console.log('Message sent successfully:', result.ts);
    } catch (error) {
      logger.error(error);
    }
  } catch (error) {
    logger.error(error);
  }
};
