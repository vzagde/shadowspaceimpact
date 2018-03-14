var buttetSpwanSpeed;
var bulletSpeed;
var enemySpwanSpeed;
var enemySpeed;
var golis;
var enemies;
var enemyLoop;
var scoreText;
var powers;
var bulletSize;
var planetCount;
var isPendingInterstitial = false;
var isAutoshowInterstitial = false;
var highScore = window.localStorage.getItem("highScore");
setStart();
//game phaser
var game=new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS,"");
var BootState={
	//loding accets
	preload: function(){
		this.load.image('LodingScreen', 'assets/name.png');
		this.load.image('background', 'assets/bg1.png');
	},
	create: function(){
		game.state.start("LoadingState");
	},
	
};

var LoadingState={
	//loding acc
	preload: function(){
		game.scale.setGameSize(window.innerWidth, window.innerHeight, Phaser.CANVAS,"");
		game.load.bitmapFont('carrier_command', 'assets/font/carrier_command.png', 'assets/font/carrier_command.xml');
		bg=this.game.add.sprite(0,0,'background');
		bg.height = game.height;
    	bg.width = game.width;
		LodingScreen=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'LodingScreen');
		LodingScreen.anchor.setTo(0.5);
		LodingScreen.scale.setTo(0.3,0.3);
		this.load.image('spaceship', 'assets/player.png');
		this.load.image('shani', 'assets/shani1.png');
		this.load.image('planet', 'assets/planet1.png');
		this.load.image('goli', 'assets/bullet.png');
		this.load.image('pro', 'assets/icon.png');
		this.load.image('company', 'assets/company.png');
		//load ememies
		this.load.image('enemy1', 'assets/enemies/enemy1.png');
		this.load.image('enemy5', 'assets/enemies/enemy5.png');
		this.load.image('enemy6', 'assets/enemies/enemy6.png');
		this.load.spritesheet('power1', 'assets/power/bulletUp.png',34,33,4);
		this.load.image('pause', 'assets/pause.png');
		this.load.image('resume', 'assets/resume.png');

		this.load.image('restart', 'assets/restart.png');
		this.load.image('fb_share', 'assets/fb_share.png');
		this.load.spritesheet('blast', 'assets/explosion.png',400,400,8);
		game.load.audio('fire', 'assets/music/bullet.ogg');
		game.load.audio('killed', 'assets/music/killed.ogg');
		//game.load.audio('bg_music', 'assets/music/background.mp3');
		game.load.audio('death_music', 'assets/music/death.ogg');
		game.load.audio('start_music', 'assets/music/start.ogg');
		game.load.audio('high_Score', 'assets/music/score.ogg');
	},
	create: function(){
		game.time.events.add(Phaser.Timer.SECOND * 2, function(){
			bg.kill();
			LodingScreen.kill();
			game.state.start("PreGameState");
	},this);
	},
	
};

