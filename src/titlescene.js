/** Opening title scene **/
class TitleScene extends Phaser.Scene
{
	constructor()
	{
		super('TitleScene');
	}
	
	preload()
	{
		this.load.image('background', 'src/assets/sky.png');
		this.load.image('logo', 'src/assets/logo.png');
		this.load.image('start_button', 'src/assets/start_button.png');
	}
	
	create()
	{
		// alignment grid
		this.alignGrid = new AlignGrid({rows:11,cols:11,scene:this});
	
		// background & logo
		var background = this.add.image(400, 300, 'background');
		this.alignGrid.placeAtIndex(60, background);
		AlignGrid.scaleToGameW(background, 1);
		AlignGrid.scaleToGameH(background, 1);
		var logo = this.add.image(200, 150, 'logo');
		AlignGrid.scaleToGameW(logo, .8);
		this.alignGrid.placeAtIndex(38, logo);
		
		// start button
		var startButton = this.add.image(200, 300, 'start_button');
		startButton.scaleX=1;
		startButton.scaleY=1;
		startButton.setInteractive();
		startButton.on("pointerup", this.startGame, this);
		AlignGrid.scaleToGameW(startButton, .4);
		this.alignGrid.placeAtIndex(93, startButton);

		// DEBUG
		//this.alignGrid.showNumbers(11, 11, game);

	}
	
	update()
	{
		
	}
	
	startGame()
	{
		this.scene.start('MainScene');
	}
}