/// <reference path="./lib/Intellisense/js-turtle_hy.ts" />
//DOCUMENTATION: https://hanumanum.github.io/js-turtle/
/*
showGrid(20);      
forward(distance)  
right(angle)       
left(angle) 	   
goto(x,y) 	       
clear() 	       
penup() 	       
pendown() 	       
reset() 	       
angle(angle)	   
width(width)       

color(r,g,b)
color([r,g,b])
color("red")
color("#ff0000")

*/
let dropSpeed = 30;
let fillSpeedFactor = 30;


let dropstart = 250; 
let dropend = -351;
let COLUMNS = 5; 
let ROWS = 1;
let COLUMN_SPACING = 50;
let ROW_SPACING = 100;
let START_X = -COLUMN_SPACING; 
let allDrops = [];
let loop;
let SPLASH_DURATION = 3; 


let fillLineCounter = 0;
let maxFillLines = 80;
let FILL_START_X = 350;
let FILL_START_Y = -350; 
let FILL_LINE_LENGTH = 700; 
let FILL_SPACING = 5; 

let frameCount = 0; 

color("Blue");
width(2);

function splash(drop) {
    if (drop.splashCounter >= SPLASH_DURATION) {
        return;
    }
    color("blue");
    width(3);
    let impactY = dropend + 5;
    goto(drop.x - 20, impactY);
    forward(10);
    goto(drop.x, impactY);
    forward(15);
    goto(drop.x + 20, impactY);
    forward(10);
    drop.splashCounter++;
}

function combinedAnimation() {
    
    drawFillStep();
    drawRainStep();
    frameCount++; 
    loop = requestAnimationFrame(combinedAnimation);
}

function drawFillStep() {
    if (fillLineCounter >= maxFillLines || frameCount % fillSpeedFactor !== 0) {
        return; 
    }
    let currentY = FILL_START_Y + (fillLineCounter * FILL_SPACING * 2);

    color("blue");
    width(8);
    
    penup();
    goto(FILL_START_X, currentY);
    pendown(); 
    left(90);
    forward(FILL_LINE_LENGTH);
    right(90); 
    forward(FILL_SPACING);
    right(90);
    forward(FILL_LINE_LENGTH);
    left(90);
    forward(FILL_SPACING);
    fillLineCounter++; 
}

function drawRainStep() {
    color("blue");
    width(2);
    
    for (let k = 0; k < allDrops.length; k++) {
        let drop = allDrops[k];
        if (drop.y <= dropend) {
            drop.y = dropstart + (k % ROWS * ROW_SPACING); 
            drop.splashCounter = 1; 
        }
        penup();
        goto(drop.x, drop.y);
        pendown(); 
        forward(15); 
        if (drop.splashCounter > 0) {
            splash(drop);
        }
        drop.y -= dropSpeed;
    }
}

function initDrops() {
    for (let c = 0; c < COLUMNS; c++) {
        for (let r = 0; r < ROWS; r++) { 
            allDrops.push({
                x: START_X + (c * COLUMN_SPACING),
                y: dropstart + (r * ROW_SPACING),
                splashCounter: 0
            });
        }
    }
}

initDrops(); 
loop = requestAnimationFrame(combinedAnimation);

