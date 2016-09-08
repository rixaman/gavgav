var kbox=[], 		//противники
	kboss=[], 		//боссы
	packet=[], 		//снаряды игрока
	evilRocket=[],  //снаряды противника
	boomPoint=[],	//анимации взрывов
	drop = [];		//обьекты анимации дропа

var speed = 7, 
	speedsc = 3,
	//время появления врага
	kboxtime = 2000,
	//признак создания противника
	kboxcreatebool=true,
	//признак создания босса
	bosscreatebool=true,
	//очки игрока
	points=0,
	//скорость босса
	speedboss = 0.5,
	//скорость противника
	speedkbox=1;

//растояние видимости обьектов
var visdist = 350;

//жизнь игрока
var 
	spacecarlifemax = 5,
	spacecarlife = 3,
	lifekbox=3;

//-------------------------------------------
var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullPage();

var log = pjs.system.log;
var game  = pjs.game;
var point = pjs.vector.point;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;
var camera = pjs.camera;

//---------------------------------------------------
//инициализация контроля клавиатуры и мыши
var key = pjs.keyControl;
key.initKeyControl();
var mouse = pjs.mouseControl;
mouse.initMouseControl();
//---------------------------------------------------

//---------------------------------------------------
//создание обьектов звездногонеба
var stars = [];
OOP.forInt(1000, function () {
  var size = math.random(1, 2);
  stars.push(game.newRectObject({
    x : math.random(0, game.getWH().w)+0.0001,
    y : math.random(0, game.getWH().h)+0.0001,
    w : size, h : size,
    fillColor : pjs.colors.randomColor(200, 255),
    userData : {
      dx : math.random(-2, 2),
      dy : math.random(-2, 2)
    }
  }));
});
//---------------------------------------------------

//---------------------------------------------------
//Замена стандартного курсора каким-либо изображением
mouse.setCursorImage("imgs/shoot.png");
//img - string, путь к картинке
//---------------------------------------------------

	//спрайты анимации
	var tile1 = pjs.tiles.newImage('imgs/spaceshipboom.png');
	var tile2 = pjs.tiles.newImage('imgs/bigboom.png');
	var tile3 = pjs.tiles.newImage('imgs/spaceship.png');
	var tile4 = pjs.tiles.newImage('imgs/packet.png');
	var tile5 = pjs.tiles.newImage('imgs/enemy.png');
	var tile6 = pjs.tiles.newImage('imgs/enemy1.png');

	var spaceshipboom = {
		ssboom:tile1.getAnimation(0, 0, 64.4, 64, 9),
	}

	var animGalaxyGa = {
		boom:tile2.getAnimation(0, 0, 39, 40, 13),
	}
	var spaceShip= {
		ship:tile3.getAnimation(0, 0, 50, 50, 1),
	}
	var animpacket = {
		packet:tile4.getAnimation(0, 0, 50, 50, 2),
	}

	var animenemy = {
		enemy:tile5.getAnimation(0, 0, 65, 60, 1),
	}

	var animenemy1 = {
		enemy1:tile6.getAnimation(0, 0, 96, 82, 1),
	}
	

	//craft
	var craft1 = pjs.tiles.newImage('imgs/krest_anim.png');
	var addcraft1 = {
		addlife:craft1.getAnimation(0, 0, 128, 128, 4),
	}


	

//игрок
var spacecar = game.newAnimationObject({  
  	animation : spaceShip.ship,
	w : 50, h : 50,
  	x : 600, y : 500  
});
spacecar.life = spacecarlife;

//обект анимации победы 
var gameWin = game.newAnimationObject({
	//animation : anim.dethdragon,
	w:600, h:500,
	x:0, y:0
});

//обект анимации проигрыша 
var gameOver = game.newAnimationObject({
	//animation:anim.gameOver,
	w:600,h:500,
	x:0,y:0
});


//обект анимации craft 
//var aminObjectCraft = game.newAnimationObject({
	//animation:addcraft1.addlife,
	//w:50,h:50,
	//x:0,y:0
//});



