/* TODO: 
* - add multiple noise height levels support 
*
*/

const random = require('canvas-sketch-util/random');

let noiseDirUp = true;

// initial default values, but may be overridden by user selected options
let configOptions = {
    seed: random.getRandomSeed(),
    lineWidth: 2,
    radiusX: 200,
    radiusY: 30,
    totalSteps: 400,
    rotation: 0
};

// the customisable options available to the user to modify the output
const userOptions = [

    // the x width of the circle
    {
        type: "slider",
        label: "X Radius",
        property: "radiusX",
        default: configOptions.radiusX,
        bounds: {
            min: 1,
            max: 500,
        }
    },
    {
        type: "slider",
        label: "Y Radius",
        property: "radiusY",
        default: configOptions.radiusY,
        bounds: {
            min: 1,
            max: 500,
        }
    },
    {
        type: "slider",
        label: "Rotation",
        property: "rotation",
        default: configOptions.rotation,
        bounds: {
            min: 0,
            max: 180,
        }
    },
    {
        type: "slider",
        label: "Number Of Edges",
        property: "totalSteps",
        default: configOptions.totalSteps,
        bounds: {
            min: 10,
            max: 1000,
        }
    },

];

const drawToCanvas = (ctx, width, height, settings) => {
    
    // clear the canvas
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = settings.lineWidth;
    drawCircle(ctx, width/2, height/2, settings);
};

const drawCircle = (ctx, centerX, centerY, settings) => {
    console.log(centerY);
    const centerPos = {x: centerX, y: centerY};
    
    const totalSteps = settings.totalSteps;
    let arcTo = (2*Math.PI);
    
    let startArc = 0;
    let endArc = (arcTo/totalSteps)*1;
    
    const noiseStepQuantity = 18; // this should be an even number to ensure the circle closes
    const noiseSteps = generateNoiseSteps(noiseStepQuantity, totalSteps);

    for (let i = 1; i <= totalSteps; i++) {
        let start = startArc;
        let end = endArc;
        let nextDelay = (100/100)*i;

        
        if (noiseSteps.includes((i+settings.rotation))) {
            drawLineNoise(centerPos);
        } else {
            drawNextStep(ctx, centerPos, start, end, i, settings);
            if (i === totalSteps) {
                ctx.closePath();
            }
        }
            
        startArc = (arcTo/totalSteps)*i;
        endArc = (arcTo/totalSteps)*(i+1);
        // some cool effects:
        // endArc = ((arcTo/totalSteps)*i)+(arcTo/(totalSteps/i));
        // endArc = ((arcTo/totalSteps)*i)+1;
    }
}



const drawNextStep = (ctx, centerPos, arcFrom, arcTo, step, settings) => {
    // ctx.arc(centerPos.x, centerPos.y, 200, arcFrom, arcTo); //for a normal circle
    ctx.ellipse(centerPos.x, centerPos.y, settings.radiusX, settings.radiusY, 0, arcFrom, arcTo);
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
        noiseArr.push(random.rangeFloor(1, steps));
        
        // convert to a set and back to ensure no duplicates are added
        noiseArr = [...new Set(noiseArr)];
    }

    return noiseArr;

};

const CircleNoise = (ctx, width, height, addSettings, customSettings = {}) => {
    
    random.setSeed(181038);
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
