module.exports = async ({body, client, logger}) => {
  try {
    const data = dummyData;
    console.log(data);
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

const dummyData = [
  {
    'id': 101,
    'points_available': 3,
    'received_nkudos': [
      {
        from: 102,
        value: 'team player',
        message: 'thanks again',
        received_at: '2023-08-01'
      },
      {
        from: 103,
        value: 'leadership',
        message: 'thanks again I really appreicate it',
        received_at: '2023-08-01'
      }
    ]
  },
  {
    'id': 102,
    'points_available': 3,
    'received_nkudos': [
      {
        from: 101,
        value: 'team player',
        message: 'thanks again',
        received_at: '2023-08-01'
      },
      {
        from: 103,
        value: 'leadership',
        message: 'thanks again I really appreicate it',
        received_at: '2023-08-02'
      },
      {
        from: 104,
        value: 'leadership',
        message: 'test',
        received_at: '2023-08-03'
      }
    ]

  },
  {
    'id': 103,
    'points_available': 3,
    'received_nkudos': []
  },
  {
    'id': 104,
    'points_available': 4,
    'received_nkudos': [
      {
        from: 101,
        value: 'team player',
        message: 'thanks again',
        received_at: '2023-08-01'
      },
      {
        from: 102,
        value: 'leadership',
        message: 'thanks again I really appreicate it',
        received_at: '2023-08-03'
      }
    ]
  }
];
