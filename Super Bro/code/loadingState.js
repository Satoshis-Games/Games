/**
	State that loads all the resources for the game.
	Code by Rob Kleffner, 2011
*/

Mario.LoadingState = function() {
    this.Images = [];
    this.ImagesLoaded = false;
    this.ScreenColor = 0;
    this.ColorDirection = 1;
    this.ImageIndex = 0;
    this.SoundIndex = 0;
};

Mario.LoadingState.prototype = new Enjine.GameState();

Mario.LoadingState.prototype.Enter = function() {
    var i = 0;
    for (i = 0; i < 15; i++) {
        this.Images[i] = {};
    }
    
    this.Images[0].name = "background";
    this.Images[1].name = "endScene";
    this.Images[2].name = "enemies";
    this.Images[3].name = "fireMario";
    this.Images[4].name = "font";
    this.Images[5].name = "gameOverGhost";
    this.Images[6].name = "items";
    this.Images[7].name = "logo";
    this.Images[8].name = "map";
    this.Images[9].name = "mario";
    this.Images[10].name = "particles";
    this.Images[11].name = "racoonMario";
    this.Images[12].name = "smallMario";
    this.Images[13].name = "title";
    this.Images[14].name = "worldMap";

    this.Images[0].src = "/games/superbro/images/bgsheet.png";
    this.Images[1].src = "/games/superbro/images/endscene.gif";
    this.Images[2].src = "/games/superbro/images/enemysheet.png";
    this.Images[3].src = "/games/superbro/images/firemariosheet.png";
    this.Images[4].src = "/games/superbro/images/font.gif";
    this.Images[5].src = "/games/superbro/images/gameovergost.gif";
    this.Images[6].src = "/games/superbro/images/itemsheet.png";
    this.Images[7].src = "/games/superbro/images/logo.gif";
    this.Images[8].src = "/games/superbro/images/mapsheet.png";
    this.Images[9].src = "/games/superbro/images/mariosheet.png";
    this.Images[10].src = "/games/superbro/images/particlesheet.png";
    this.Images[11].src = "/games/superbro/images/racoonmariosheet.png";
    this.Images[12].src = "/games/superbro/images/smallmariosheet.png";
    this.Images[13].src = "/games/superbro/images/title.gif";
    this.Images[14].src = "/games/superbro/images/worldmap.png";
    
    Enjine.Resources.AddImages(this.Images);
    
    var testAudio = new Audio();
	
    if (testAudio.canPlayType("audio/mp3")) {
    	Enjine.Resources.AddSound("1up", "/games/superbro/sounds/1-up.mp3", 1)
		    .AddSound("breakblock", "/games/superbro/sounds/breakblock.mp3")
		    .AddSound("bump", "/games/superbro/sounds/bump.mp3", 4)
		    .AddSound("cannon", "/games/superbro/sounds/cannon.mp3")
		    .AddSound("coin", "/games/superbro/sounds/coin.mp3", 5)
		    .AddSound("death", "/games/superbro/sounds/death.mp3", 1)
		    .AddSound("exit", "/games/superbro/sounds/exit.mp3", 1)
		    .AddSound("fireball", "/games/superbro/sounds/fireball.mp3", 1)
		    .AddSound("jump", "/games/superbro/sounds/jump.mp3")
		    .AddSound("kick", "/games/superbro/sounds/kick.mp3")
		    .AddSound("pipe", "/games/superbro/sounds/pipe.mp3", 1)
		    .AddSound("powerdown", "/games/superbro/sounds/powerdown.mp3", 1)
		    .AddSound("powerup", "/games/superbro/sounds/powerup.mp3", 1)
		    .AddSound("sprout", "/games/superbro/sounds/sprout.mp3", 1)
		    .AddSound("stagestart", "/games/superbro/sounds/stagestart.mp3", 1)
		    .AddSound("stomp", "/games/superbro/sounds/stomp.mp3", 2);
    } else {
	    Enjine.Resources.AddSound("1up", "/games/superbro/sounds/1-up.wav", 1)
		    .AddSound("breakblock", "/games/superbro/sounds/breakblock.wav")
		    .AddSound("bump", "/games/superbro/sounds/bump.wav", 2)
		    .AddSound("cannon", "/games/superbro/sounds/cannon.wav")
		    .AddSound("coin", "/games/superbro/sounds/coin.wav", 5)
		    .AddSound("death", "/games/superbro/sounds/death.wav", 1)
		    .AddSound("exit", "/games/superbro/sounds/exit.wav", 1)
		    .AddSound("fireball", "/games/superbro/sounds/fireball.wav", 1)
		    .AddSound("jump", "/games/superbro/sounds/jump.wav", 1)
		    .AddSound("kick", "/games/superbro/sounds/kick.wav", 1)
		    .AddSound("message", "/games/superbro/sounds/message.wav", 1)
		    .AddSound("pipe", "/games/superbro/sounds/pipe.wav", 1)
		    .AddSound("powerdown", "/games/superbro/sounds/powerdown.wav", 1)
		    .AddSound("powerup", "/games/superbro/sounds/powerup.wav", 1)
		    .AddSound("sprout", "/games/superbro/sounds/sprout.wav", 1)
		    .AddSound("stagestart", "/games/superbro/sounds/stagestart.wav", 1)
		    .AddSound("stomp", "/games/superbro/sounds/stomp.wav", 1);
    }
    
    //load the array of tile behaviors
    Mario.Tile.LoadBehaviors();
};

Mario.LoadingState.prototype.Exit = function() {
    delete this.Images;
};

Mario.LoadingState.prototype.Update = function(delta) {
    if (!this.ImagesLoaded) {
        this.ImagesLoaded = true;
        var i = 0;
        for (i = 0; i < this.Images.length; i++) {
            if (Enjine.Resources.Images[this.Images[i].name].complete !== true) {
                this.ImagesLoaded = false;
                break;
            }
        }
    }
    
    this.ScreenColor += this.ColorDirection * 255 * delta;
    if (this.ScreenColor > 255) {
        this.ScreenColor = 255;
        this.ColorDirection = -1;
    } else if (this.ScreenColor < 0) {
        this.ScreenColor = 0;
        this.ColorDirection = 1;
    }
};

Mario.LoadingState.prototype.Draw = function(context) {
    if (!this.ImagesLoaded) {
        var color = parseInt(this.ScreenColor, 10);
        context.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
        context.fillRect(0, 0, 640, 480);
    } else {
        context.fillStyle = "rgb(0, 0, 0)";
        context.fillRect(0, 0, 640, 480);
    }
};

Mario.LoadingState.prototype.CheckForChange = function(context) {
    if (this.ImagesLoaded) {
		//set up the global map state variable
		Mario.GlobalMapState = new Mario.MapState();
	
        context.ChangeState(new Mario.TitleState());
    }
};