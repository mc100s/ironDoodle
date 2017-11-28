var ctx;
var iFrame = 0;
var game = new IronDoodleGame();
var speed = 1;
var width = 400;
var height = 600;
var bouncingForce = 0.025*height;
var gravity = 0.001*height;
var intervalFrame = 20;

//JOUEUR
function Player(x, y, color, radius, vx, vy) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = radius;
  this.vx = vx;
  this.vy = vy;
  this.getRefY = function() {
    return this.y + speed*iFrame;
  }
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y + speed*iFrame, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  this.nextMove = function(platforms) {
    for (var i = 0; i < platforms.length; i++) {
      if (this.y + this.radius < platforms[i].y &&
          this.y + this.radius + this.vy > platforms[i].y &&
          this.x > platforms[i].x &&
          this.x < platforms[i].x + platforms[i].width
          ) {
        this.vy = -bouncingForce;
      }
    }
    this.y += this.vy;
    this.vy += gravity;
  }
}

//platformE
function Platform(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.getRefY = function() {
    return this.y + speed*iFrame;
  }
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y + speed*iFrame, this.width, this.height);
  }
}




//GAME
function IronDoodleGame() {

}

IronDoodleGame.prototype.startGame = function() {
  var that = this
  ctx =  document.getElementById("canvas").getContext("2d");

  this.player = new Player(200, 250, "black", 10, 1, 1);
  this.platform1 = new Platform(150, 265, 100, 10, "black");
  this.platform2 = new Platform(150, 205, 100, 10, "black");
  this.platforms = [this.platform1, this.platform2];
  this.platforms.push(new Platform(150, 60, 100, 10, "black"))
  this.platforms.push(new Platform(250, 0, 100, 10, "black"))


  this.myInterval = setInterval(function() {
    iFrame++;
    that.player.nextMove(that.platforms);
    that.drawEverything();
    that.checkIfGameOver();

  }, intervalFrame);

  this.player.vy = -bouncingForce;

}

//GAME OVER
IronDoodleGame.prototype.checkIfGameOver = function() {
  // console.log("Referenciel y --> ", this.player.getRefY());
  if (this.player.getRefY() >= 600) {
    console.log("Game Over !");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 600);
    ctx.font = '38px sans-serif';
    ctx.fillStyle = "white";
    ctx.fillText("Game over !", 90, 200);
    clearInterval(this.myInterval);
  }
}



//TOUT DESSINER
IronDoodleGame.prototype.drawEverything = function() {
  ctx.clearRect(0, 0, 400, 600);
  this.player.draw();
  for (var i = 0; i < this.platforms.length; i++) {
    this.platforms[i].draw();
  }
}


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    game.startGame();
  };
}
