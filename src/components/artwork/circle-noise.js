// TODO:
/*
Notable seeds:
 181038 - grid size 2, the bottom left square has an overlapping entry point from the same line
 777450 - has some full grids on some sizes
*/


const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

let canvasWidth = 0;
let canvasHeight = 0;
let canvasMargin = 0;
let ctx;

// initial default values, but may be overridden by user selected options
let configOptions = {
    lineWidth: 16,
    seed: random.getRandomSeed(),
};

// the customisable options available to the user to modify the output
const userOptions = [

];


const drawToCanvas = (ctx, width, height, settings) => {

};


const CircleNoise = (ctx, width, height, addSettings, customSettings = {}) => {
    
    // random.setSeed(181038);
    console.log(`seed: ${random.getSeed()}`);
    
    // merge in and overwrite any default settings with the user defined settings
    let artSettings = {...configOptions, ...customSettings};
    drawToCanvas(ctx, width, height, artSettings);

    createSettings(addSettings);

};



// trigger the callback with al of the customisation options
const createSettings = (addSettings) => {
    addSettings(userOptions);
};



export default CircleNoise;
