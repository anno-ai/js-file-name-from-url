import path = require('path')
import sanitize = require('sanitize-filename')
import { isEmpty } from 'lodash'
const hash = require('crypto').createHash

function generateShortHash (string: string, length: number = 10, alg: 'md5' = 'md5') {
  return (hash(alg).update(string).digest('base64')).substring(0, length)
}

export function getFileNameFromUrl (url: string):any {
  try {
    const { pathname, href: source } = new URL(url)

    // Get the file name from the url path
    let name = path.basename(pathname)

    // Decode an encoded url
    name = decodeURIComponent(name)

    // Sanitize the file name
    name = sanitize(name)

    // Generate a short hash if empty
    if (isEmpty(name)) {
      name = generateShortHash(url)
    }

    return { name, source }
  } catch (err) {
    return {}
  }
}