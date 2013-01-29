/*****************/
/*Game Variables**/

var keys, canvas, context;

/****************/
/*Initialisation*/

function singleinitialisation(){
	//Keys variable. As an object literal full of name:value pairs.
	keys = {
		//Pressed array, holds true or nothing for keys which are pressed down.
		pressed:{},
		//Creates a variable which references a function.
		//To trigger the function the syntax needs to be "function(event){keys.isDown(event);}"
		isDown: function(keyCode){
			return this.pressed[keyCode];
		},
		onKeydown: function(event){
			this.pressed[event.keyCode] = true;
			alert(event.keyCode);
		},
		onKeyup: function(event){
			delete this.pressed[event.keyCode];
		}
	};

	canvas = document.getElementById("gameCanvas");
	canvas.addEventListener("mousedown", mouseDown, false);
	context = canvas.getContext("2d");
	
	var background = new Image();
	background.onload = function(){
		context.drawImage(background,0,0);/*0,0 x and y of the canvas.*/
	};
	background.src = "../Images/welcome.jpg";
};

function mouseDown(event){
	alert("x - " + event.pageX + " y - " + event.pageY);
}