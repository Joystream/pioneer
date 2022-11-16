/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const jsonPath = require('jsonpath')
const webpack = require('webpack')

const webpackConfig = require('./webpack.config')

build()

async function build() {
  const blacklist = await initializeImageSafety()

  console.log('Invoking Webpack...')
  webpack(webpackConfig({ blacklist }, { mode: 'production' }), (err, stats) => {
    if (err) {
      return console.error(err);
    }
    console.log(stats.toString({ chunks: false, colors: true }))
  })
}

async function initializeImageSafety () {

  if (!process.env.IMAGE_SAFETY_BLACKLIST_URL) {
    console.warn('Skip remote fetching of the image blacklist because IMAGE_SAFETY_BLACKLIST_URL is not defined')
    return []
  }

  console.log('Fetching image blacklist...')

  try {
    const blacklist = await fetchBlacklist(
      process.env.IMAGE_SAFETY_BLACKLIST_URL,
      process.env.IMAGE_SAFETY_BLACKLIST_HEADERS,
      process.env.IMAGE_SAFETY_BLACKLIST_JSON_PATH
    )
    if (blacklist.length) {
      console.log('Image blacklist fetched successfully:', ...blacklist.map(src => '\n\t' + src))
    } else {
      console.warn('The retrieved image blacklist is empty')
    }
    return blacklist
  } catch (err) {
    console.error('Error fetching the image blacklist: ', err)
  }

  return []
}

function fetchBlacklist (url, headersText, imgsPath = '*') {
  const protocol = url.startsWith('http://') ? 'http' : 'https'
  const headers = !headersText ? {} : Object.fromEntries(
    headersText.split('\n').flatMap((header) => {
      const [, key, value] = header.match(/(\w[^\s:]+)\s*:\s*(.+)/) ?? []
      return (!key || !value) ? [] : [[key, value]]
    })
  )

  return new Promise((resolve, reject) => {
    require(protocol).get(url, { headers }, (res) => {
      const resolveIf200 = (resolved) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Request Failed. Status ${res.statusCode}: ${res.statusMessage}`))
        }
        return resolve(resolved)
      }

      let text = ''
      res
        .on('error', reject)
        .on('data', (chunk) => text += chunk)
        .on('end', () => {
          if (!res.headers['content-type'].includes('application/json')) {
            return resolveIf200(text.split('\n'))
          }

          const data = JSON.parse(text)

          if ('error' in data) {
            return reject(data.error)
          }

          const path = imgsPath.replace(/^(?!\$)/, '$..')
          const onlyStrings = (item) => item && typeof item === 'string'
          return resolveIf200(jsonPath.query(data, path).filter(onlyStrings))
        })
    })
  })
}
