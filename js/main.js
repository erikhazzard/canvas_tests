// ===========================================================================
// main.js
// -------
// Contains javascript functions and function calls for the site.  Assumes
//  lib.js is included
//
// ===========================================================================
//---------------------------------------
//draw():
//  parameters: none
//  description: draws a circle bouncing
//---------------------------------------
function draw(){
    //Clear the canvas
    clear();

    var radius = 20;

    //Get a local copy of some variables we'll use
    x = CANVAS_APP.canvas_objects.circle.x;
    y = CANVAS_APP.canvas_objects.circle.y;
    dx = CANVAS_APP.canvas_objects.circle.dx;
    dy = CANVAS_APP.canvas_objects.circle.dy;

    //Draw a circle (the ball) with the x,y
    draw_circle(
        x,
        y,
        radius);

    //Draw the paddle
    draw_rect(
        CANVAS_APP.canvas_objects.pad.x,
        CANVAS_APP.canvas_objects.pad.y,
        CANVAS_APP.canvas_objects.pad.width,
        CANVAS_APP.canvas_objects.pad.height
    );

    //Check for X
    if(x+dx >= CANVAS_APP.width-radius || x+dx < 0+radius){
        //Update dx
        CANVAS_APP.canvas_objects.circle.dx = -dx;
    }

    //Check for Y
    if(y+dy < 0+radius){
        //Ball hit the ceiling
        //Update dy
        CANVAS_APP.canvas_objects.circle.dy = -dy;
    }
    else if(y+dy >= CANVAS_APP.height-radius){
        //Ball hit the floor
        //See if the ball hit the paddle
        if(x>CANVAS_APP.canvas_objects.pad.x &&
            x<CANVAS_APP.canvas_objects.pad.x
            +CANVAS_APP.canvas_objects.pad.width){
            $('canvas_element').highlight();
            $('game_log').set('html', $('game_log').get('html')
                + '| ');
        }
        //Update dy
        CANVAS_APP.canvas_objects.circle.dy = -dy;
    }

    //Update the x,y values of the CANVAS_APP object
    CANVAS_APP['canvas_objects']['circle']['x'] 
        += CANVAS_APP.canvas_objects.circle.dx;
    CANVAS_APP['canvas_objects']['circle']['y'] += 
        CANVAS_APP.canvas_objects.circle.dy;
}


//---------------------------------------
//init():
//  parameters: none
//  description: initializes canvas stuff
//---------------------------------------
function init(){
    //Setup the canvas object
    setup_canvas_app_object('canvas_element');
    setInterval(draw, 1);
}

// ===========================================================================
//
// Page Load
//
// ===========================================================================
// On page load, call all the corresponding functions
window.addEvent('domready', function(){
    //Call the initialize function
    init();
});
