var five = require('johnny-five');
var board = new five.Board();
var wheels = {
	left: undefined,
	right: undefined,
	stop: function() {
		wheels.left.center();
		wheels.right.center();
	},
	forward: function() {
		wheels.left.ccw();
		wheels.right.cw();
	},
	reverse: function() {
		wheels.left.cw();
		wheels.right.ccw();
	},
	turnLeft: function() {
		wheels.left.ccw();
		wheels.right.ccw();
	},
	turnright: function() {
		wheels.left.cw();
		wheels.right.cw();
	}
};

var toInject = {
	five: five,
	board: board
};

board.on('ready', function() {
	wheels.left = new five.Servo({pin: 10, type: 'continuous'});
	wheels.right = new five.Servo({pin: 9, type: 'continuous'});
	toInject.wheels = wheels;
	this.repl.inject(toInject);
});
