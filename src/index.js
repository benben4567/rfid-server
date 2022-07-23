require('dotenv').config()
const figlet = require('figlet')
const chalk = require('chalk')
const express = require('express')
const router = require('./routes')
const app = express()
const port = process.env.PORT;

const config = {
    font: 'doom',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 90,
}



app.use("/", router);

app.listen(port, () => {
    console.clear();
    console.log(chalk.green(figlet.textSync('RFID Server', config)))
    console.log(chalk.bold.yellow(`                 http://localhost:${port}`))
    console.log(chalk.yellow('                    Scanner: ', chalk.green('READY')));
    console.log('==========================================================')
    console.log('')
});

