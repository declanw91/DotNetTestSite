let canvas = document.getElementById('gameArea');
let context = canvas.getContext('2d');

canvas.width = (document.getElementById('gameWrapper').offsetWidth  / 100) * 75;
canvas.height = (window.innerHeight  / 100) * 75;

let gameWidth = canvas.width;
let gameHeight = canvas.height;

const gameStates = {
  Paused: 0,
  Running: 1,
  Menu: 2,
  GameOver: 3,
  NewLevel: 4,
  YouWin: 5
};

let gameManager = new GameManager(gameWidth, gameHeight);

let lastTime = 0;

function GameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameManager.update(deltaTime);
  gameManager.draw(context);
  requestAnimationFrame(GameLoop);
}

GameLoop();