var five = require('johnny-five');
var board = new five.Board();
board.on('ready', function() {
	var led = new five.Led(11);
	var input = new five.Sensor('A0');

	input.on('data', function() {
		setLed(this.value);
	});

	function setLed(value) {
		var brightness = five.Fn.map(value, 0, 1025, 0, 255);
		console.log('setting LED brightness to ' + brightness);
		led.brightness(brightness);
	}
});
