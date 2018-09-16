var game;

window.onload = function()
{
	var isMobile = navigator.userAgent.indexOf("Mobile");
	if (isMobile == -1)
	{
		isMobile = navigator.userAgent.indexOf("Tablet");
	}
	var w = 400;
	var h = 600;
	if (isMobile != -1)
	{
		w = window.innerWidth;
		h = window.innerHeight;
	}

	var config = {
		type: Phaser.AUTO,
		width: w,
		height: h,
		scene: [TitleScene, MainScene]
	};

	game = new Phaser.Game(config);
	
}

