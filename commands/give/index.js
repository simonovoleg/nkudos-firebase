const {getUser} = require('../../datastore/service')
const giveModal = require('./giveModal.json')

module.exports = async ({body, client, logger}) => {
  try {
    const user = await getUser(body.user_id);

    if (user.nkudos_to_give > 0) {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: giveModal
      });
    } else {
      await client.chat.postEphemeral({
        text: "Unfortunately, you don't have any kudos. Please check back at the beginning of the month.",
        user: body.user_id,
        channel: body.channel_id
      })
    }
  } catch (error) {
    logger.error(error);
  }
};
