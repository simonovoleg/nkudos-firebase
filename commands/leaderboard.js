const {getUsers} = require('../datastore/service')

module.exports = async ({body, client, logger}) => {
  try {
    const users = await getUsers();
    console.log(users);

    users.forEach(function (user) {
      var x = user.nkudos_received;
      console.log(x);
    });
    
    try {
      const result = await client.chat.postMessage({
        text: 'Hello world',
        channel: 'C05LWDZV83S'
      });

      console.log('Message sent successfully:', result.ts);
    } catch (error) {
      logger.error(error);
    }
  } catch (error) {
    logger.error(error);
  }
};