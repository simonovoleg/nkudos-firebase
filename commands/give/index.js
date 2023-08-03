const giveModal = require('./giveModal.json')

module.exports = async ({body, client, logger}) => {
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: giveModal
    });
  } catch (error) {
    logger.error(error);
  }
};
