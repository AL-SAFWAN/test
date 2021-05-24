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

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

const axios = require('axios');

module.exports = async function countMajorVersionsAbove10() {
  // TODO

  let count = 0;
  await axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(res => {
      let { content } = res?.data;
      for (let i = 0; i < content.length; i++) {
        if (isGreaterToVersion(content[i]['package']?.version)) count++;
      }
    });

  return count;
};

function isGreaterToVersion(str, versionNumber = 10) {
  let number = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '.') {
      break;
    } else {
      number = number.concat(str[i]);
    }
  }
  return parseInt(number) > versionNumber;
}
