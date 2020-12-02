class GameManager {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = gameStates.Menu;
    this.gameBall = new Ball(this);
    this.playerPaddle = new PlayerPaddle(this);
    this.inputHandler = new InputHandler(this.playerPaddle, this);
    this.playerLives = 3;
    this.bricks = [];
    this.levels = [level1, level2];
    this.currentLevel = 0;
  }
  startGame() {
    if(this.gameState !== gameStates.Menu && this.gameState !== gameStates.NewLevel && this.gameState !== gameStates.GameOver) {
      return;
    }
    this.bricks = buildLevel(this, null);
    this.gameBall.reset();
    this.playerPaddle.reset();
    this.playerLives = 3;
    this.gameObjects = [this.playerPaddle, this.gameBall];
    this.gameState = gameStates.Running;
  }
  update(deltaTime) {
    if(this.gameState != gameStates.Running) {
      return;
    }
    if(this.playerLives === 0) {
      this.gameState = gameStates.GameOver;
    }
    if(this.bricks.length === 0) {
      this.currentLevel++;
      if(this.currentLevel < this/this.levels.length) {
        this.gameState = gameStates.NewLevel;
        this.startGame();
      } else {
        this.gameState = gameStates.GameOver;
      }
      
    }
    [...this.gameObjects, ...this.bricks].forEach((gameObject) => gameObject.update(deltaTime));
    this.bricks = this.bricks.filter(object => !object.markedForDelete);
  }
  draw(context) {
    if(this.gameState === gameStates.Paused){
      this.showPauseScreen(context);
    } else if(this.gameState === gameStates.Menu){
      this.showGameMenu(context);
    } else if(this.gameState === gameStates.GameOver){
      this.showGameOverScreen(context);
    } else {
      [...this.gameObjects, ...this.bricks].forEach((gameObject) => gameObject.draw(context));
    }
    
  }
  togglePause() {
    if(this.gameState === gameStates.Paused) {
      this.gameState = gameStates.Running;
    } else {
      this.gameState = gameStates.Paused;
    }
  }
  showGameOverScreen(context) {
    context.rect(0, 0, this.gameWidth, this.gameHeight);
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fill();
    context.font = "13px Arial";
    context.fillStyle = '#FFFFFF';
    context.textAlign = "center";
    context.fillText("Game Over", this.gameWidth /2, this.gameHeight / 2);
    context.fillText("Press space to restart", this.gameWidth /2, (this.gameHeight / 2) + 15);
  }
  showPauseScreen(context) {
    context.rect(0, 0, this.gameWidth, this.gameHeight);
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fill();
    context.font = "13px Arial";
    context.fillStyle = '#FFFFFF';
    context.textAlign = "center";
    context.fillText("Paused", this.gameWidth /2, this.gameHeight / 2);
  }
  showGameMenu(context) {
    context.rect(0, 0, this.gameWidth, this.gameHeight);
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fill();
    context.font = "13px Arial";
    context.fillStyle = '#FFFFFF';
    context.textAlign = "center";
    context.fillText("Press Space to Begin", this.gameWidth /2, this.gameHeight / 2);
  }
}