var PreGameState={
	//loding accets
	create: function(){
		game.scale.refresh();
		bg=this.game.add.sprite(0,0,'background');
		bg.height = game.height;
    	bg.width = game.width;
		Startb=this.game.add.bitmapText(this.game.world.centerX,this.game.world.centerY,'carrier_command','TAP TO START',20);
		Startb.anchor.setTo(0.5);
		Startb.scale.setTo(0.5,0.5);

		pro=this.game.add.sprite(this.game.world.width/3,this.game.world.height-150,'pro');
		pro.anchor.setTo(0.5);
		pro.scale.setTo(0.1,0.1);
		pro.inputEnabled = true;
		pro.events.onInputDown.add(proLink, this);

		pro_text=this.game.add.bitmapText(this.game.world.width/3,this.game.world.height-100,'carrier_command',"No Ads",10);
		pro_text.anchor.setTo(0.5);

		company=this.game.add.sprite(this.game.world.width*2/3,this.game.world.height-150,'company');
		company.anchor.setTo(0.5);
		company.scale.setTo(0.6,0.6);
		company.inputEnabled = true;
		company.events.onInputDown.add(moreLink, this);

		company_text=this.game.add.bitmapText(this.game.world.width*2/3,this.game.world.height-100,'carrier_command',"More Apps",10);
		company_text.anchor.setTo(0.5);
		//tips
		//tips
		tip1="Drag Spaceship To Move";
		tip2="May Force Be With You!";
		tip3="You Can Move Up and Down";
		tip4="PowerUps Are Random";
		tip5="Kill reds to score";
		tip6="Kill Kill Kill";
		tip_no=game.rnd.integerInRange(1, 7);
		switch(tip_no) {
		    case 1:
		    	tips=this.game.add.bitmapText(this.game.world.centerX,this.game.world.height-30,'carrier_command',tip1,20);
		        break;
		    case 2:
		    	tips=this.game.add.bitmapText(this.game.world.centerX,this.game.world.height-30,'carrier_command',tip2,20);
		        break;
		    case 3:
		    	tips=this.game.add.bitmapText(this.game.world.centerX,this.game.world.height-30,'carrier_command',tip3,20);
		        break;
		    case 4:
		    	tips=this.game.add.bitmapText(this.game.world.centerX,this.game.world.height-30,'carrier_command',tip4,20);
		        break;
		    case 5:
		    	tips=this.game.add.bitmapText(this.game.world.centerX,this.game.world.height-30,'carrier_command',tip5,20);
		        break;
		    case 6:
		    	tips=this.game.add.bitmapText(this.game.world.centerX,this.game.world.height-30,'carrier_command',tip6,20);
		        break;             
		    
		    default:
		        tips=this.game.add.bitmapText(this.game.world.centerX,this.game.world.height-30,'carrier_command',"you are on your own",20);
		}
		tips.anchor.setTo(0.5);
		tips.scale.setTo(0.5,0.5);
		ship=this.game.add.sprite(this.game.world.centerX,this.game.world.height*0.4,'spaceship');
		//ship.scale.setTo(0.4);
		ship.anchor.setTo(0.5);
		game.physics.arcade.enable(ship);
		bg.inputEnabled=true;

		start_music = game.add.audio('start_music');
    	start_music.allowMultiple = true;
    	start_music.addMarker('start_music', 0, 30);
		

		bg.events.onInputDown.add(function(){
			bg.inputEnabled=false;
			Startb.kill();
			pro.kill();
			pro_text.kill();
			company.kill();
			company_text.kill();
			start_music.play("start_music");
			// game.physics.arcade.moveToXY(ship, this.game.world.centerX, this.game.world.height*0.8, 300, 3000);
			// game.add.tween(ship).to( { y: game.world.height*0.8 }, 3000, Phaser.Easing.Sinusoidal.InOut, true);
			var tween = game.add.tween(ship).to({
			x: [this.game.world.centerX, this.game.world.width*0, this.game.world.width, this.game.world.centerX],
			y: [this.game.world.height*0.4, this.game.world.height*0.5, this.game.world.height*0.6, this.game.world.height*0.8],
			}, 2000,Phaser.Easing.Quadratic.Out, true).interpolation(function(v, k){
			    return Phaser.Math.bezierInterpolation(v, k);
			});

			game.time.events.add(Phaser.Timer.SECOND * 2, function() { 
				bg.kill();
				ship.kill();
				tips.kill();
				game.state.start("GameState");
			} ,this);
			
		}, this);
	},
	
};





