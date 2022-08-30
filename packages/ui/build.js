const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const https = require('https')
const jsonPath = require('jsonpath')
const dotenv = require('dotenv')

const receiveImageBlacklist = (parsedEnvFile) => {
  return new Promise((resolve) => {
    https
      .get(
        parsedEnvFile.BLACKLIST_TABLE_GET_URL,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedEnvFile.REACT_APP_BLACKLIST_API_KEY}`,
          },
        },
        (res) => {
          let data = ''
          res.on('data', (chunk) => {
            data += chunk
          })
          res.on('end', () => {
            data = JSON.parse(data)
            if ('error' in data) {
              console.error('Error fetching blacklist: ', data.error)
              resolve([])
              return
            }

            if (!parsedEnvFile.BLACKLIST_URL_JSON_PATH) {
              console.log(
                'Please add BLACKLIST_URL_JSON_PATH to your environment variables to correctly parse incoming data. Blacklist defaulted to empty array.'
              )
              resolve([])
              return
            }

            if (jsonPath.paths(data, parsedEnvFile.BLACKLIST_URL_JSON_PATH).length) {
              console.log('Blacklist successfully fetched!')
              resolve(jsonPath.query(data, parsedEnvFile.BLACKLIST_URL_JSON_PATH))
            } else {
              console.log('Current JSON path did not found any results')
              resolve([])
            }
          })
        }
      )
      .on('error', (err) => {
        resolve([])
        console.error('Error fetching blacklist: ', err)
      })
  })
}

async function build() {
  console.log('Fetching image blacklist...')
  const parsedEnvFile = dotenv.config().parsed || {}
  let blacklist = await receiveImageBlacklist(parsedEnvFile)

  console.log('Invoking Webpack...')
  webpack(webpackConfig({ blacklist }, { mode: 'production', progress: true }))
}

build()
