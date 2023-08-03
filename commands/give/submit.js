const {
  decrementAvailableKudos,
  addKudo
} = require('../../datastore/service')

module.exports = async ({body, view, client, logger}) => {
  const senderId = body.user.id;
  const receiverId = view.state.values.receiver.receiver.selected_user;
  const message = view.state.values.message.message.value;
  const value = view.state.values.value.value.selected_option.value;
  const type = view.state.values.type.type.selected_option.value;
  const kudo = `:tada: Congrats <@${receiverId}>!!` +
    ` You just received kudos from <@${senderId}>!\n` +
    `>*Value displayed*: ${value} \n` +
    `>*Message*: ${message}`;


  try {
    const decrementKudosPromise = decrementAvailableKudos(senderId);
    const addKudoPromise = addKudo(receiverId, {
      message,
      sender_id: senderId,
      timestamp: new Date().toISOString(),
      value,
      type
    });
    const postPrivateMessagePromise = client.chat.postMessage({
      channel: receiverId,
      text: kudo
    })
    const promises = [
      decrementKudosPromise,
      addKudoPromise,
      postPrivateMessagePromise
    ];


    if (type === 'Public') {
      promises.push(client.chat.postMessage({
        channel: 'C05LAE04988',
        text: kudo
      }));
    }

    await Promise.all(promises);
  } catch (e) {
    logger.error(e);
  }
}
