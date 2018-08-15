/** Main scene of election card game */
class MainScene extends Phaser.Scene {

  /** Preloads assets */
  preload()
  {
      this.load.image('background', 'src/assets/sky.png');
      this.load.image('card0', 'src/assets/card0.jpg');
      this.load.image('card1', 'src/assets/card1.jpg');
      this.load.image('card2', 'src/assets/card2.jpg');
      this.load.image('card3', 'src/assets/card3.jpg');
      this.load.image('card4', 'src/assets/card4.jpg');
  }

  /** Creates game */
  create()
  {

	// If this is not a desktop (so it's a mobile device) 
	if (game.device.desktop == false) {
		// Set the scaling mode to SHOW_ALL to show all the game
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// Set a minimum and maximum size for the game
		// Here the minimum is half the game size
		// And the maximum is the original game size
		game.scale.setMinMax(game.width/2, game.height/2, 
			game.width, game.height);

		// Center the game horizontally and vertically
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
	}  
	  
    // members
    this.money = 100;
    this.votesPercentage = 15;
    this.gameOver = false;
    this.day = 15;
    this.month = 'Ago';

    // load cards
    const card0 = {
      text1: 'Candidato, você tem até 7/Out',
      text2: 'para conseguir 51% dos votos!',
      image: 'card0',
      option1: 'O povo me carregará nos braços',
      option2: "Vou arrasar meus oponentes.",
      money1: 0,
      votes1: 0,
      money2: 0,
      votes2: 0,
      enables1: [1, 2, 3, 4],
      enables2: [1, 2, 3, 4]
    };

    const card1 = {
      text1: 'O PMDB quer uma aliança.',
      text2: '',
      image: 'card1',
      option1: 'Nem ferrando.',
      option2: "Manda a grana.",
      money1: 0,
      votes1: 0,
      money2: 100,
      votes2: -10,
      enables1: [],
      enables2: []
    };

    const card2 = {
      text1: 'O helicóptero do seu primo',
      text2: 'caiu com 2 toneladas de crack.',
      image: 'card2',
      option1: 'Não tenho nada a ver com isso.',
      option2: "Peço desculpas à nação.",
      money1: 0,
      votes1: -5,
      money2: 0,
      votes2: -2,
      enables1: [],
      enables2: []
    };

    const card3 = {
      text1: 'Seu adversário lhe chamou',
      text2: 'de mentiroso e caluniador.',
      image: 'card3',
      option1: 'Mentira do seu jornal!',
      option2: "Olha seu safado...",
      money1: 0,
      votes1: -5,
      money2: 0,
      votes2: -2,
      enables1: [],
      enables2: []
    };

    const card4 = {
      text1: 'Obama disse que você é',
      text2: '"o cara".',
      image: 'card4',
      option1: 'Esse cara sou eu.',
      option2: "Fora, porco imperialista!",
      money1: 0,
      votes1: 10,
      money2: 0,
      votes2: 2,
      enables1: [],
      enables2: []
    };


    this.cards = [ card0, card1, card2, card3, card4 ];
    this.enabledCards = [ 0 ];

    // background
    this.add.image(400, 300, 'background');

    // labels
    this.moneyLabel = this.add.text(16, 16, 'Caixa: ' + this.money + 'K', {fontSize: '16px', fill: '#000'});
    this.calendarLabel = this.add.text(170, 16, this.day + ' ' + this.month, {fontSize: '16px', fill: '#fff'});
    this.votesLabel = this.add.text(280, 16, 'Votos: '+ this.votesPercentage + '%', { fontSize: '16px', fill: '#000' });
    this.text1Label = this.add.text(50, 350, '1');
    this.text2Label = this.add.text(50, 370, '2');

    // buttons
    this.button1 = this.add.text(50, 420, 'B1', { fill: '#fff', backgroundColor: '#000' });
    this.button1.setInteractive()
    .on('pointerdown', this.button1Click, this)
    .on('pointerover', this.button1HoverIn, this)
    .on('pointerout', this.button1HoverOut, this);

    this.button2 = this.add.text(50, 460, 'B2', { fill: '#fff', backgroundColor: '#000' });
    this.button2.setInteractive()
    .on('pointerdown', this.button2Click, this)
    .on('pointerover', this.button2HoverIn, this)
    .on('pointerout', this.button2HoverOut, this);

      // start game loop
      this.flipCard();

  }

