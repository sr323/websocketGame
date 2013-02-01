var Player = function(_zombieSprite){/*Zombies will have parameters passed in.*/
	//Standard player variables
	//Will have to include an array of guns, bullets per gun, kills
	//when implemented.
	//Direction should be a number, between 0 and 7.

	//Sprite variables.
	var zombieSprite = _zombieSprite, currentSprite = 0, spriteChange = 0;
	//Player variables.
	var x = 400, y = 300, moveSpeed = 1, moved = false, direction = 6, dead = false, justMoved = false;

	//Pre-rendering canvas
	var render_canvas = document.createElement('canvas');
	render_canvas.width = 4608;
	render_canvas.height = 1024;
	var render_context = render_canvas.getContext('2d');

	render_context.drawImage(zombieSprite,0,0, render_canvas.width, render_canvas.height);

	//Append the canvas onto the gameCanvasDiv element on the HTML page to check the image is correct.
	//gameCanvasDiv.appendChild(render_canvas);

	/*Getters and setters.*/

	var getX = function(){
		return x;
	};

	var getY = function(){
		return y;
	};

	var setX = function(_x){
		x = _x;
	};

	var setY = function(_y){
		y = _y;
	};

	var getmoveSpeed = function(){
		return moveSpeed;
	};

	var setMoved = function(_moved){
		moved = _moved;
	};

	var setmoveSpeed = function(speed){
		moveSpeed = speed;
	};

	var getDir = function(){
		return direction;
	};

	var setDir = function(_dir){
		direction = _dir;
	};

	var spriteIterate = function(){
		spriteChange++;
		if(spriteChange == 15){
			if(!dead && moved){
				walk();
			}
			else if(!dead){
				stand();
			}
			else{
				die();
			}
			spriteChange = 0;
		}

		/*ZOMBIE SPRITE STATS
		  After handlers has been created then animation should begin.*/

		/*Zombie sprite dimensions:
		4608 wide. 36 sprites across.  128px for each.
		1024 high. 8 sprite rows down. 128px for each.

		row 0 - facing west.
		row 1 - facing north west.
		row 2 - facing north.
		row 3 - facing north east.
		row 4 - facing east.
		row 5 - facing south east.
		row 6 - facing south.
		row 7 - facing south west
		*/
	};

	var stand = function(){
		//first 4 columns - standing still.
		if(currentSprite < 3){
			currentSprite++;
		}
		else{
			currentSprite = 0;
		}
	};

	var walk = function(){
		//columns 5-12 - walking.
		if(currentSprite < 11 && currentSprite > 3){
			currentSprite++;
		}
		else{
			currentSprite = 4;
		}
	};

	var attack = function(){
		//columns 13-22 - attacking.
	};

	var die = function(){
		//columns 23-28 - dying.
		//columns 29-36 - head shot.
		console.log("SHould DIAE");
	};

	/*
	Problem with this currently. This should be within some sort of window/image.onload function, as this isn't. And this may be called when the image isn't ready.
	*/
	var draw = function(context){
		//Maybe have to -64 from x and y, to keep the image on it's exact x and y.
		//and not drawing from it, this would fuck collision detection.
		context.drawImage(render_canvas, //Image
			currentSprite * 128, direction * 128, /*Source image x and y*/
			128,128, /*Source image width and height*/
			x -96, y-96, /* Destination canvas x and y */
			192,192); /*Destination width and height*/
	

		spriteIterate();
		moved = false;
	};

	//Must remember to return all possible functions here.
	//Otherwise they can't be seen by other classes.
	return{
		getX:getX,
		getY:getY,
		setX:setX,
		setY:setY,
		setMoved:setMoved,
		getmoveSpeed:getmoveSpeed,
		setmoveSpeed:setmoveSpeed,
		getDir:getDir,
		setDir:setDir,
		draw:draw
	}
};