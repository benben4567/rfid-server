require('dotenv').config()
const chalk = require('chalk')
const axios = require('axios').default;
const { SerialPort } = require('serialport')
const { ByteLengthParser } = require('@serialport/parser-byte-length')

const baseUrl = process.env.BASE_URL;

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
                console.log(chalk.green("[DATA]", chalk.cyan(hex)));
                resolve(hex)
            }
        });
    })
}

const multiScan = async () => {
    await axios.get(baseUrl + '/aktivitas/check')
        .then((response) => {
            let data = response.data.data
            scan(data.id)
        })
        .catch((err) => {
            if (err.response.status == 404) {
                console.log(chalk.yellow("[INFO]", chalk.cyan("Tidak ada Scanner yang aktif")))
            } else {
                console.log(err.response)
            }
        });
}

async function scan(id) {

    const parser = port.pipe(new ByteLengthParser({ length: 16 }))

    let prev = "";
    let arr = [];
    parser.on('data', async (buff) => {
        let hex = buff.toString('hex')

        if (hex != prev) {
            prev = hex
            if (!arr.includes(hex)) {
                arr.push(hex)
                await send(id, hex);
            }
        }
    });
}

const send = async (id, hex) => {
    await axios.post(baseUrl + '/api/aktivitas/store-senjata', { aktivitas_id: id, senjata_rfid: hex })
        .then(() => console.log(chalk.green("[DATA]", chalk.cyan(hex))))
        .catch((err) => console.log(err))
}

module.exports = { singleScan, multiScan };