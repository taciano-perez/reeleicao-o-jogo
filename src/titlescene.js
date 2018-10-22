/** Opening title scene **/
class TitleScene extends Phaser.Scene
{
	constructor()
	{
		super('TitleScene');
		this.CONST = new Constants();
	}
	
	preload()
	{
		this.load.image('background', 'src/assets/background2.png');
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
		this.alignGrid.placeAtIndex(27, logo);
		
		// start button
		var startButton = new TextButton({
			scene: this,
			key: 'start_button',
			text: 'INICIAR',
			textConfig: this.CONST.FONT_BUTTON,
			event: this.startGame
		});
		startButton.setHoverable(true);
		this.alignGrid.placeAtIndex(60, startButton);

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