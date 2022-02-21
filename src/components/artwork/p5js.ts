let x = 50;
let y = 50;
let radius = 50;

const draw = (p5) => {
  p5.background(0);
  p5.ellipse(x, y, radius, radius);
  // NOTE: Do not use setState in the draw function or in functions that are executed
  // in the draw function...
  // please use normal variables or class properties for these purposes
  x += 1;
  y += 1;
  Math.random() > 0.3 ? radius++ : radius--;
  radius = Math.max(radius, 10);
};

module.exports = {
  draw: draw
};
