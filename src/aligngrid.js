class AlignGrid
{
	constructor(config)
	{
		this.config = config;
		if (!config.scene)
		{
			console.log("missing scene!");
			return;
		}
		if (!config.rows)
		{
			config.rows = 5;
		}
		if (!config.cols)
		{
			config.cols = 5;
		}
		if (!config.height)
		{
			config.height = game.config.height;
		}
		if (!config.width)
		{
			config.width = game.config.width;
		}
		
		// make a class level reference to the scene
		this.scene = config.scene;
		
		// cell width & height
		this.cw = config.width / config.cols;
		this.ch = config.height / config.rows;

	}
	
	show()
	{
		this.graphics = this.scene.add.graphics();
		this.graphics.lineStyle(1,0xFF00FF, 1);
		
		// vertical lines
		for (var i=0; i<this.config.width; i+= this.cw)
		{
			this.graphics.moveTo(i,0);
			this.graphics.lineTo(i,this.config.height);		
		}

		// horizontal lines
		for (var i=0; i<this.config.height; i+= this.ch)
		{
			this.graphics.moveTo(0,i);
			this.graphics.lineTo(this.config.width, i);
		}
		this.graphics.strokePath();
	}
	
	showNumbers()
	{
		this.show();
		var count = 0;
		for (var i=0; i<this.config.rows; i++)
		{
			for (var j=0; j<this.config.cols; j++)
			{
				var numText = this.scene.add.text(0,0,count, {color: '#ff0000'});
				numText.setOrigin(0.5, 0.5);
				this.placeAtIndex(count, numText);
				count++;
			}
		}
	}
	
	placeAtIndex(index, obj)
	{
		var yy = Math.floor(index / this.config.cols);
		var xx = index - (yy * this.config.cols);
		this.placeAt(xx, yy, obj);
		
	}
	
	placeAt(xx, yy, obj)
	{
		// calc position based upon cell width and height
		var x2 = this.cw * xx + this.cw / 2;
		var y2 = this.ch * yy + this.ch / 2;
		obj.x = x2;
		obj.y = y2;
	}
	
	/** Utility function to scale an object to a percentage of the screen width **/
	static scaleToGameW(obj, percentage)
	{
		obj.displayWidth = game.config.width * percentage;
		obj.scaleY = obj.scaleX;
	}
	
	/** Utility function to scale an object to a percentage of the screen height **/
	static scaleToGameH(obj, percentage)
	{
		obj.displayHeight = game.config.height * percentage;
		obj.scaleX = obj.scaleY;
	}	
}
