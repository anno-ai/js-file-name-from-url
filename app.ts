require('ts-node/register')

const { getFileNameFromUrl } = require('./lib/index')

const test1 = getFileNameFromUrl('https://google.com/image.jpg')
console.log(test1)