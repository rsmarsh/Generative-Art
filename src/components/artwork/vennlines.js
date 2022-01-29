// TODO:
/*
Notable seeds:
 181038 - grid size 2, the bottom left square has an overlapping entry point from the same line
 777450 - has some full grids on some sizes
*/

const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// initialise the empty grid of cells
let cellGrid = [];
let gridSize = 0;
let canvasWidth = 0;
let canvasHeight = 0;
let canvasMargin = 0;
let ctx;

// initial default values, but may be overridden by user selected options
let configOptions = {
  shadowEffect: true,
  gridSize: 12,
  lineWidth: 18,
  lineStyle: 'arc',
  seed: random.getRandomSeed(),
  lineOutlineSize: 10,
  randomLineColours: true,
  colouredBackground: true
};

// the customisable options available to the user to modify the output
const userOptions = [
  // the number of points on the grid on each x/y axis
  {
    type: 'slider',
    label: 'Grid Size',
    property: 'gridSize',
    default: configOptions.gridSize,
    bounds: {
      min: 2,
      max: 30
    }
  },

  // the thickness of the lines
  {
    type: 'number',
    label: 'Line Width',
    property: 'lineWidth',
    default: configOptions.lineWidth
  },

  // whether to show shadows
  {
    type: 'checkbox',
    label: 'Show Shadows (3D Effect)',
    property: 'shadowEffect',
    default: configOptions.shadowEffect
  },

  // whether a grid should be drawn on the canvas
  {
    type: 'checkbox',
    label: 'Show Grid',
    property: 'showGrid',
    default: configOptions.showGrid
  },

  // different visual styles for the lines
  {
    type: 'select',
    label: 'Line Type',
    property: 'lineStyle',
    default: configOptions.lineStyle,
    options: [
      {
        label: 'Straight',
        value: 'straight'
      },
      {
        label: 'Curved',
        value: 'arc',
        selected: true
      }
    ]
  },

  {
    type: 'checkbox',
    label: 'Random Line Colours',
    property: 'randomLineColours',
    default: configOptions.randomLineColours
  },

  {
    type: 'checkbox',
    label: 'Coloured Background',
    property: 'colouredBackground',
    default: configOptions.randomLineColours
  },

  {
    type: 'slider',
    label: 'Line Outline Size',
    property: 'lineOutlineSize',
    default: configOptions.lineOutlineSize,
    bounds: {
      min: 0,
      max: 30
    }
  }

  // TODO: rounded corners checkbox
];

// TODO: Identify bug causing shared edges on large grids

const TruchetLines = (ctx, width, height, addSettings, customSettings = {}, seed) => {
  random.setSeed(seed);
  console.log(`seed: ${random.getSeed()}`);

  // merge in and overwrite any default settings with the user defined settings
  let artSettings = { ...configOptions, ...customSettings };
  drawToCanvas(ctx, width, height, artSettings);

  createSettings(addSettings);
};

// trigger the callback with al of the customisation options
const createSettings = (addSettings) => {
  addSettings(userOptions);
};

// creates a grid of points which are used as anchor points for each shape
const createGrid = (gridSize) => {
  const cells = [];
  const count = gridSize;

  // so that cells can be identified as touching the edge
  const edge = count - 1;

  // create an equal x/y grid
  for (let row = 0; row < count; row++) {
    cells[row] = [];
    for (let col = 0; col < count; col++) {
      // add initial object to each grid cell, representing which sides are untouched
      cells[row][col] = {
        x: col,
        y: row,
        top: false,
        right: false,
        bottom: false,
        left: false,
        edge: false
      };

      // flip the edge boolean so that edge pieces can be easily found
      if (row === 0 || row === edge || col === 0 || col === edge) {
        cells[row][col].edge = true;

        // find which edge of the cell is touching a side
        let touching;
        if (row === 0) {
          touching = 'top';
        } else if (row === edge) {
          touching = 'bottom';
        } else if (col === 0) {
          touching = 'left';
        } else if (col === edge) {
          touching = 'right';
        } else {
          console.error('edge piece without an identifiable side');
        }
        cells[row][col].touching = touching;
      }
    }
  }

  return cells;
};

