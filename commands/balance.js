const { getUser } = require('../datastore/service');

module.exports = async ({body, client, logger}) => {
  try {
    // get info on current user
    let user = await getUser(body.user_id)
    console.log(body)
    // build the message
    let message = '';
    if (user) {
      message += 'Here is your nKudos Balance: \n' +
      `\n> Points to give:  ${ user.nkudos_to_give }` +
      `\n> Points received: ${ user.nkudos_balance }`;
    } else {
      message += 'Here is your nKudos Balance: \n' +
      `\n> Points to give:  5` +
      `\n> Points received: 0`;    
    }
    // try sending the message
    try {
      // in the channel they are in but only visable to them
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