var GameState={
	//loding accets
	preload: function(){
		

	},
	create: function(){
		//background
		this.background=this.game.add.sprite(0,0,'background');
		this.background.height = game.height;
    	this.background.width = game.width;
		this.background.inputEnabled=true;
		this.background.input.enableDrag(true);
		this.background.input.startDrag = function(pointer) {
		    pointer.shipStart = new Phaser.Point(GameState.ship.x, GameState.ship.y);
		    Phaser.InputHandler.prototype.startDrag.call(this, pointer);
		};
		this.background.input.updateDrag = function(pointer) {
		    GameState.ship.x = pointer.shipStart.x - pointer.positionDown.x + pointer.x;
		    GameState.ship.y = pointer.shipStart.y - pointer.positionDown.y + pointer.y;
		    GameState.background.x=0;
		    GameState.background.y=0;
		};
		//ship
		this.ship=this.game.add.sprite(this.game.world.centerX,this.game.world.height*0.8,'spaceship');
		//this.ship.scale.setTo(0.4);
		this.ship.anchor.setTo(0.5);
		game.physics.arcade.enable(this.ship);
		this.ship.body.setCircle(25);
		// this.ship.inputEnabled=true;
		// this.ship.input.enableDrag(true);
		//score
		this.scoreText = this.game.add.bitmapText(16, 16,'carrier_command','0',25);
		DragText=this.game.add.bitmapText(this.game.world.centerX,this.game.world.height-20,'carrier_command','Drag To Move',20);
		DragText.anchor.setTo(0.5);
		DragText.scale.setTo(0.5,0.5);
		game.time.events.add(Phaser.Timer.SECOND * 5, function(){
			DragText.kill();
		},this);
		pause=this.game.add.sprite(game.world.width-50,16,'pause');
		pause.anchor.setTo(0.5);
		pause.scale.setTo(0.5,0.5);
		pause.x=game.world.width-(pause.width/2)-16;
		pause.y=(pause.height/2)+2;
		pause.inputEnabled = true;
		pause.events.onInputDown.add(pauseGame, this);
		//background Music
		// music = game.add.audio('bg_music');
    	//music.play('', 0, 1, true);
		//bullet sound
		bullet_sound = game.add.audio('fire');
    	bullet_sound.allowMultiple = true;
		bullet_sound.volume=0.5;
    	bullet_sound.addMarker('fire', 0, 0.5);
    	//Killed sound
		killed_sound = game.add.audio('killed');
    	killed_sound.allowMultiple = true;
    	killed_sound.addMarker('killed', 0, 0.5);
    	//death music
    	death_music = game.add.audio('death_music');
    	death_music.allowMultiple = true;
    	death_music.addMarker('death_music', 0, 10);
    	//high score music
    	high_Score = game.add.audio('high_Score');
    	high_Score.allowMultiple = true;
		high_Score.volume=0.5;
    	high_Score.addMarker('high_Score', 0, 3);
    	//groups of bullets and enemies
    	golis=game.add.group();
    	enemies=game.add.group();
    	powers=game.add.group();
		//fire bullet loop
		fireLoop=game.time.events.loop(Phaser.Timer.SECOND*1/buttetSpwanSpeed, fireBullet, this);
		//this.game.input.onTap.add(fireBullet, this);
		//create ememy loop
		createEnemy();
		enemyLoop=game.time.events.loop(Phaser.Timer.SECOND*1/enemySpwanSpeed, createEnemy, this);
		//change ememy speed and enemy spwan speed loop
		enemySpeedLoop=game.time.events.loop(Phaser.Timer.SECOND*1.5, changeEnemySpeed, this);
		//give powerup
		powerUp=game.time.events.loop(Phaser.Timer.SECOND*20, powerFun, this);

		//send planet
		sendPlanet();
		sendP=game.time.events.loop(Phaser.Timer.SECOND*10, sendPlanet, this);			
	},
	update: function(){
		//scrolling background
		//this.background.tilePosition.y+=2;

		
		

		//dont go out
		if(this.ship.y<0+this.ship.height/2)
		{
			this.ship.y=0+this.ship.height/2;
		}
		if(this.ship.y>this.game.world.height-this.ship.height/2)
		{
			this.ship.y=this.game.world.height-this.ship.height/2;
		}

		if(this.ship.x<0+this.ship.width/2)
		{
			this.ship.x=0+this.ship.width/2;
		}
		if(this.ship.x>this.game.world.width-this.ship.width/2)
		{
			this.ship.x=this.game.world.width-this.ship.width/2;
		}
		//check for collisions 
		game.physics.arcade.overlap(golis,enemies,b_e_collide,null,this);
		game.physics.arcade.overlap(this.ship,enemies,s_e_collide,null,this);
		game.physics.arcade.overlap(this.ship,powers,s_power1_collide,null,this);



		
	},
	
};


//setting start game conditions
function setStart(){
	buttetSpwanSpeed=2;
	bulletSpeed=2000;
	enemySpwanSpeed=1;
	enemySpeed=300;
	score=0;
	bulletSize=1.2;
	planetCount=0;
}

//fire bullet function
function fireBullet(){
	goli=this.game.add.sprite(this.ship.x,this.ship.y-this.ship.height/2,'goli');
	goli.anchor.setTo(0.5);
	goli.scale.setTo(bulletSize,1);
	goli.checkWorldBounds = true;
	goli.outOfBoundsKill = true;
	//adding to group
	golis.add(goli);
	game.world.moveDown(goli);
	game.physics.arcade.enable(goli);
	goli.body.collisonWorldBounds=true;
	goli.body.velocity.y=-bulletSpeed;
	bullet_sound.play("fire");
}

