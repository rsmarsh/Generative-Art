const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const library = 'p5js';
let p5;

const BLOCK_HEIGHT = 100;
const blocks = [];
let availablePositions = [-300, -200, -100, 0, 100, 200, 300];
const numberOfBlocks = availablePositions.length;

/* custom options to add: 
  - block stroke
  - block size (linked to number of blocks)
  - rotation speed
*/

// this only creates the blocks metadata and adds a reference to them within the blocks array, they are drawn later
const createBlock = (colour) => {
  const newBlock = {
    x: availablePositions.shift(),
    y: -p5.height / 2,
    size: 100,
    speed: random.value(),
    colour: colour,
    landed: false,
    debug: false,
    rotation: {
      x: 0,
      y: 0,
      multiplier: random.range(random.value() / 8)
    }
  };

  console.log(newBlock);
  return newBlock;
};

const getNewBlockY = (block) => {
  let newYPos = block.y;
  const maxHeight = p5.height / 2 - BLOCK_HEIGHT;

  if (block.y >= maxHeight) {
    newYPos = maxHeight;
    block.landed = true;
  } else {
    newYPos = block.y + 1 + block.speed;
    console.log(newYPos);
  }

  if (block.debug) {
    console.log(block);
  }

  return newYPos;
};

// redraw each block in it's new position, keeping it on top of
const redrawBlocks = () => {
  blocks.forEach((block) => {
    p5.push();

    p5.translate(block.x, block.y);

    block.y = block.landed ? block.y : getNewBlockY(block);

    block.rotation.x = block.landed
      ? block.rotation.x
      : block.rotation.x + 1 * block.rotation.multiplier;

    p5.rotateX(block.rotation.x);
    p5.fill(block.colour);
    p5.stroke(0);

    p5.box(block.size);

    p5.pop();
  });
};

const draw = (p5Ref, seed) => {
  // store a wider reference to prevent having to pass p5 into each function
  p5 = p5Ref;

  // reset the randomness seed each time the scene is drawn to enable deterministic rendering
  random.setSeed(seed);

  // Get a random set of 4 complimentary colours
  let colourSet = random.pick(JSON.parse(JSON.stringify(palettes)));

  colourSet = random.shuffle(colourSet);

  // Set a random BG colour, popping it off the available colour stack so it is not reused for any of the blocks
  const backgroundColor = colourSet.pop();
  p5.background(backgroundColor);

  // create array entries for the number of desired blocks
  while (blocks.length < numberOfBlocks) {
    // create a new block using a random colour
    const nextBlock = createBlock(random.pick(colourSet));

    // we have to manually track each boxes state within the blocks array
    blocks.push(nextBlock);
  }

  // for each frame, repaint each block in either the same or new position
  redrawBlocks();
};

module.exports = {
  draw,
  library
};
