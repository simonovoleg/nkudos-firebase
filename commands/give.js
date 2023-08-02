module.exports = async ({body, client, logger}) => {
  try {
    await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        'callback_id': 'give_modal',
        'title': {
          'type': 'plain_text',
          'text': 'Give Kudos!'
        },
        'submit': {
          'type': 'plain_text',
          'text': 'Share!'
        },
        'blocks': [
          {
            'type': 'input',
            'element': {
              'type': 'users_select',
              'action_id': 'title',
              'placeholder': {
                'type': 'plain_text',
                'text': 'Select someone to celebrate!'
              }
            },
            'label': {
              'type': 'plain_text',
              'text': 'Who do you want to send kudos to?'
            }
          },
          {
            'type': 'input',
            'element': {
              'type': 'plain_text_input',
              'multiline': true,
              'action_id': 'plain_text_input-action'
            },
            'label': {
              'type': 'plain_text',
              'text': 'Message',
              'emoji': true
            }
          },
          {
            'type': 'input',
            'element': {
              'type': 'static_select',
              'placeholder': {
                'type': 'plain_text',
                'text': 'Select an value',
                'emoji': true
              },
              'options': [
                {
                  'text': {
                    'type': 'plain_text',
                    'text': 'Hungry',
                    'emoji': true
                  },
                  'value': 'hungry'
                },
                {
                  'text': {
                    'type': 'plain_text',
                    'text': 'Innovative',
                    'emoji': true
                  },
                  'value': 'innovative'
                },
                {
                  'text': {
                    'type': 'plain_text',
                    'text': 'Vibrant',
                    'emoji': true
                  },
                  'value': 'vibrant'
                },
                {
                  'text': {
                    'type': 'plain_text',
                    'text': 'Empathetic',
                    'emoji': true
                  },
                  'value': 'empathetic'
                }
              ],
              'action_id': 'static_select-action'
            },
            'label': {
              'type': 'plain_text',
              'text': 'Who do you want to send kudos to?'
            }
          },
          {
            'type': 'section',
            'text': {
              'type': 'mrkdwn',
              'text': '*How would you like to send this kudo?*'
            },
            'accessory': {
              'type': 'radio_buttons',
              'options': [
                {
                  'text': {
                    'type': 'plain_text',
                    'text': 'Public',
                    'emoji': true
                  },
                  'value': 'public'
                },
                {
                  'text': {
                    'type': 'plain_text',
                    'text': 'Private (sends through a DM)',
                    'emoji': true
                  },
                  'value': 'Private'
                }
              ],
              'action_id': 'radio_buttons-action'
            }
          }
        ],
        'type': 'modal'
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

// try {
//   await client.views.open({
//     // Pass a valid trigger_id within 3 seconds of receiving it
//     trigger_id: body.trigger_id,
//     // View payload
//     view: {
//       'callback_id': 'give_modal',
//       'title': {
//         'type': 'plain_text',
//         'text': 'Give Kudos!'
//       },
//       'submit': {
//         'type': 'plain_text',
//         'text': 'Share!'
//       },
//       'blocks': [
//         {
//           'type': 'input',
//           'element': {
//             'type': 'users_select',
//             'action_id': 'title',
//             'placeholder': {
//               'type': 'plain_text',
//               'text': 'Select someone to celebrate!'
//             }
//           },
//           'label': {
//             'type': 'plain_text',
//             'text': 'Who do you want to send kudos to?'
//           }
//         },
//         {
//           'type': 'input',
//           'element': {
//             'type': 'plain_text_input',
//             'multiline': true,
//             'action_id': 'plain_text_input-action'
//           },
//           'label': {
//             'type': 'plain_text',
//             'text': 'Message',
//             'emoji': true
//           }
//         },
//         {
//           'type': 'input',
//           'element': {
//             'type': 'static_select',
//             'placeholder': {
//               'type': 'plain_text',
//               'text': 'Select an value',
//               'emoji': true
//             },
//             'options': [
//               {
//                 'text': {
//                   'type': 'plain_text',
//                   'text': 'Hungry',
//                   'emoji': true
//                 },
//                 'value': 'hungry'
//               },
//               {
//                 'text': {
//                   'type': 'plain_text',
//                   'text': 'Innovative',
//                   'emoji': true
//                 },
//                 'value': 'innovative'
//               },
//               {
//                 'text': {
//                   'type': 'plain_text',
//                   'text': 'Vibrant',
//                   'emoji': true
//                 },
//                 'value': 'vibrant'
//               },
//               {
//                 'text': {
//                   'type': 'plain_text',
//                   'text': 'Empathetic',
//                   'emoji': true
//                 },
//                 'value': 'empathetic'
//               }
//             ],
//             'action_id': 'static_select-action'
//           },
//           'label': {
//             'type': 'plain_text',
//             'text': 'Who do you want to send kudos to?'
//           }
//         },
//         {
//           'type': 'section',
//           'text': {
//             'type': 'mrkdwn',
//             'text': '*How would you like to send this kudo?*'
//           },
//           'accessory': {
//             'type': 'radio_buttons',
//             'options': [
//               {
//                 'text': {
//                   'type': 'plain_text',
//                   'text': 'Public',
//                   'emoji': true
//                 },
//                 'value': 'public'
//               },
//               {
//                 'text': {
//                   'type': 'plain_text',
//                   'text': 'Private (sends through a DM)',
//                   'emoji': true
//                 },
//                 'value': 'Private'
//               }
//             ],
//             'action_id': 'radio_buttons-action'
//           }
//         }
//       ],
//       'type': 'modal'
//     }
//   });
// } catch (error) {
//   logger.error(error);
// }
