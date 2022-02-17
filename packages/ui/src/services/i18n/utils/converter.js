#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const {json2Csv, csv2Json} = require('i18next-json-csv-converter');
const {hideBin} = require('yargs/helpers');
const yargs = require('yargs/yargs');

const {argv} = yargs(hideBin(process.argv));

const {from, input, output} = argv;

fs.readdirSync(input).filter((dir) => !/^\./.test(dir)).forEach((lang) => {
  const dirPath = path.join(input, lang);
  fs.readdir(dirPath, (err, fields) => {
    if (err) {
      throw err;
    }
    fields.forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (path.extname(filePath) === (from === 'csv' ? '.csv' : '.json')) {
        fs.readFile(path.join(dirPath, file), 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
          const outputPath = path.join(output, lang);
          const writeFn = from === 'csv' ? convertCsvToJson(file, data, outputPath) : convertJsonToCsv(file, data, outputPath);
          fs.existsSync(outputPath) ? writeFn() : fs.mkdir(outputPath, {recursive: true}, (err) => {
            if (err) {
              throw err;
            }
            writeFn();
          })
        });
      }
    })
  })
})

function convertJsonToCsv(file, data, outputPath) {
  const csv = json2Csv(JSON.parse(data));
  return writFile(csv, file.replace('.json', '.csv'), outputPath)
}

function convertCsvToJson(file, data, outputPath) {
  const json = csv2Json(data);
  return writFile(JSON.stringify(json), file.replace('.csv', '.json'), outputPath)
}

function writFile(file, fileName, outputPath) {
  return function() {
    fs.writeFileSync(path.join(outputPath, fileName), file);
  }
}
