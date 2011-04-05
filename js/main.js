// ===========================================================================
// main.js
// -------
// Contains javascript functions and function calls for the site.  Assumes
//  lib.js is included
//
// ===========================================================================
//---------------------------------------
//create_brick_objects():
//  parameters: cols: number of columns of bricks
//              rows: number of rows of bricks
//     
//  description: create a brick array in CANVAS_APP.canvas_objects.bricks
//---------------------------------------
function create_brick_objects(cols,rows){
    //Creates a multidimensional array of brick objects with cols and rows
    CANVAS_APP.canvas_objects.bricks.width = CANVAS_APP.width / cols;
    CANVAS_APP.canvas_objects.bricks.height = 20;
    CANVAS_APP.canvas_objects.bricks.padding = 1;
    CANVAS_APP.canvas_objects.bricks.rows = rows;
    CANVAS_APP.canvas_objects.bricks.columns= cols;
    CANVAS_APP.canvas_objects.bricks.objects = []
    for(i=0; i<rows; i++){
        CANVAS_APP.canvas_objects.bricks.objects[i] = []
        for(j=0; j<cols; j++){
           CANVAS_APP.canvas_objects.bricks.objects[i][j] = 1; 
        }
    }
}
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

    //-----------------------------------
    //Draw Circle
    //-----------------------------------
    //Draw a circle (the ball) with the x,y
    draw_circle(
        x,
        y,
        radius);

    //-----------------------------------
    //Setup and Draw Paddle
    //-----------------------------------
    //Move the paddle on user input
    if(CANVAS_APP.keys_pressed.right === true){
        //Make sure we don't move off the canvas
        if(CANVAS_APP.canvas_objects.pad.x + 
            CANVAS_APP.canvas_objects.pad.width <=
            CANVAS_APP.width){
            CANVAS_APP.canvas_objects.pad.x += 10;
        }
    }
    if(CANVAS_APP.keys_pressed.left === true){
        //Make sure it doesn't go to the left of the canvas
        if(CANVAS_APP.canvas_objects.pad.x >= 0){
            CANVAS_APP.canvas_objects.pad.x -= 10;
        }
    }
    //Draw the paddle
    draw_rect(
        CANVAS_APP.canvas_objects.pad.x,
        CANVAS_APP.canvas_objects.pad.y,
        CANVAS_APP.canvas_objects.pad.width,
        CANVAS_APP.canvas_objects.pad.height
    );

    //-----------------------------------
    //Draw bricks
    //-----------------------------------
    bricks = CANVAS_APP.canvas_objects.bricks;
    for(i=bricks.objects.length-1; i>=0; i--){
        for(j=bricks.objects[i].length-1; j>=0; j--){
            //If the brick isn't broken
            if(bricks.objects[i][j] === 1){
                //Draw a brick
                draw_rect( j * (bricks.width + bricks.padding),
                    i * (bricks.height + bricks.padding),
                    bricks.width,
                    bricks.height
                );
            }
        }
    }

    //-----------------------------------
    //Move the ball
    //-----------------------------------
    //Check for X
    if(x+dx >= CANVAS_APP.width-radius || x+dx < 0+radius){
        //Update dx
        CANVAS_APP.canvas_objects.circle.dx = -dx;
    }

    //Check to see if ball hit a brick
    //  If the ball's y is less than or equal to the height of all the
    //  brick objects combined
    if( (y>0) &&
        y < ((bricks.height + bricks.padding) * bricks.rows)){
        //Now we can start checking to see what col / row the ball is in    
        //  Check first for the ball's Y position
        cur_row = Math.floor(y/(bricks.padding + bricks.height));
        cur_col = Math.floor(x/(bricks.padding + bricks.width));
        //  And again for it's y+width position, to see if we hit multiple
        //  bricks
        cur_row_width = Math.floor(
            (y+radius)/(
            bricks.padding + bricks.height));
        cur_col_width = Math.floor(
            (x+radius)/(
            bricks.padding + bricks.width));

        //Make sure that the current col and row from the y/x+radius actually
        //  exists
        if(cur_row_width >= bricks.rows){
            cur_row_width -= 1;
        }
        if(cur_col_width >= bricks.colums){
            cur_col_width -= 1;
        }

        //Keep track if we should reverse the direction
        var reverse_direction = false;
        if(cur_row >= 0 && cur_col >= 0 &&
                bricks.objects[cur_row][cur_col] === 1){
            //Break the current brick
            CANVAS_APP.canvas_objects.bricks.objects[cur_row][cur_col] = 0;
            //We hit a brick, so reverse the direction after these checks
            reverse_direction = true;
        }
        if(cur_row_width >= 0 && cur_col_width >= 0
            && bricks.objects[cur_row_width][cur_col_width] === 1){
            //Break the current brick
            CANVAS_APP.canvas_objects.bricks.objects[cur_row_width][cur_col_width] = 0;
            //We hit a brick, so reverse the direction after these checks
            reverse_direction = true;
        }
        if(reverse_direction === true){
            //Reverse the ball
            CANVAS_APP.canvas_objects.circle.dy = -dy;
        }
    }
    else if(y+dy < 0+radius){
        //Check to see if ball hit the ceiling
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

function setup_key_events(){
    //Key pressed
    window.addEvent('keydown', function(event){
        //Key code could be a variable configured by users
        if(event.key === 'a' || event.key === 'left'){
            CANVAS_APP.keys_pressed.left = true;
        }
        if(event.key === 'd' || event.key === 'right'){
            CANVAS_APP.keys_pressed.right = true;
        }
    });

    //Key released
    window.addEvent('keyup', function(event){
        //Key code could be a variable configured by users
        if(event.key === 'a' || event.key === 'left'){
            CANVAS_APP.keys_pressed.left = false;
        }
        if(event.key === 'd' || event.key === 'right'){
            CANVAS_APP.keys_pressed.right= false;
        }
    });
}


//---------------------------------------
//init():
//  parameters: none
//  description: initializes canvas stuff
//---------------------------------------
function init(){
    //Setup the canvas object
    setup_canvas_app_object('canvas_element');

    //Create bricks
    create_brick_objects(5,1);

    //Setup user input
    setup_key_events();
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
