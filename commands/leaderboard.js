const {getUsers} = require('../datastore/service')

module.exports = async ({body, client, logger}) => {
  try {
    const users = await getUsers();

    const currentMonth = getCurrentMonth();
    const filteredData = users.filter(user => {
      return user.nkudos_received.some(kudo => kudo.timestamp.startsWith(currentMonth));
    });
    
    // Group the data by 'value' category and calculate the total kudos received by each user for each category
    const kudosByValue = {};
    filteredData.forEach(user => {
      user.nkudos_received.forEach(kudo => {
        if (!kudosByValue[kudo.value]) {
          kudosByValue[kudo.value] = {};
        }
        if (!kudosByValue[kudo.value][user.id]) {
          kudosByValue[kudo.value][user.id] = 0;
        }
        kudosByValue[kudo.value][user.id]++;
      });
    });

    const mostKudosByValue = {};
    for (const value in kudosByValue) {
      let maxKudos = 0;
      let userIdWithMostKudos = null;
      for (const userId in kudosByValue[value]) {
        const kudosCount = kudosByValue[value][userId];
        if (kudosCount > maxKudos) {
          maxKudos = kudosCount;
          userIdWithMostKudos = userId;
        }
      }
      mostKudosByValue[value] = userIdWithMostKudos;
    }

    msg = ':sports_medal: Leaderboard of the month :sports_medal:'
    for (const e in mostKudosByValue) {
      msg += `\n>*${e}*: <@${mostKudosByValue[e]}>`
    }
    
    try {
      const result = await client.chat.postMessage({
        text: msg,
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

function getCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  return `${year}-${month.toString().padStart(2, '0')}`;
}