const drawToCanvas = (canvasCtx, width, height, settings) => {
  // reassign global vars each redraw
  ctx = canvasCtx;
  gridSize = settings.gridSize;
  cellGrid = createGrid(gridSize);
  canvasWidth = width;
  canvasHeight = height;
  canvasMargin = 0; //width * 0.05;

  let singlePalette = random.pick(JSON.parse(JSON.stringify(palettes)));

  let backgroundColor = '#fff';

  if (settings.colouredBackground) {
    // pop this so that a line does not end up using the same as a background colour
    backgroundColor = singlePalette.pop();
  }

  let fillColour = random.pick([...singlePalette]);

  // clear the canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  if (settings.showGrid) {
    drawGrid();
  }

  let edgeCell = getFreeEdgeCell();

  while (edgeCell) {
    // even though this might not be used, this saves the seed based randomness so that activating it keeps the same pattern
    let randomLineColour = random.pick(singlePalette);
    if (settings.randomLineColours) {
      fillColour = randomLineColour;
    }

    drawNewLine(edgeCell, { ...settings, fillColour, backgroundColor });
    edgeCell = getFreeEdgeCell();
  }
};

const drawGrid = () => {
  const cellSize = getCellSize();

  ctx.beginPath();

  ctx.lineWidth = '1';
  ctx.strokeStyle = 'black';

  // vertical lines
  for (let v = 0; v < gridSize; v++) {
    ctx.moveTo(v * cellSize, 0);
    ctx.lineTo(v * cellSize, canvasHeight);
  }

  // horizontal lines
  for (let h = 0; h < gridSize; h++) {
    ctx.moveTo(0, h * cellSize);
    ctx.lineTo(canvasWidth, h * cellSize);
  }

  ctx.stroke();
};

const getFreeEdgeCell = () => {
  // pick a random cell from the cellgrid where the cell is touching an edge
  let cell = random.pick(cellGrid.flat().filter((cell) => cell.edge));

  // when no edge pieces remain, stop create new lines
  if (!cell) {
    return false;
  }

  // prevent this square from being used an an edge again
  cell.edge = false;

  return cell;
};

const drawNewLine = (nextCell, settings) => {
  let lineLength = 0;
  const maxLineLength = settings.maxLineLength || Infinity;
  let firstCell = true;
  let fromSide = nextCell.touching;

  ctx.beginPath();

  while (nextCell && lineLength < maxLineLength) {
    // an adjacent cell andnext direction is returned if available
    let { adjacentCell, adjacentDirection } = drawNextSegment(
      nextCell,
      fromSide,
      firstCell,
      settings.lineStyle
    );

    nextCell = adjacentCell;
    fromSide = adjacentDirection;

    firstCell = false;
    lineLength += 1;

    // draw the line shadow with the background colour
    if (settings.lineOutlineSize > 0) {
      ctx.strokeStyle = settings.backgroundColor;
      ctx.lineWidth = settings.lineWidth + settings.lineOutlineSize;
      ctx.stroke();
    }

    if (settings.shadowEffect) {
      ctx.shadowColor = 'rgba(0, 0, 0, .25)';
      ctx.shadowOffsetX = -4;
      ctx.shadowOffsetY = 8;
      ctx.shadowBlur = 10;
    }

    // stroke with the foreground line colour
    ctx.strokeStyle = settings.fillColour;
    ctx.lineWidth = settings.lineWidth;
    ctx.fillStyle = settings.color;
    ctx.stroke();

    // disable the shadow for the line outline
    if (settings.shadowEffect) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    }
  }
};

