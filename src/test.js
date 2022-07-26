require('dotenv').config()
const chalk = require('chalk')
const { SerialPort } = require('serialport')
const { ByteLengthParser } = require('@serialport/parser-byte-length')

const port = new SerialPort({
    path: process.env.COM_PORT,
    baudRate: 57600,
    // autoOpen: false,
})

console.log(chalk.green("MODE:", chalk.cyan("TEST")));

const parser = port.pipe(new ByteLengthParser({ length: 16 }))
parser.on('data', (buff) => {
    let hex = buff.toString('hex')
    console.log(chalk.green("[DATA]", chalk.cyan(hex)));
});