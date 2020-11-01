/* TODO: 
* - Add rotation slider to the custom settings
* - add height variance to the custom settings
* - add multiple noise height levels support 
* - add seed based randomness
*
*/

const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

let canvasWidth = 0;
let canvasHeight = 0;
let canvasMargin = 0;
let ctx;

let noiseDirUp = true;

// initial default values, but may be overridden by user selected options
let configOptions = {
    lineWidth: 1,
    seed: random.getRandomSeed(),
};

// the customisable options available to the user to modify the output
const userOptions = [

];


const drawToCanvas = (ctx, width, height, settings) => {
    ctx.lineWidth = 2;
    drawCircle(ctx, width/2, height/2);
};

const drawCircle = (ctx, centerX, centerY) => {
    const centerPos = {x: centerX, y: centerY};
    
    const totalSteps = 400;
    let arcTo = (2*Math.PI);
    
    let startArc = 0;
    let endArc = (arcTo/totalSteps)*1;
    
    const noiseStepQuantity = 18; // this should be an even number to ensure the circle closes
    const noiseSteps = generateNoiseSteps(noiseStepQuantity, totalSteps);
    ctx.beginPath();

    for (let i = 1; i <= totalSteps; i++) {
        let start = startArc;
        let end = endArc;
        let nextDelay = (1000/100)*i;

        
        setTimeout(() => {
            if (noiseSteps.includes(i)) {
                drawLineNoise(centerPos);
            } else {
                drawNextStep(ctx, centerPos, start, end, i);
                if (i === totalSteps) {
                    ctx.closePath();
                }
            }
        }, nextDelay);
            
        startArc = (arcTo/totalSteps)*i;
        endArc = (arcTo/totalSteps)*(i+1);
        // some cool effects:
        // endArc = ((arcTo/totalSteps)*i)+(arcTo/(totalSteps/i));
        // endArc = ((arcTo/totalSteps)*i)+1;
    }
}



const drawNextStep = (ctx, centerPos, arcFrom, arcTo, step) => {
    console.log(arcFrom, arcTo);
    // ctx.arc(centerPos.x, centerPos.y, 200, arcFrom, arcTo); //for a normal circle
    ctx.ellipse(centerPos.x, centerPos.y, 200, 100, 0, arcFrom, arcTo);
    ctx.stroke();
};

const drawLineNoise = (centerPos) => {
    if (noiseDirUp) {
        centerPos.y = centerPos.y-50;
    } else {
        centerPos.y = centerPos.y+50;
    }

    // toggle it for the next time
    noiseDirUp = !noiseDirUp;
};

const generateNoiseSteps = (quantity, steps) => {
    let noiseArr = [];
    while (noiseArr.length < quantity) {
        noiseArr.push(Math.floor(Math.random()*steps));

        // convert to a set and back to ensure no duplicates are added
        noiseArr = [...new Set(noiseArr)];
    }

    return noiseArr;

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
