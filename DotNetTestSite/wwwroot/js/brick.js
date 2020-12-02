class Brick {
  constructor(game, position) {
    this.position = position;
    this.image = this.getBrickImage();
    this.width = this.image.naturalWidth;
    this.height = this.image.naturalHeight;
    this.game = game;
    this.markedForDelete = false;
  }
  draw(context) {
    context.drawImage(this.image, this.position.x , this.position.y);
  }
  update(deltaTime) {
    if(detectCollision(this.game.gameBall, this)) {
      this.game.gameBall.speed.y = -this.game.gameBall.speed.y;
      if(this.brickType === 1 && this.game.playerPaddle.width === this.game.playerPaddle.defaultWidth) {
        this.game.playerPaddle.width = this.game.playerPaddle.width * 2;
      } else if (this.brickType === 2 && (this.game.gameBall.speed.y === -this.game.gameBall.defaultSpeed.y || this.game.gameBall.speed.y === this.game.gameBall.defaultSpeed.y)) {
        this.game.gameBall.speed.y = -(this.game.gameBall.speed.y * 2);
      }
      this.markedForDelete = true;
    }
  }
  getBrickImage() {
    var randomNumber = Math.floor(Math.random() * 100);
    if(randomNumber < 75) {
      this.brickType = 0;
      return document.getElementById('gameBrick');
    } /*else if (randomNumber > 90) {
      this.brickType = 2;
      return document.getElementById('gameBrickGreen');
    } */else {
      this.brickType = 1;
      return document.getElementById('gameBrickBlue');
    }
  }
}