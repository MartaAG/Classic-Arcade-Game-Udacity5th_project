// Enemies our player must avoid
var Enemy = function(y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = 0;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += dt * this.speed;
  if (this.x > 600) {
    this.x = -50;
    this.speed = getRandomSpeed(10);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// collision
function checkCollisions() {
  allEnemies.forEach(function (element) {
    if (player.x < element.x + 50 &&
      player.x + 50 > element.x &&
      player.y < element.y + 50 &&
      50 + player.y > element.y) {
      player.reset();
    }
  });
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.x = 250;
  this.y = 400;
  this.lvl = 0;
  this.sprite = allSprites[this.lvl];
};

//Add additional sprites
var allSprites = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'];

Player.prototype.update = function () {
  if (this.x < 0) {
    this.x = 0;
  }
  if (this.x > 400) {
    this.x = 400;
  }
  if (this.y > 400) {
    this.y = 400;
  }
  //Player changes the appearance everytime it aims to the river
  if (this.y <= -5) {
    player.reset();
    this.sprite = allSprites[++this.lvl%5];
  }
};

Player.prototype.handleInput = function (key) {
  let move = 50;
  if (key === 'left') {
    this.x -= move;
  }
  else if (key === 'up') {
    this.y -= move;
  }
  else if (key === 'right') {
    this.x += move;
  }
  else if (key === 'down') {
    this.y += move;
  }

};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//If the collision happens between the Player and bug, the Player return to the previous place

Player.prototype.reset = function () {
  this.x = 250;
  this.y = 400;
};

//this function randomize the speed of the bugs
function getRandomSpeed(max) {
  return Math.floor(Math.random() * Math.floor(max) * 10)+50;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(50, getRandomSpeed(10)),new Enemy(135, getRandomSpeed(10)), new Enemy(225, getRandomSpeed(10))];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