//power 2 bullets
function fireBullet2(){
	goli=this.game.add.sprite(this.ship.x-this.ship.width/2,this.ship.y,'goli');
	goli2=this.game.add.sprite(this.ship.x+this.ship.width/2,this.ship.y,'goli');
	goli.anchor.setTo(0.5);
	goli.scale.setTo(bulletSize,1);
	goli.checkWorldBounds = true;
	goli.outOfBoundsKill = true;
	//adding to group
	golis.add(goli);
	game.world.moveDown(goli);
	game.physics.arcade.enable(goli);
	goli.body.collisonWorldBounds=true;
	goli.body.velocity.y=-bulletSpeed;

	goli2.anchor.setTo(0.5);
	goli2.scale.setTo(bulletSize,1);
	goli2.checkWorldBounds = true;
	goli2.outOfBoundsKill = true;
	//adding to group
	golis.add(goli2);
	game.world.moveDown(goli2);
	game.physics.arcade.enable(goli2);
	goli2.body.collisonWorldBounds=true;
	goli2.body.velocity.y=-bulletSpeed;
	bullet_sound.play("fire");
}

//power 3 bullets
function fireBullet3(){
	goli=this.game.add.sprite(this.ship.x,this.ship.y-this.ship.height/2,'goli');
	goli3=this.game.add.sprite(this.ship.x-this.ship.width/2,this.ship.y,'goli');
	goli2=this.game.add.sprite(this.ship.x+this.ship.width/2,this.ship.y,'goli');
	goli.anchor.setTo(0.5);
	goli.scale.setTo(bulletSize,1);
	goli.checkWorldBounds = true;
	goli.outOfBoundsKill = true;
	//adding to group
	golis.add(goli);
	game.world.moveDown(goli);
	game.physics.arcade.enable(goli);
	goli.body.collisonWorldBounds=true;
	goli.body.velocity.y=-bulletSpeed;

	goli2.anchor.setTo(0.5);
	goli2.scale.setTo(bulletSize,1);
	goli2.checkWorldBounds = true;
	goli2.outOfBoundsKill = true;
	//adding to group
	golis.add(goli2);
	game.world.moveDown(goli2);
	game.physics.arcade.enable(goli2);
	goli2.body.collisonWorldBounds=true;
	goli2.body.velocity.y=-bulletSpeed;
	goli2.body.velocity.x=+250;
	goli2.angle=8;
	bullet_sound.play("fire");

	goli3.anchor.setTo(0.5);
	goli3.scale.setTo(bulletSize,1);
	goli3.checkWorldBounds = true;
	goli3.outOfBoundsKill = true;
	//adding to group
	golis.add(goli3);
	game.world.moveDown(goli3);
	game.physics.arcade.enable(goli3);
	goli3.body.collisonWorldBounds=true;
	goli3.body.velocity.y=-bulletSpeed;
	goli3.body.velocity.x=-250;
	goli3.angle=-8;
	bullet_sound.play("fire");
}
//create enemy function
function createEnemy(){
	enemyNo=game.rnd.integerInRange(1, 6);
	//first 4 enmey is aircraft
	if (enemyNo<=4)
	{
		enemyNo=1;
	}
	x1=game.rnd.integerInRange(0,this.game.world.width);
	x2=game.rnd.integerInRange(0,this.game.world.width);
	enemy=this.game.add.sprite(x1,0,'enemy'+enemyNo);
	enemy.anchor.setTo(0.5);

	// enemy.scale.setTo(0.4);
	enemy.checkWorldBounds = true;
	enemies.add(enemy);
	enemy.outOfBoundsKill = true;
	game.physics.arcade.enable(enemy);
	enemy.body.setCircle(enemy.width/2);
	enemy.body.collisonWorldBounds=true;
	enemy.angle=90;
	enemy.no=enemyNo;

	//moving enemy
	angleRedian=game.physics.arcade.moveToXY(enemy, x2, this.game.world.height+enemy.height, enemySpeed,0);
	angleDegree=angleRedian*57.2958;
	enemy.angle=90+angleDegree;

}

