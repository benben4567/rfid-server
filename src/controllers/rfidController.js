const rfidService = require('../services/rfidService');

const single = async (req, res) => {
    // res.send(`Run single scan`);
    const val = await rfidService.singleScan();
    res.json(val);
};

const multi = (req, res) => {
    // res.send(`Run multiple scan`);
    rfidService.multiScan();
};

module.exports = { single, multi };