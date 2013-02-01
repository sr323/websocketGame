var preloadedimages = function(){
	
		var background = new Image();
		background.src = "../Images/hauntedHouseWithoutWindows.png";

		var _zombieSprite = new Image();
		_zombieSprite.src = "../Images/zombie_sprite.png";

		return{
			background:background,
			_zombieSprite:_zombieSprite
		}
};

/*

If the images still cause an issue with the page, by them not loading -although they should as the javascript should be sequentially- then the images could be 
placed in a series of *.onload = function(){ *.onload = function(){ and then the rest of the code could be placed here. } }

*/