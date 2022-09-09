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

build()

async function build() {
  const blacklist = await initializeImageSafety()

  console.log('Invoking Webpack...')
  webpack(webpackConfig({ blacklist }, { mode: 'production' }), (err, stats) => {
    if (err) {
      return console.error(err);
    }

    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }))
  })
}

async function initializeImageSafety () {
  const parsedEnvFile = dotenv.config().parsed ?? {}
  let hasCustomApi = await fs.promises.access(IMAGE_REPORTING_PATH.customEntry).then(() => true).catch(() => false)

  const blacklistUrl = parsedEnvFile.IMAGE_SAFETY_BLACKLIST_URL
  const reportUrl = parsedEnvFile.IMAGE_REPORT_API_URL
  const isBlacklistApiSet = hasCustomApi || blacklistUrl
  const isReportFormSet = 'IMAGE_REPORT_FORM_URL' in parsedEnvFile
  const isReportApiSet = !isReportFormSet && (hasCustomApi || reportUrl)

  if (!isBlacklistApiSet) {
    const missing = [!blacklistUrl && 'IMAGE_SAFETY_BLACKLIST_URL', !reportUrl && 'IMAGE_REPORT_API_URL']
    console.warn('Skip remote fetching of the image blacklist because the following environnement variables:', missing.flatMap(name => name ?? []).join(), 'are missing')
  }

  if (isBlacklistApiSet || isReportApiSet) {
    const code = await fs.promises.readFile(IMAGE_REPORTING_PATH[hasCustomApi ? 'customEntry' : 'defaultEntry'], 'utf8')
    await fs.promises.writeFile(IMAGE_REPORTING_PATH.output, code, 'utf8')
  }

  if (!isBlacklistApiSet) {
    return []
  }

  console.log('Fetching image blacklist...')

  if (!global.fetch) {
    global.fetch = require('node-fetch')
  }
  const { ImageSafetyApi } = require(IMAGE_REPORTING_PATH.output)

  try {
    const blacklist = await ImageSafetyApi.blacklist(jsonPath)
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
