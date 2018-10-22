class TextButton extends Phaser.GameObjects.Container
{
	constructor(config)
	{
		if (!config.scene)
		{
			console.log('missing scene!');
			return;
		}
		if (!config.key)
		{
			console.log('missing key!');
			return;
		}
		super(config.scene);
		this.config = config;
		this.scene = config.scene;
		this.back = this.scene.add.image(0,0, config.key);
		this.add(this.back);
		
		if (config.text)
		{
			if (config.textConfig)
			{
				this.text1 = this.scene.add.text(0,0, config.text, config.textConfig);
			}
			else
			{
				this.text1 = this.scene.add.text(0,0, config.text);
			}
			this.text1.setOrigin(0.5, 0.5);
			this.add(this.text1);
		}
		if (config.x)
		{
			this.x = config.x;
		}
		if (config.y)
		{
			this.y = config.y;
		}
		
		this.setSize(this.back.displayWidth, this.back.displayHeight);
		this.scene.add.existing(this);
		
		if (config.event)
		{
			this.back.setInteractive();
			this.back.on('pointerdown', this.pressed, this);
		}
		
		var isMobile = navigator.userAgent.indexOf("Mobile");
		if (isMobile == -1)
		{
			this.back.on('pointerover', this.over, this);
			this.back.on('pointerout', this.out, this);
		}
		
		this.hoverable = false;
	}
	
	setHoverable(isHoverable)
	{
		this.hoverable = isHoverable;
	}

	setStyle(style)
	{
		this.text1.setStyle(style);
	}
	
	setText(string)
	{
		this.text1.setText(string);
	}
	
	setVisible(isVisible)
	{
		this.back.setVisible(isVisible);
	}
	
	over()
	{
		if (this.hoverable)
		{
			this.y += 5;
			this.x += 5;
		}
	}
	
	out()
	{
		if (this.hoverable)
		{
			this.y -= 5;
			this.x -= 5;
		}
	}
	
	pressed()
	{
		this.config.event.call(this.scene);
		/*
		if (this.config.params)
		{
			emitter.emit(this.config.event, this.config.params);
		}
		else{
			emitter.emit(this.config.event);
		}
		*/
	}
}