const drawNextSegment = (startCell, fromSide, isFirstSegment, lineStyle) => {
  let finalSegment = false;
  let finalCell;
  let finalDirection;
  // each section of a line targets an adjacent segment
  let { adjacentCell, direction } = getFreeAdjacentCell(startCell);
  let adjacentDirection;

  // mark these two connecting sides as used
  startCell[direction] = true;

  // if this is the first segment, we need to explicitly mark the entry point as used
  if (isFirstSegment) {
    startCell[fromSide] = true;
  }

  // the end has been reached and no available adjacent cells exist, however there may be one left within this cell before ending
  if (!adjacentCell) {
    finalSegment = true;

    let freeSide = getFreeSide(startCell);

    if (!freeSide) {
      return false;
    }

    finalCell = startCell;
    finalDirection = freeSide;
  }

  if (!finalSegment) {
    // the direction which the line will enter the adjacent cell from
    adjacentDirection = getOppositeDirection(direction);
    adjacentCell[adjacentDirection] = true;
  }

  let [startX, startY] = getDrawPosFromCell(startCell, fromSide);
  let [endX, endY] = getDrawPosFromCell(
    adjacentCell || finalCell,
    adjacentDirection || finalDirection
  );

  if (isFirstSegment) {
    ctx.moveTo(startX, startY);
    isFirstSegment = false;
  }

  switch (lineStyle) {
    case 'arc':
      drawArcLine(
        startCell,
        fromSide,
        direction || finalDirection,
        { x: startX, y: startY },
        { x: endX, y: endY }
      );
      break;
    case 'straight':
    default:
      ctx.lineTo(endX, endY);
  }

  return { adjacentCell, adjacentDirection };
};

const drawArcLine = (cell, fromSide, toSide, start, end) => {
  // draw a typical straight line if this isn't a curved segment
  if (!toSide || fromSide === getOppositeDirection(toSide)) {
    ctx.lineTo(end.x, end.y);
    return;
  }

  let circleX;
  let circleY;

  let xDiff = end.x - start.x;
  let yDiff = end.y - start.y;

  // required by the arc calculation function
  let headingRight;

  // long winded but readable way of determining which corner the circles center point needs to be in
  // is the arc going to the right
  if (xDiff > 0) {
    headingRight = true;
    if (toSide !== 'right') {
      // then the curve is going from the left to the top or bottom
      // the circles X will be on the left of the cell
      circleX = 0;
    } else {
      // the exit point is on the right
      circleX = 1;
    }
  } else {
    if (toSide !== 'left') {
      // then the curve is going from the right to the top or bottom
      // the circles X will be on the right of the cell
      circleX = 1;
    } else {
      circleX = 0;
    }
  }

  // heading from the top or middle downwards
  if (yDiff > 0) {
    if (toSide !== 'bottom') {
      circleY = 0;
    } else {
      circleY = 1;
    }
    // heading from the bottom or middle upwards
  } else {
    if (toSide !== 'top') {
      circleY = 1;
    } else {
      circleY = 0;
    }
  }

  const [cellX, cellY] = getDrawPosFromCell(cell);
  const halfCellSize = getCellSize() / 2;
  const circleCenterX = circleX > 0.5 ? cellX + halfCellSize : cellX - halfCellSize;
  const circleCenterY = circleY > 0.5 ? cellY + halfCellSize : cellY - halfCellSize;

  // get which quater of the arc needs to be drawn within this cell
  const [arcStart, arcEnd, antiClockwise] = convertCornersToAngle(
    [circleX, circleY],
    headingRight
  );

  //draw the circle at circleX/Y

  ctx.arc(circleCenterX, circleCenterY, halfCellSize, arcStart, arcEnd, antiClockwise);
  // ctx.moveTo(end.x, end.y);
};

const convertCornersToAngle = (pos, headingRight) => {
  let start;
  let end;
  let antiClockwise = false;

  // there are 4 different varieties of arrays which can be passed into here
  // each one represents a different corner of a cell which needs to be converted into an start/end arc angle
  if (!pos[0] && !pos[1]) {
    // top left origin, bottom right arc needed
    start = 0;
    end = Math.PI * 0.5;
  } else if (pos[0] && !pos[1]) {
    // top right origin, bottom left arc needed
    start = Math.PI * 0.5;
    end = Math.PI;
  } else if (pos[0] && pos[1]) {
    // bottom right origin, top left arc needed
    start = Math.PI * 1.5;
    end = Math.PI;
    antiClockwise = true;
  } else if (!pos[0] && pos[1]) {
    // bottom left origin, top right arc needed
    start = 0;
    end = Math.PI * 1.5;
    antiClockwise = true;
  }

  // glad I thought of these before adding a load of conditionals
  // if we are heading in the right direction, we need to flip the direction of the arc so that the pointer ends in the correct location
  if (headingRight) {
    let storeEnd = end;
    end = start;
    start = storeEnd;
    antiClockwise = !antiClockwise;
  }

  return [start, end, antiClockwise];
};

