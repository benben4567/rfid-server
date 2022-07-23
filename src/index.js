require('dotenv').config()

const express = require('express')
const router = require('./routes')
const app = express()
const port = process.env.PORT;

app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