//-------------------------------------------
//LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP
game.newLoop('game', function () {
	game.clear();

	//заливаем жкран черным цветом
	game.fill('black');
	//отрисовываем звезды
	skyDrawMove();
	//отрисовываем текст
	textDraw();	  
	//отрисовываем drop
	craftDrawDrop();

	//отлицаигрока
	//pjs.camera.moveTimeC(spacecar.getPosition(1), 20);
	
	//поворачиваем игрока к мышке
	spacecar.rotate(mouse.getPosition())

	//обрабатываем нажатие клавиш
	keyIsDown();
	//--------------------------------------------------------------------
	//проверяем попала ли ракета в босса
	packetInBoss();
	//--------------------------------------------------------------------	
	//отрисовываем рокеты игрока packet, проверяем на столкновения, удаляем, анимируем взрыв
	packetDraw();
	//--------------------------------------------------------------------
	//если существуют обьекты анимации взрыва то проверяем не закончился ли он, если закончился то удаляем его
	if (objLenght(boomPoint)>0) {endAnimation(boomPoint);};
	//--------------------------------------------------------------------
	//какието действия с боссом
	bossActDraw();
	//--------------------------------------------------------------------
	//рокеты противника (отрисовка)
	evilRocketDraw();

	//отрисовка обьектов
	for (var i = 0; i < objLenght(kbox); i++) 
	{
		//двигаем противника в сторону игрока
		kbox[i].moveAngle(speedkbox);	
		//поворачиваем противника в сторону игрока
		kbox[i].rotate(spacecar.getPosition(1));
		//проверка жизней и назначение действий
		if (kbox[i].life==lifekbox) 
		{
		}else 
		if (kbox[i].life==1)
		{
			//назначаем аимацию смерти
			//kbox[i].setAnimation(anim.dethdragon);
			//назначаем скорость 0
			//kbox[i].moveAngle();
		} else
		if (kbox[i].life<=0)
		{
			//-----------------------------------
			//добавляем в счете и в зависимости от счета выставляем скорость противника
			countingPoints(10);

			switch(points)
			{
				case 200: 	{speedkbox=2;  break;}
				case 400: 	{
								//если босс не существует то создаем его
								if (bosscreatebool==true) 
									{
										bosscreatebool = false;
										createboss(1);
										console.log("BOOOOOOOS!!!!!!")
									}  
								break;
							}				
				case 600: 	{speedkbox=3;  break;}
				case 800: 	{  
								if (bosscreatebool==true) 
									{
										bosscreatebool = false;
										createboss(2);
										console.log("BOOOOOOOS!!!!!!")
									}  
							break;
							}
				case 900: 	{speedkbox=4;  break;}
				case 1000: 	{/*WIN*/checkWin();break;}
			}

			//при убийстве противника есть вероятность выпадения drop'а
			craftCreateDrop(kbox[i].getPosition(),20);

			//удаляем убитого			
			kbox.splice(i,1); 	
		}
	
		if (kbox[i])
		{
			//отрисовываем противника
			var fact = kbox[i].getDistanceC(spacecar.getPosition());
    		if (fact <= visdist) 
    			{
    				kbox[i].visible=true; 

					kbox[i].draw();   	
					//отрисовываем жизни			
    				lifeDraw(kbox[i]);
    			}
			//проверка на поражение	
			//если kbox[i] доходят до spacecar: конец игры
			if (spacecar.isDynamicIntersect(kbox[i].getDynamicBox()))
				{
					if (spacecar.life>1)
						{				
							//анимация взрыва об игрока			
							boomDraw(kbox[i].getPosition().x,kbox[i].getPosition().y,spaceshipboom.ssboom);
							//минус жизнь игроку 
							spacecar.life--;
							//удаляем взорвавшегося противника
							kbox.splice(i,1);
						} else
						{
							//добавить анимацию взрыва игрока
							checkDestruction();							
						}
				}
		}
	}

	//проверка на победу
	//checkWin();

	//отрисовываем игрока
	spacecar.draw();
	//отрисовываем жизни над игроком
	lifeDraw(spacecar);

	//таймер появления противника
	if (kboxcreatebool==true) 
		{
			kboxcreatebool = false;
			setTimeout(function()
			{
				createkbox();
				kboxtime=kboxtime-5;
			}, kboxtime);
		}

});
//-------------------------------------------