const level1 = [
  [0,1,0,1,0,1,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1]
];
const level2 = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1]
];

const maxRows = 5;

function buildLevel(game, level) {
  let bricks = [];
  let brick = new Brick(game);
  var gameWidth = game.gameWidth;
  let maxBricksRow = Math.floor(gameWidth / brick.width);
  if(typeof level !== 'undefined' && level !== null) {
    level.forEach((row, rowIndex) => {
      row.forEach((brick, brickIndex) => {
        if(brick === 1) {
          let brickPosition = {x: brickIndex * brick.width, y: 20 + brick.height * rowIndex};
          brick.position = brickPosition;
          bricks.push(brick);
        }
      });
    });
  } else {
    for(var i = 0; i < maxRows; i++) {
      for(var j = 0; j < maxBricksRow; j++) {
        var brickType = Math.floor(Math.random() * 4);
        if(brickType < 3) {
          let brickPosition = {x: j * brick.width, y: 20 + brick.height * i};
          brick.position = brickPosition;
          bricks.push(brick);
          brick = new Brick(game);
        }
      }
    }
  }
  return bricks;
}