let x = 40;
let y = 300;
let radius = 50;

const library = 'p5js';
let movingRight = true;
let movingDown = true;
let isGrowing = true;

const updateDirections = (pos, canvas) => {
  const xMaxBreached = pos.right > canvas.width;
  const xMinBreached = pos.left < 0;

  const yMaxBreached = pos.bottom > canvas.height;
  const yMinBreached = pos.top < 0;

  if (xMaxBreached) {
    movingRight = false;
  } else if (xMinBreached) {
    movingRight = true;
  }

  if (yMaxBreached) {
    movingDown = false;
  } else if (yMinBreached) {
    movingDown = true;
  }
};

const getNextXPos = (x) => {
  return movingRight ? (x += 1) : (x -= 1);
};
const getNextYPos = (y) => {
  return movingDown ? (y += 1) : (y -= 1);
};

const getNextRadius = (maxSize) => {
  // once max size is reached, start shrinking
  if (radius > maxSize) {
    isGrowing = false;
  } else if (radius < 2) {
    isGrowing = true;
  }

  if (isGrowing) {
    return radius + 1;
  } else {
    return radius - 1;
  }
};

const draw = (p5) => {
  p5.background(0);
  p5.ellipse(x, y, radius, radius);

  // checks for collisions and updates the direction booleans
  updateDirections(
    {
      right: x + radius / 2,
      left: x - radius / 2,
      top: y - radius / 2,
      bottom: y + radius / 2
    },
    { width: p5.width, height: p5.height }
  );

  x = getNextXPos(x);
  y = getNextYPos(y);

  radius = Math.random() > 0.3 ? getNextRadius(p5.width) : radius;
};

module.exports = {
  draw,
  library
};
