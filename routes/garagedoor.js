/**
 * Created by robertrittmuller on 7/4/16.
 */
var express = require('express');
var router = express.Router();

/* Show current status of garage door and allow for open/close toggle. */
router.get('/', function(req, res, next) {

    // setup GPIO
    // var Gpio = require('onoff').Gpio,
        // door = new Gpio(4, 'out');

    // door.writeSync(0);

    res.render('garageDoor', { title: 'Garage Door Control' });
    console.log("Open/Close Request");

    // door.writeSync(1);
});

module.exports = router;