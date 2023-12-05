Candy.Game = function(game) {
	this._player = null;
	this._candyGroup = null;
	this._spawnCandyTimer = 0;
	this._fontStyle = null;
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 0;
};
Candy.Game.prototype = {
	create: function() {
		// ... 
	},
	managePause: function() {
		// ... 
	},
	update: function() {
		// ... 
	}
};
Candy.item = {
	spawnCandy: function(game) {
		// ... 
	},
	clickCandy: function(candy) {
		// ... 
	},
	removeCandy: function(candy) {
		// ... 
	}
};
