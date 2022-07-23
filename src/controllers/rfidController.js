const rfidService = require('../services/rfidService');

const single = async (req, res) => {
    // res.send(`Run single scan`);
    const val = await rfidService.singleScan();
    res.json(val);
};

const multi = async (req, res) => {
    // res.send(`Run multiple scan`);
    const text = await rfidService.multiScan();
    res.send(text);
};

module.exports = { single, multi };