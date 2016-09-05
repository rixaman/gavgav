var kbox=[], packet=[], boomPoint=[];
var speed = 7, 
	speedsc = 3,
	kboxtime = 0,
	kboxtimemax = 70,
	timerkill = 0,
	score=0,
	speedkbox=1;

//растояние видимости обьектов
var visdist = 350;

//жизнь игрока
var spacecarlife = 3,
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
var tile1 = pjs.tiles.newImage('imgs/spaceshipboom.png');
var tile2 = pjs.tiles.newImage('imgs/bigboom.png');
var tile3 = pjs.tiles.newImage('imgs/spaceship.png');
var tile4 = pjs.tiles.newImage('imgs/packet.png');
var tile5 = pjs.tiles.newImage('imgs/enemy.png');

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


//игрок
var spacecar = game.newAnimationObject({  
  	animation : spaceShip.ship,
	w : 50, h : 50,
  	x : 600, y : 500  
});
spacecar.life = spacecarlife;

var gameWin = game.newAnimationObject({
	//animation : anim.dethdragon,
	w:600, h:500,
	x:0, y:0
});

var gameOver = game.newAnimationObject({
	//animation:anim.gameOver,
	w:600,h:500,
	x:0,y:0
});



//-------------------------------------------
//LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP
game.newLoop('game', function () {
	game.clear();

	//game.fill('#D9D9D9');
	game.fill('black');

	//отрисовываем звезды
	skyDrawMove();

	//отрисовываем текст
	textDraw();
	                 
	//отлицаигрока
	//pjs.camera.moveTimeC(spacecar.getPosition(1), 20);
	
	//поворачиваем игрока к мышке
	spacecar.rotate(mouse.getPosition())

	//нажатие клавиш
	keyIsDown();

	// если packet есть то проверяем их на столкновение
	if (objLenght(packet)>0) 
	{	
		for (var i = 0; i < objLenght(packet); i++) 
		{

			var fact = packet[i].getDistanceC(spacecar.getPosition());
    		if (fact <= visdist) 
    			{
	        	packet[i].draw();        
	        	}

			//проверка каждого элемента массива kbox на столкновение с элементами массива packet
			for (var j = 0; j < objLenght(kbox); j++) 
			{
				if ((packet[i])&&(packet[i].isDynamicIntersect(kbox[j].getDynamicBox()))) 
				{
	                //console.log("TADAAAAADAAAAH!!!!");
					//попали отнимаем жизнь!!!
					kbox[j].life--;			
					//координата столкновения packet и kbox[j]
					//создаем обьект анимации взрыыва
					if (fact <= visdist) 
    					{
						boomDraw(packet[i].getPosition().x,packet[i].getPosition().y,animGalaxyGa.boom);
						}
					//удаляем снаряд
					packet.splice(i,1);			
			    }
			}

	    	if (packet[i]) 
			{
				//если packet уходит за пределы избаляемся от него иначе пусть летит
				wh = game.getWH();	
				if ((packet[i].getPosition().y<=-10)||(packet[i].getPosition().x<=-10)||(packet[i].getPosition().y>=wh.h+10)||(packet[i].getPosition().x>=wh.w+10))
				{
					packet.splice(i,1);
				} else 
				{   					
					packet[i].moveAngle(speed*1)
				}		
			}
		}
	}

	//отрисовываем взрыв в месте попадания
	if (objLenght(boomPoint)>0) {endAnimation(boomPoint);};

	//отрисовка обьектов
	for (var i = 0; i < objLenght(kbox); i++) 
	{
		kbox[i].moveAngle(speedkbox);	
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
			//если убили 10 шт то увеличиваем скорость их появления
			//-----------------------------------
			if (timerkill==10)
			{
				if (kboxtimemax>=0) 
				{
					kboxtimemax=kboxtimemax-5;
				}
				timerkill=0;
			} else {timerkill=timerkill+1;}
			//-----------------------------------

			//добавляем в счете и в зависимости от счета выставляем скорость противника
			score = score + 10;
			console.log(score);
			switch(score)
			{
				case 200: {speedkbox=2;  break;}
				case 400: {speedkbox=3;  break;}
				case 600: {speedkbox=4;  break;}
				case 800: {speedkbox=5;  break;}
				case 900: {speedkbox=6;  break;}
				case 1000: {/*WIN*/checkWin();break;}
			}
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

	//создаем противника
	if (kboxtime>=kboxtimemax){createkbox(); kboxtime=0;}
	kboxtime++;

});
//-------------------------------------------