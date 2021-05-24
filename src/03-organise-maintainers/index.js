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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

// merge sort
/**/

const axios = require('axios');

// TODO

module.exports = async function organiseMaintainers() {
  let maintainers = [];
  await axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(res => {
      let { content } = res?.data;
      let data = {};

      for (let i = 0; i < content.length; i++) {
        let { name, maintainers } = content[i].package;
        maintainers.forEach(({ username }) => {
          if (!data[username]) {
            data[username] = [name];
          } else {
            data[username].push(name);
            data[username].sort((a, b) => a.localeCompare(b));
          }
        });
      }

      for (let name in data) {
        maintainers.push({
          username: name,
          packageNames: data[name],
        });
      }
    });

  return mergeSort(maintainers);
};

function merger(arr1, arr2) {
  let i = 0;
  let j = 0;
  let arr = [];
  while (i < arr1.length && j < arr2.length) {
    let compareILessK = arr1[i]['username'].localeCompare(arr2[j]['username']);
    if (compareILessK < 0) {
      arr.push(arr1[i]);
      i++;
    } else {
      arr.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    arr.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    arr.push(arr2[j]);
    j++;
  }
  return arr;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  // keep splitting till <= 1
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merger(left, right);
}
