/****************/
/*Game Variables*/
window.keys;
window.canvas;
window.backgroundCanvas;
window.backgroundContext;
window.context;
window.player;
window.preloadedimages;
window.mouseX = 400;
window.mouseY = 420;
/****************/
/*Initialisation*/

function singleinitialisation(){

	var loadedImages = new preloadedimages();


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
		},
		onKeyup: function(event){
			delete this.pressed[event.keyCode];
		}
	};

	window.onload = function(){

		window.canvas = document.getElementById("frontCanvas");
		window.context = canvas.getContext("2d");

		/*
		3rd canvas to draw the zombies coming in through the windows.
		Saves me having to calculate what parts of their body to not draw.
		*/
		window.backgroundCanvas = document.getElementById('gameCanvas');
		window.backgroundContext = window.backgroundCanvas.getContext('2d');

		backgroundContext.drawImage(loadedImages.background,0,0,backgroundCanvas.width, backgroundCanvas.height);

		player = new Player(loadedImages._zombieSprite);

		player.draw(context);

		handlers();
	}
};

function handlers(){
	/*
	 Can't add event listener to canvas, as it's not a focusable object.
	 And the arrow keys effect scrolling. So should use WASD for moving the
	 player.
	*/
	window.addEventListener('keyup', function(event) { keys.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { keys.onKeydown(event); }, false);
    //http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
    canvas.addEventListener('mousedown', checkMouseDown, false);
    canvas.addEventListener('mousemove', mouseCoords, false);
};

function checkMouseDown(event){
	//Code for firing a gun or what not.
};

function mouseCoords(event){
	var rect = canvas.getBoundingClientRect();

	window.mouseX = (event.clientX - rect.left);
	window.mouseY = (event.clientY - rect.top);
};

function mousePosition(){
	var dirx = mouseX - player.getX();
	var diry = mouseY - player.getY();
	/*
	-30 y = north
	30 y = south
	30 x = east
	-30 x = west 
	direction 0 - facing west.
	direction 1 - facing north west.
	direction 2 - facing north.
	direction 3 - facing north east.
	direction 4 - facing east.
	direction 5 - facing south east.
	direction 6 - facing south.
	direction 7 - facing south west
	*/
	if(diry < -10 && dirx < 30 && dirx > -30){
		//North
		player.setDir(2);
	}
	else if(diry > 10 && dirx < 30 && dirx > -30){
		//South
		player.setDir(6);
	}
	else if(dirx < -10 && diry < 40 && diry > -30){
		//West
		player.setDir(0);
	}
	else if(dirx > 10 && diry < 40 && diry > -30){
		//East
		player.setDir(4);
	}
	//Directions
	else if(dirx < 10 && diry < -30){
		player.setDir(1);
	}
	else if(dirx > 10 && diry < -30){
		player.setDir(3);
	}
	else if(dirx < 10 && diry > 30){
		player.setDir(7);
	}
	else if(dirx > 10 && diry > 30){
		player.setDir(5);
	}
};

/*Game initialisation and handlers should be complete*/
/*Now the game should loop at a constant 60 fps.     */
function singleupdate(){
	window.requestAnimFrame(singleupdate);
	
	checkKeyInput();

	drawElements();
};

function checkKeyInput(){
	//At the moment keys are getting priority over others.
	//Could be rectified with more if statements.
	console.log('Y: ' + player.getY() + ' X: ' + player.getX());
	//W + A
	if(keys.isDown(87) && keys.isDown(65)){
		if(player.getY()>80 && player.getX() > 14){
			player.setMoved(true);
			player.setY(player.getY() - player.getmoveSpeed());
			player.setX(player.getX() - player.getmoveSpeed());
		}
	}
	//W + D
	else if(keys.isDown(87) && keys.isDown(68)){
		if(player.getY()>80 && player.getX() > 14){
			player.setMoved(true);
			player.setY(player.getY() - player.getmoveSpeed());
			player.setX(player.getX() + player.getmoveSpeed());
		}
	}
	//S + A
	else if(keys.isDown(83) && keys.isDown(65)){
		if(player.getY()>80 && player.getX() > 14){
			player.setMoved(true);
			player.setY(player.getY() + player.getmoveSpeed());
			player.setX(player.getX() - player.getmoveSpeed());
		}
	}
	//S + D
	else if(keys.isDown(83) && keys.isDown(68)){
		if(player.getY()>80 && player.getX() > 14){
			player.setMoved(true);
			player.setY(player.getY() + player.getmoveSpeed());
			player.setX(player.getX() + player.getmoveSpeed());
		}
	}
	//W
	else if(keys.isDown(87)){
		if(player.getY()>81){
			player.setMoved(true);
			//player.setDir(2);
			player.setY(player.getY() - player.getmoveSpeed());
		}
	}
	//A
	else if(keys.isDown(65)){
		if(player.getX() > 15){
			player.setMoved(true);
			//player.setDir(0);
			player.setX(player.getX() - player.getmoveSpeed());
		}
	}
	//S
	else if(keys.isDown(83)){
		if(player.getY() <545){
			player.setMoved(true);
			//player.setDir(6);
			player.setY(player.getY() + player.getmoveSpeed());
		}
	}
	//D
	else if(keys.isDown(68)){
		if(player.getX()<785){
			player.setMoved(true);
			//player.setDir(4);
			player.setX(player.getX() + player.getmoveSpeed());
		}
	}
};

function drawElements(){
	/*This could slow it down, this only catches a minor problem at the star.
	Could be removed without consequence.*/
	if(typeof context !== 'undefined'){
		mousePosition();

		context.clearRect(0,0, canvas.width, canvas.height);

		context.drawImage(backgroundCanvas, 0, 0, canvas.width, canvas.height);

		player.draw(context);
	}
};