//create planet background function
function sendPlanet(){
	planetName="";
	if(planetCount>4){
		planetCount=0;
		planetName='shani';
	}
	else{
		planetCount=planetCount+1;
		planetName="planet";
	}
	scale=game.rnd.integerInRange(4,10);
	x1=game.rnd.integerInRange(0,this.game.world.width);
	planet=this.game.add.sprite(x1,0,planetName);
	planet.anchor.setTo(0.5,1);
	planet.scale.setTo(1/scale);
	planet.checkWorldBounds = true;
	planet.outOfBoundsKill = true;
	game.physics.arcade.enable(planet);
	planet.body.collisonWorldBounds=true;
	planet.body.velocity.y=30;
	game.world.sendToBack(planet);
	game.world.moveUp(planet);



}
//runs when bullet collide to enemy
function b_e_collide(goli,enemy){
	//blast
	blast=this.game.add.sprite(enemy.x,enemy.y,'blast');
	blast.anchor.setTo(0.5);
	blast.scale.setTo(0.5);
	var explosion=blast.animations.add('explosion');
	blast.animations.play('explosion',30,false,true);

	//killing
	goli.kill();
	enemy.kill();

	//update scores
	if(enemy.no==1)
	{
		score+=1;
		killed_sound.play('killed');
	}
	this.scoreText.text =  score;
}
//runs when ship collide to enemy
function s_e_collide(ship,enemy){
	blast=this.game.add.sprite(enemy.x,enemy.y,'blast');
	blast.anchor.setTo(0.5);
	blast.scale.setTo(0.5);
	var explosion=blast.animations.add('explosion');
	blast.animations.play('explosion',10,false,true);
	ship.kill();
	enemy.kill();
	pause.kill();
	
	//music.stop();
	//check high score
	if(window.localStorage.getItem("highScore")===null){
		window.localStorage.setItem("highScore", 0);
	}
	

	
	this.scoreText.kill();
	
	death_music.play("death_music");
	game.time.events.remove(fireLoop);
	game.time.events.add(Phaser.Timer.SECOND * 1, function() {
	if(score<highScore){
		showInterstitialAd();
	}
	},this);
	game.time.events.add(Phaser.Timer.SECOND * 2, function() {
		//check if highScore
		if(score>=highScore){
			highScore=score;
			high_Score.play("high_Score");
			window.localStorage.setItem("highScore", score);
		}
		//handling 0 error
		if(score==0){
			score='0';
		}    
		fianlScore = this.game.add.bitmapText(this.game.world.centerX,100,'carrier_command',score,25);
		fianlScore.anchor.setTo(0.5);
		gameOverText = this.game.add.bitmapText(this.game.world.centerX,50,'carrier_command','GAME OVER',25);
		gameOverText.anchor.setTo(0.5);
		highScoreText = this.game.add.bitmapText(this.game.world.centerX,150,'carrier_command','High Score:'+highScore,10);
		highScoreText.anchor.setTo(0.5);
		//restart button
		restart=this.game.add.sprite(this.game.world.centerX,this.game.world.height-150,'restart');
		restart.anchor.setTo(0.5);
		restart.scale.setTo(0.75,0.75);
		restart.inputEnabled = true;
		restart.events.onInputDown.add(restartGame, this);
		game.time.events.stop();

		//share button
		share=this.game.add.sprite(this.game.world.centerX,this.game.world.height-100,'fb_share');
		share.anchor.setTo(0.5);
		share.scale.setTo(0.2,0.2);
		share.inputEnabled = true;
		share.events.onInputDown.add(fb_share, this);
		game.time.events.stop();

	}, this);

}
//runs when ship collide power1
function s_power1_collide(ship,power){
	power.kill();
	powerNo=game.rnd.integerInRange(1, 3);
	if(powerNo==1){
		game.time.events.remove(fireLoop);
		fireLoop=game.time.events.loop(Phaser.Timer.SECOND*1/10, fireBullet, this);
		game.time.events.add(Phaser.Timer.SECOND * 10, function(){
			game.time.events.remove(fireLoop);
			fireLoop=game.time.events.loop(Phaser.Timer.SECOND*1/buttetSpwanSpeed, fireBullet, this);
		},this);

	}
	if(powerNo==2){
		game.time.events.remove(fireLoop);
		fireLoop=game.time.events.loop(Phaser.Timer.SECOND*1/5, fireBullet2, this);
		game.time.events.add(Phaser.Timer.SECOND * 10, function(){
			game.time.events.remove(fireLoop);
			fireLoop=game.time.events.loop(Phaser.Timer.SECOND*1/buttetSpwanSpeed, fireBullet, this);
		},this);

	}

	if(powerNo==3){
		game.time.events.remove(fireLoop);
		fireLoop=game.time.events.loop(Phaser.Timer.SECOND*1/5, fireBullet3, this);
		game.time.events.add(Phaser.Timer.SECOND * 10, function(){
			game.time.events.remove(fireLoop);
			fireLoop=game.time.events.loop(Phaser.Timer.SECOND*1/buttetSpwanSpeed, fireBullet, this);
		},this);

	}
}


