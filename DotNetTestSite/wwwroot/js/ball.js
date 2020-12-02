class Ball {
  constructor(game) {
    this.image = document.getElementById('gameBall');
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.size = this.image.naturalWidth;
    this.game = game;
    this.defaultSpeed = {x: 2, y: 2};
    this.reset();
  }
  draw(context) {
    context.drawImage(this.image, this.position.x , this.position.y);
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // collision detection - left or right wall
    if(this.position.x > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //collision detection - top wall
    if(this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    //collision detection - bottom wall
    if(this.position.y + this.size > this.gameHeight) {
      this.game.playerLives--;
      this.game.playerPaddle.reset();
      this.reset();
    }
    //collision detection player paddle
    if(detectCollision(this, this.game.playerPaddle)) {
      this.speed.y = -this.speed.y;
    }
  }
  reset() {
    this.speed = {x: 2, y: 2};
    this.position = {x: 100, y: 100};
  }
}