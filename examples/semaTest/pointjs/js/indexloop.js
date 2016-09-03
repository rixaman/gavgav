//-------------------------------------------
var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullPage();

var game  = pjs.game;
var point = pjs.vector.point;
var brush = pjs.brush;

var key = pjs.keyControl;
key.initKeyControl();

var mouse = pjs.mouseControl;
mouse.initMouseControl();

//---------------------------------------------------
//Замена стандартного курсора каким-либо изображением
mouse.setCursorImage("imgs/shoot.png");
//img - string, путь к картинке
//---------------------------------------------------

var tile2 = pjs.tiles.newImage('imgs/bigboom.png');
var tile3 = pjs.tiles.newImage('imgs/spaceship.png');
var tile4 = pjs.tiles.newImage('imgs/packet.png');
var tile5 = pjs.tiles.newImage('imgs/enemy.png');

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

var spacecar = game.newAnimationObject({  
  	animation : spaceShip.ship,
	w : 50, h : 50,
  	x : 600, y : 500  
});

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

var kbox=[], packet=[], boomPoint=[];
var speed = 7, 
	speedsc = 3,
	kboxtime = 0,
	kboxtimemax = 70,
	timerkill = 0,
	score=0,
	speedkbox=1,
	lifekbox=5;

//-------------------------------------------
//LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP
game.newLoop('game', function () {
	game.fill('#D9D9D9');

	textDraw();
	                 
	//отлицаигрока
	pjs.camera.moveTimeC(spacecar.getPosition(1), 20);
	spacecar.rotate(mouse.getPosition())

	//нажатие клавиш
	keyIsDown();

	// если packet есть то проверяем их на столкновение
	if (objLenght(packet)>0) 
	{	
		for (var i = 0; i < objLenght(packet); i++) 
		{
	        packet[i].draw();        
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
					boomDraw(packet[i].getPosition().x,packet[i].getPosition().y);
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
			//анимация движения
			//kbox[i].setAnimation(anim.dragonrun);
			//повернуть в сторону игрока
			//kbox[i].rotate(spacecar.getPosition(1));
			//двигаться со скоростью		
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
				case 100: {speedkbox=2; break;}  
				case 200: {speedkbox=3;  break;}
				case 300: {speedkbox=4;  break;}
				case 400: {speedkbox=5;  break;}
				case 500: {speedkbox=6;  break;}
				case 600: {speedkbox=7;  break;}
				case 700: {speedkbox=8;  break;}
				case 800: {speedkbox=9;  break;}
				case 900: {speedkbox=10;  break;}
				case 1000: {/*WIN*/checkWin();break;}
			}

			//удаляем убитого
			kbox.splice(i,1); 	
		}
	


		if (kbox[i])
		{
			//отрисовываем противника
			kbox[i].draw();
			//проверка на поражение	
			//если kbox[i] доходят до spacecar: конец игры
			if (spacecar.isDynamicIntersect(kbox[i].getDynamicBox())){checkDestruction();}
		}
	}

	//проверка на победу
	//checkWin();

	spacecar.draw();

	if (kboxtime>=kboxtimemax){createkbox(); kboxtime=0;}

	kboxtime++;
});
//-------------------------------------------