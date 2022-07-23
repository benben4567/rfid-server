require('dotenv').config()
const { SerialPort } = require('serialport')
const { ByteLengthParser } = require('@serialport/parser-byte-length')

const port = new SerialPort({
    path: process.env.COM_PORT,
    baudRate: 57600,
    // autoOpen: false,
})

const singleScan = async () => {
    // port.open(function (err) {
        // if (err) {
            // return console.log('Error opening port: ', err.message)
        // }
        // console.log('Serial port open')
    // })

    const parser = port.pipe(new ByteLengthParser({ length: 16 }))

    let prev = "";
    return new Promise((resolve, reject) => {
        parser.on('data', (buff) => {
            let hex = buff.toString('hex')

            if (hex != prev) {
                // port.close(function (err) {
                    // if (err) {
                        // console.log('Error closing port: ', err.message)
                    // }
                    // console.log('Serial port closed')
                // })
                prev = hex
				console.log("DATA : ",hex);
                resolve(hex)
            }
        });
    })
}

const multiScan = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("test"), 3000)
    })
}

module.exports = { singleScan, multiScan };