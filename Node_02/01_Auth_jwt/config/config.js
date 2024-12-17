const fs = require('fs');
const path = require('path');

const configFile = path.resolve(__dirname, 'config.json');
const rawData = fs.readFileSync(configFile);
const config = JSON.parse(rawData);

module.exports = config;
