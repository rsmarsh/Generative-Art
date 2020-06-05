const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// initial default values, but may be overridden by user selected options
let configOptions = {
    gridSize: 6,
    lineWidth: 10,
    seed: random.getRandomSeed()
};

// the customisable options available to the user to modify the output
const userOptions = [

    // the number of points on the grid on each x/y axis
    {
        type: "slider",
        label: "Grid Size",
        property: "gridSize",
        default: configOptions.gridSize,
        bounds: {
            min: 2,
            max: 30,
        }
    },

    // the thickness of the lines
    {
        type: "number",
        label: "Line Width",
        property: "lineWidth",
        default: configOptions.lineWidth
    },
    
];


const Vennlines = (ctx, width, height, addSettings, customSettings = {}) => {
    
    random.setSeed(configOptions.seed);
    
    const palette = random.shuffle(random.pick(palettes));

    // merge in and overwrite any default settings with the user defined settings
    let artSettings = {...configOptions, ...customSettings};
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

    // create an equal x/y grid
    for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {

            // add initial object to each grid cell, representing which sides are untouched
            cells.push({
                x: row,
                y: col,
                top: false,
                right: false,
                bottom: false,
                left: false
            });

        }
    }

    return cells;
};

const drawToCanvas = (ctx, width, height, settings) => {

    let cellGrid = createGrid(settings.gridSize);
    console.log('grid is');
    console.log(cellGrid)
    const margin = 0; // width * 0.05;

    // pick one random colour from the array of colours
    const fillColour = random.pick(random.pick(palettes));

    let startX = lerp(margin, width - margin, 0.5);
    let startY = lerp(margin, height - margin, 0.5);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(100, 200);

    // stroke with a background colour
    ctx.strokeStyle = fillColour;
    ctx.lineWidth = settings.lineWidth;
    ctx.fillStyle = settings.color;
    ctx.fill();

    ctx.closePath();
    ctx.stroke();

};

const startNewLine = (startCell) => {
    let startingCell = getEntryPoint();

};


/**
 * This function returns an Array of the available moves within the provided cell coordinates
 * 
 * @param {Number} x - the x coordinate of the current cell
 * @param {*} y - the y coordinate of the current cell
 */
const getPossibleSegments = (cell) => {
    // self
    // x,y

    // above
    //x, y-1

    // right
    //x+1, y

    // below
    // x, y+1

    // left
    // x-1, y

    return 
};

/**
 *  Applies a direction to the coordinates, returning the adjusted coordinates within an array [x, y]
 */ 
const applyDirectionToCoords = (x, y, direction) => {
    switch(direction) {
        case 'top':
            return [x, y-1];
        case 'right':
            return [x+1, y];
        case 'bottom':
            return [x, y+1];
        case 'left':
            return [x-1, y];
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
    let [adjustedX, adjustedY] = applyDirectionToCoords(cell.x, cell.y, direction);
    return getCell(adjustedX, adjustedY);
};

const getEntryPoint = () => {

};

/**
 * Gets a single cell object at the provided position
 * 
 * @param {Number} x - x grid position
 * @param {Number} y - y grid position
 */
const getCell = (x,y) => {

};

export default Vennlines;