/**
 *  Applies a direction to the coordinates, returning the adjusted coordinates within an array [x, y]
 */
const applyDirectionToCellIndex = (x, y, direction) => {
  switch (direction) {
    case 'top':
      return [x, y - 1];
    case 'right':
      return [x + 1, y];
    case 'bottom':
      return [x, y + 1];
    case 'left':
      return [x - 1, y];
    default:
      return false;
  }
};

/**
 * Provide a cell and a direction, and this will return the corresponding cell object if possible
 * @param {Object} cell
 * @param {String} direction - 'top', 'right', 'down' or 'left'
 */
const getAdjacentCell = (cell, direction) => {
  let [adjustedX, adjustedY] = applyDirectionToCellIndex(cell.x, cell.y, direction);
  return getCell(adjustedX, adjustedY);
};

/**
 *
 * @param {Object} cell - the cell to find a free side within
 */
const getFreeSide = (cell) => {
  let directions = random.shuffle(['top', 'right', 'bottom', 'left']);

  while (directions.length > 0) {
    let randomDirection = directions.pop();

    // one free side found
    if (cell[randomDirection] === false) {
      cell[randomDirection] = true;
      return randomDirection;
    }
  }

  // if no free sides were available
  return false;
};

const getFreeAdjacentCell = (cell, exclude) => {
  let directions = ['top', 'right', 'bottom', 'left'];
  directions.filter((direction) => direction !== exclude);
  directions = random.shuffle(directions);

  while (directions.length > 0) {
    let nextDirection = directions.pop();
    // the direction that the adjacent cell will be entered from is needed to check for a free entry direction
    let originDirection = getOppositeDirection(nextDirection);

    let adjacentCell = getAdjacentCell(cell, nextDirection);

    // if undefined, then this is an index which is off the edge of the grid
    if (!adjacentCell) {
      continue;
    }

    // if a non-used side of an adjacent cell is found, return it
    if (adjacentCell[originDirection] === false) {
      return {
        adjacentCell,
        direction: nextDirection
      };
    }
  }

  // if this is reached, then there are no more adjacent cells free
  return false;
};

const getOppositeDirection = (direction) => {
  switch (direction) {
    case 'top':
      return 'bottom';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    default:
      console.error('no direction provided');
  }
};

/**
 * Gets a single cell object at the provided position
 *
 * @param {Number} x - x grid position
 * @param {Number} y - y grid position
 *
 * @returns {Object|Boolean} return the cell object if found, otherwise return false/undefined
 */
const getCell = (x, y) => {
  // detect cells which are outside of the range by returning false
  if (!cellGrid[y]) {
    return false;
  }

  return cellGrid[y][x];
};

const getCellSize = () => {
  // find out the exact size of each square, after removing the side margins
  const drawAreaSize = canvasWidth - canvasMargin * 2;
  const cellSize = drawAreaSize / gridSize;
  return cellSize;
};

/**
 *
 * @param {Object} cell - the cell to get a position within
 * @param {*} position - the exact position within the cell to use
 *
 * @returns {Array} the x+y coordinates referring to the cell and position requested
 */
const getDrawPosFromCell = (cell, position) => {
  let x = cell.x / gridSize;
  let y = cell.y / gridSize;

  // convert to canvas based positioning
  x = lerp(canvasMargin, canvasWidth, x);
  y = lerp(canvasMargin, canvasHeight, y);

  const cellSize = getCellSize();

  // adjust the pixel coordinates to be at the requested position
  switch (position) {
    case 'top':
      x += cellSize / 2;
      break;
    case 'right':
      x += cellSize;
      y += cellSize / 2;
      break;
    case 'bottom':
      x += cellSize / 2;
      y += cellSize;
      break;
    case 'left':
      y += cellSize / 2;
      break;
    default:
      // get the center position of the cell if no specific side provided
      x += cellSize / 2;
      y += cellSize / 2;
      break;
  }

  return [x, y];
};

export default TruchetLines;
