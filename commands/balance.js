module.exports = async ({body, client, logger}) => {
  try {
    const pointsLeft = 3;
    const pointsReceieved = 4;
    let message = '';
    message += 'Here is your nKudos Balance: \n' +
    `\n> Points to give:  ${pointsLeft}` +
    `\n> Points received: ${pointsReceieved}`;
    try {
      const result = await client.chat.postMessage({
        text: message,
        channel: 'C05JH69RX2A'
      });

      console.log('Message sent successfully:', result.ts);
    } catch (error) {
      logger.error(error);
    }
  } catch (error) {
    logger.error(error);
  }
};

