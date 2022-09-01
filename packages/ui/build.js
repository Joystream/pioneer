/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs')

const dotenv = require('dotenv')
const jsonPath = require('jsonpath')
const webpack = require('webpack')

const webpackConfig = require('./webpack.config')

const IMAGE_REPORTING_PATH = {
  defaultEntry: './meta/imageSafetyApi.default.js',
  customEntry: './meta/imageSafetyApi.override.js',
  output: './src/common/utils/ImageSafetyApi/index.js',
}

// Just to prevent user error
const sanitize = (text = '') => text.replace(/\n/g, '').replace(/'/g, "\\'")

const buildImageSafetyApi = async () => {
  const parsedEnvFile = dotenv.config().parsed ?? {}
  let hasCustomApi = await fs.promises.access(IMAGE_REPORTING_PATH.customEntry).then(() => true).catch(() => false)

  const blacklistEndpoint = parsedEnvFile.IMAGE_SAFETY_BLACKLIST_ENDPOINT ?? parsedEnvFile.IMAGE_SAFETY_ENDPOINT
  const reportEndpoint = parsedEnvFile.IMAGE_SAFETY_REPORT_ENDPOINT ?? parsedEnvFile.IMAGE_SAFETY_ENDPOINT
  const isBlacklistApiSet = !(!hasCustomApi && !blacklistEndpoint)
  const isReportApiSet = !(!hasCustomApi && !reportEndpoint)

  if (!isBlacklistApiSet) {
    const missing = [!blacklistEndpoint && 'IMAGE_SAFETY_BLACKLIST_ENDPOINT', !reportEndpoint && 'IMAGE_SAFETY_REPORT_ENDPOINT']
    console.warn('Skipping image blacklist because the following environnement variables:', missing.flatMap(name => name ?? []).join(), 'are missing')
  } else {
    const template = await fs.promises.readFile(IMAGE_REPORTING_PATH[hasCustomApi ? 'customEntry' : 'defaultEntry'], 'utf8')
    const code = template
      .replace(/\$BLACKLIST_ENDPOINT\$/, sanitize(blacklistEndpoint))
      .replace(/\$BLACKLIST_BEARER\$/, sanitize(parsedEnvFile.IMAGE_SAFETY_BLACKLIST_BEARER ?? parsedEnvFile.IMAGE_SAFETY_BEARER))
      .replace(/\$BLACKLIST_JSON_PATH\$/, sanitize(parsedEnvFile.IMAGE_SAFETY_BLACKLIST_JSON_PATH ?? '*').replace(/^(?!\$)/, '$..'))
      .replace(/\$REPORT_ENDPOINT\$/, sanitize(reportEndpoint))
      .replace(/\$REPORT_BEARER\$/, sanitize(parsedEnvFile.IMAGE_SAFETY_REPORT_BEARER ?? parsedEnvFile.IMAGE_SAFETY_BEARER))
      .replace(/\$REPORT_BODY\$/, sanitize(parsedEnvFile.IMAGE_SAFETY_REPORT_BODY_TEMPLATE) ?? '{value}')

    await fs.promises.writeFile(IMAGE_REPORTING_PATH.output, code, 'utf8')
  }

  return { isBlacklistApiSet, isReportApiSet }
}

const imageBlacklist = async () => {
  if (!global.fetch) {
    global.fetch = require('node-fetch')
  }
  const { ImageSafetyApi } = require(IMAGE_REPORTING_PATH.output)

  try {
    const blacklist = await ImageSafetyApi.blacklist(jsonPath)
    if (blacklist.length) {
      console.log('Image blacklist fetched successfully !')
    } else {
      console.warn('The retrieved image blacklist is empty')
    }
    return blacklist
  } catch (err) {
    console.error('Error fetching the image blacklist: ', err)
    return []
  }
}

async function build() {
  const { isBlacklistApiSet, isReportApiSet } = await buildImageSafetyApi()
  isBlacklistApiSet && console.log('Fetching image blacklist...')
  const blacklist = isBlacklistApiSet ? await imageBlacklist() : []

  console.log('Invoking Webpack...')
  webpack(webpackConfig({ blacklist, isReportApiSet }, { mode: 'production' }), (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error('Webpack error: ', err)
    }
  })
}

build()
