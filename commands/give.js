module.exports = async ({body, client, logger}) => {
  try {
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        callback_id: 'give_modal',
        title: {
          type: 'plain_text',
          text: 'Give Kudos!'
        },
        submit: {
          type: 'plain_text',
          text: 'Share!'
        },
        blocks: [
          {
            type: 'input',
            block_id: 'receiver',
            element: {
              type: 'users_select',
              action_id: 'receiver',
              placeholder: {
                type: 'plain_text',
                text: 'Select someone to celebrate!'
              }
            },
            label: {
              type: 'plain_text',
              text: 'Who do you want to send kudos to?'
            }
          },
          {
            type: 'input',
            block_id: 'message',
            element: {
              type: 'plain_text_input',
              action_id: 'message',
              multiline: true
            },
            label: {
              type: 'plain_text',
              text: 'Message',
              emoji: true
            }
          },
          {
            type: 'input',
            block_id: 'value',
            element: {
              type: 'static_select',
              action_id: 'value',
              placeholder: {
                type: 'plain_text',
                text: 'Select an value',
                emoji: true
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Hungry',
                    emoji: true
                  },
                  value: 'Hungry'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Innovative',
                    emoji: true
                  },
                  value: 'Innovative'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Vibrant',
                    emoji: true
                  },
                  value: 'Vibrant'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':tada: Empathetic',
                    emoji: true
                  },
                  value: ':tada: Empathetic'
                }
              ]
            },
            label: {
              type: 'plain_text',
              text: 'Who do you want to send kudos to?'
            }
          },
          {
            type: 'section',
            block_id: 'type',
            text: {
              type: 'mrkdwn',
              text: '*How would you like to send this kudo?*'
            },
            accessory: {
              type: 'radio_buttons',
              action_id: 'type',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Public',
                    emoji: true
                  },
                  value: 'public'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Private (sends through a DM)',
                    emoji: true
                  },
                  value: 'Private'
                }
              ]
            }
          }
        ],
        type: 'modal'
      }
    });
  } catch (error) {
    logger.error(error);
  }
};
