function detectCollision(ball, gameObject) {
  let ballBottom = ball.position.y + ball.size;
  let ballTop = ball.position.y;

  let gameObjectTop = gameObject.position.y;
  let gameObjectLeft = gameObject.position.x;
  let gameObjectRight = gameObject.position.x + gameObject.width;
  let gameObjectBottom = gameObject.position.y + gameObject.height;

  if(ballBottom >= gameObjectTop && ballTop <= gameObjectBottom && ball.position.x >= gameObjectLeft && ball.position.x + ball.size <= gameObjectRight) {
    return true;
  } else {
    return false;
  }
}