function changeEnemySpeed()
{	
	if(enemySpeed<=900)
	{
		enemySpeed+=5;
	}
	if(enemySpwanSpeed<=3)
	{
		enemySpwanSpeed+=0.025;
	}
	enemyLoop.delay=Phaser.Timer.SECOND*1/enemySpwanSpeed;
}

//send power up
function powerFun()
{
	x1=game.rnd.integerInRange(0,this.game.world.width);
	x2=game.rnd.integerInRange(0,this.game.world.width);
	power=this.game.add.sprite(x1,10,'power1');
	power.anchor.setTo(0.5);
	var shine=power.animations.add('shine');
	power.animations.play('shine',5,true,true);
	power.checkWorldBounds = true;
	power.outOfBoundsKill = true;
	powers.add(power);
	game.physics.arcade.enable(power);
	power.body.collisonWorldBounds=true;
	game.physics.arcade.moveToXY(power, x2, this.game.world.height+power.height, 400,0);
	powerDelay=game.rnd.integerInRange(20,35);
	powerUp.delay=Phaser.Timer.SECOND*powerDelay;
}


function proLink(){
	window.open('https://play.google.com/store/apps/details?id=com.phonegap.spacepro', '_system');
}
function moreLink(){
	window.open('https://play.google.com/store/apps/developer?id=Bharatiy+Apps', '_system');
}
function restartGame(){
	setStart();
	game.time.events.start();
	game.state.start("PreGameState");	
}
function pauseGame(){
	game.paused = true;
	reStartb=this.game.add.bitmapText(this.game.world.centerX,this.game.world.centerY,'carrier_command','TAP TO RESUME',20);
	reStartb.anchor.setTo(0.5);
	game.input.onDown.add(unpause, this);
	pause.visible=false;
}
function unpause(){
	game.paused = false;
	game.input.onDown.remove(unpause, this);
	pause.visible=true;
	reStartb.kill();
}

function fb_share(){
	// this is the complete list of currently supported params you can pass to the plugin (all optional)
		var options = {
		  message: 'HI, I just Score '+score+' in Shadow Space Impact and my highScore is '+highScore, // not supported on some apps (Facebook, Instagram)
		  subject: 'HI, I just Score '+score+' in Shadow Space Impact', 
		  url: 'http://stackheaps.com/SSI/',
		  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
		}

		var onSuccess = function(result) {
		  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
		  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
		}

		var onError = function(msg) {
		  console.log("Sharing failed with message: " + msg);
		}

		window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);	
}

//adMob start

function prepareInterstitialAd() {
    if (!isPendingInterstitial) { // We won't ask for another interstitial ad if we already have an available one
        admob.requestInterstitialAd({
            autoShowInterstitial: isAutoshowInterstitial
        });
    }
}

function onAdLoadedEvent(e) {
    if (e.adType === admob.AD_TYPE.INTERSTITIAL && !isAutoshowInterstitial) {
        isPendingInterstitial = true;
    }
}

function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);

    admob.setOptions({
        publisherId:          "pub-4725184835015901",
        interstitialAdId:     "ca-app-pub-4725184835015901/5801470413",
    });

    document.addEventListener(admob.events.onAdLoaded, onAdLoadedEvent);
    prepareIntestitialAd();
}

document.addEventListener("deviceready", onDeviceReady, false);

function showInterstitialAd() {
    if (isPendingInterstitial) {
        admob.showInterstitialAd(function () {
                isPendingInterstitial = false;
                isAutoshowInterstitial = false;
                prepareInterstitialAd();
        });
    } else {
        // The interstitial is not prepared, so in this case, we want to show the interstitial as soon as possible
        isAutoshowInterstitial = false;
        admob.requestInterstitialAd({
            autoShowInterstitial: isAutoshowInterstitial
        });
    }
}

//adMob end



game.state.add("GameState",GameState);
game.state.add("BootState",BootState);
game.state.add("LoadingState",LoadingState);
game.state.add("PreGameState",PreGameState);
game.state.start("BootState");
