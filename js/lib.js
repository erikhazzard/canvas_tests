// ===========================================================================
// lib.js
// -------
// Contains functions to make working with canvas easier
//
// ===========================================================================
//---------------------------------------
//Global app object which contains reference to the canvas context
//---------------------------------------
var CANVAS_APP = {}

//---------------------------------------
//create_canvas_app_object():
//  parameters: canvas_element: id of the canvas element
//  description: sets up the CANVAS_APP object
//---------------------------------------
function setup_canvas_app_object(canvas_element, canvas_objects){
    //Set up canvas_element variable if nothing was passed in
    if(canvas_element === undefined){
        canvas_element = 'canvas_element';
    }

    //Configure the global CANVAS_APP object
    CANVAS_APP['context'] = document.getElementById(canvas_element).getContext('2d');
    CANVAS_APP['width'] = document.getElementById(canvas_element).width;
    CANVAS_APP['height'] = document.getElementById(canvas_element).height;
    CANVAS_APP['keys_pressed'] = {
        'down': false,
        'left': false,
        'right': false,
        'up': false
    };

    //Additional config.  If no objects were passed in, create some
    if(canvas_objects === undefined){
        CANVAS_APP['canvas_objects'] = {
            'circle': {
                'x': 20,
                'y': 200,
                'dx': 2,
                'dy': 2,
            },
            'pad': {
                'height': 10,
                'width': 75,
                'x': CANVAS_APP.width / 2,
                'y': CANVAS_APP.height - 10
            },
            'bricks': {
                'columns': 0,
                'height': 0,
                'objects': undefined,
                'padding': 1,
                'rows': 0,
                'width': 0
            }
        };
    } else{
        CANVAS_APP['canvas_objects'] = canvas_objects;
    }

}

//---------------------------------------
//draw_circle():
//  parameters: x: x position
//              y: y position
//              r: radius
//  description: draws a circle
//---------------------------------------
function draw_circle(x,y,r){
    CANVAS_APP.context.beginPath();
    CANVAS_APP.context.arc(x,y,r,0,Math.PI*2,true);
    CANVAS_APP.context.closePath();
    CANVAS_APP.context.fill();
}
//---------------------------------------
//draw_rect():
//  parameters: x: x position
//              y: y position
//              w: width 
//              h: height
//  description: draws a rectangle 
//---------------------------------------
function draw_rect(x,y,w,h){
    CANVAS_APP.context.beginPath();
    CANVAS_APP.context.rect(x,y,w,h);
    CANVAS_APP.context.closePath();
    CANVAS_APP.context.fill();
}

//---------------------------------------
//clear():
//  parameters: none
//  description: clears the canvas
//---------------------------------------
function clear(){
    CANVAS_APP.context.clearRect(
        0,
        0,
        CANVAS_APP.width,
        CANVAS_APP.height);
}