  update()
  {
    if (this.gameOver)
    {
      this.sys.setActive(false);
    }
  }

  endGame()
  {
    this.button1.setText('');
    this.button2.setText('');
    this.moneyLabel.setText(`Caixa: ${this.money}K`);
    this.votesLabel.setText(`Votos: ${this.votesPercentage}%`);

    if (this.votesPercentage >= 51)
    {
      this.text1Label.setText('Parabéns!!! Você se elegeu! Agora');
      this.text2Label.setText('são mais 4 anos mamando na teta.');
    }
    else
    {
      this.text1Label.setText('Você se ferrou! Agora vai ter');
      this.text2Label.setText('que arrumar um emprego honesto.');
    }

    this.gameOver = true;
  }

  updateDate()
  {
    this.day = this.day + 1;
    // TODO: update month
  }

  /** Draws a random card from the enabled card collecion */
  nextCard()
  {
    let numOfCards = this.enabledCards.length;
    let randomIdx = Math.floor( Math.random() * numOfCards);
    let nextCardIdx = this.enabledCards[randomIdx];
    this.enabledCards.splice(randomIdx, 1); // remove it from enabledCards
    let nextCard = this.cards[nextCardIdx];

    return nextCard;
  }

  /** Flips next card and updates UI */
  flipCard()
  {
    // remove previous card image
    if (typeof this.cardImage !== "undefined")
    {
      this.cardImage.destroy();
    }

    this.updateDate();

    // check for end game condition
    if (this.enabledCards.length == 0) {
      this.endGame();
    } else {

      this.currentCard = this.nextCard();

      // update UI
      this.cardImage = this.add.image(200, 200, this.currentCard.image);
      this.text1Label.setText(this.currentCard.text1);
      this.text2Label.setText(this.currentCard.text2);
      this.button1.setText(this.currentCard.option1);
      this.button2.setText(this.currentCard.option2);
      this.moneyLabel.setText(`Caixa: ${this.money}K`);
      this.votesLabel.setText(`Votos: ${this.votesPercentage}%`);
      this.calendarLabel.setText(this.day + ' ' + this.month);
    }
  }

  /** Updates the money and votes score based on player decision */
  updateScore(moneyDelta, votesDelta)
  {
    this.money = this.money + moneyDelta;
    this.votesPercentage = this.votesPercentage + votesDelta;
  }

  /** Enables new cards based on player decision */
  enableNewCards(newCards){
    this.enabledCards = this.enabledCards.concat(newCards);
  }

  /** Handles button 1 events */
  button1Click()
  {
    this.updateScore(this.currentCard.money1, this.currentCard.votes2);
    this.enableNewCards(this.currentCard.enables1);
    this.flipCard();
  }

  button1HoverIn()
  {
    console.log('hover');
      this.button1.setStyle({ fill: '#ff0', backgroundColor: '#000' });
  }

  button1HoverOut()
  {
      this.button1.setStyle({ fill: '#fff', backgroundColor: '#000' });
  }

  /** Handles button 2 events */
  button2Click()
  {
    this.updateScore(this.currentCard.money2, this.currentCard.votes2);
    this.enableNewCards(this.currentCard.enables2);
    this.flipCard();
  }

  button2HoverIn()
  {
      this.button2.setStyle({ fill: '#ff0', backgroundColor: '#000' });
  }

  button2HoverOut()
  {
      this.button2.setStyle({ fill: '#fff', backgroundColor: '#000' });
  }
}
