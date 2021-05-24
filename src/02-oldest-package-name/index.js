/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const axios = require('axios');

module.exports = async function oldestPackageName() {
  // TODO
  let name = '';
  await axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(res => {
      let { content } = res?.data;
      let currentOldestDate = 0;
      for (let i = 0; i < content.length; i++) {
        let currentDate =
          new Date().getTime() - new Date(content[i].package.date).getTime();
        if (currentDate > currentOldestDate) {
          currentOldestDate = currentDate;
          name = content[i]['package'].name;
        }
      }
    });

  return name;
};
