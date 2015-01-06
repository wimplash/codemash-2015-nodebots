var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

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
	back: function() {
		wheels.left.cw();
		wheels.right.ccw();
	},
	pivotLeft: function() {
		wheels.left.cw();
		wheels.right.cw();
	},
	pivotRight: function() {
		wheels.left.ccw();
		wheels.right.ccw();
	}
}

var initWheels = function initWheels() {
	wheels.left = new five.Servo({pin: 10, type: 'continuous'});
	wheels.right = new five.Servo({pin: 9, type: 'continuous'});
};

var handleKey = function handleKey(chunk, key) {
	if (!key) return;

	switch (key.name) {
	case 'up':
	case 'w':
		wheels.forward();
		break;

	case 'down':
	case 's':
		wheels.back();
		break;

	case 'left':
	case 'a':
		wheels.pivotLeft();
		break;

	case 'right':
	case 'd':
		wheels.pivotRight();
		break;

	case 'space':
	case 'escape':
		wheels.stop();
		break;
	}
};

board.on('ready', function() {
	initWheels();

	wheels.stop();
	console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");
	stdin.on("keypress", handleKey);
});
