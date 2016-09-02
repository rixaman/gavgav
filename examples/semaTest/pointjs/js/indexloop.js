//-------------------------------------------
var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullPage();

var game  = pjs.game;
var point = pjs.vector.point;
var brush = pjs.brush;

var key = pjs.keyControl;
key.initKeyControl();

var tile = pjs.tiles.newImage('imgs/chrome.png');
var tile2 = pjs.tiles.newImage('imgs/bigboom.png');
var tile3 = pjs.tiles.newImage('imgs/spaceship.png');
var tile4 = pjs.tiles.newImage('imgs/packet.png');

var animpacket = {
packet:tile4.getAnimation(0, 0, 50, 50, 2),
}


var animGalaxyGa = {
boom:tile2.getAnimation(0, 117, 39, 156, 13),
}

var spaceShip= {
ship:tile3.getAnimation(0, 0, 50, 50, 1),
}


var anim = {
  dragon : tile.getAnimation(14, 9, 44, 47, 1),
  dragonrun : tile.getAnimation(14, 9, 44, 47, 2),
  dethdragon:tile.getAnimation(103, 9, 44, 47, 1),
  gameOver : tile.getAnimation(162, 8, 203, 56, 1),
  kaktus1 : tile.getAnimation(92, 93, 27, 50, 1),
  kaktus2 : tile.getAnimation(135, 117, 20, 24, 1),
};

var spacecar = game.newAnimationObject({  
  	animation : spaceShip.ship,
	w : 50, h : 50,
  	x : 600, y : 500  
});

var gameWin = game.newAnimationObject({
  animation : anim.dethdragon,
  w:600, h:500,
  x:0, y:0
});


var gameOver = game.newAnimationObject({
  animation:anim.gameOver,
  w:600,h:500,
  x:0,y:0
});

var kbox=[], packet=[], boomPoint=[];
var 	speed = 5, 
	kboxtime = 0,
	kboxtimemax = 100,
	timerkill = 0,
	score=0,
	speedkbox=1;


//-------------------------------------------
//LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP
game.newLoop('game', function () {
game.fill('#D9D9D9');

 brush.drawText({
  x : 100, y : 100,
  text : 'fps: '+game.getFPS(),
  color : 'white',
  size : 30,
  font : 'serif'
 });

 brush.drawText({
  x : 200, y : 100,
  text : 'score: '+score,
  color : 'white',
  size : 30,
  font : 'serif'
 });

 brush.drawText({
  x : 330, y : 100,
  text : 'speed: '+speedkbox,
  color : 'green',
  size : 30,
  font : 'serif'
 });

                 
//отлицаигрока
pjs.camera.moveTimeC(spacecar.getPosition(1), 20);


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
                        console.log("TADAAAAADAAAAH!!!!");
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
		//если packet уходит за пределы избаляемся от него
		if (packet[i].getPosition().y<0)
			{
			packet.splice(i,1);
			} else 
			{
			packet[i].move(point(0, -speed*1.5));
			}		
		}
	}
}

//отрисовываем взрыв в месте попадания
if (objLenght(boomPoint)>0) {endAnimation(boomPoint);};



//отрисовка обьектов
for (var i = 0; i < objLenght(kbox); i++) 
	{

	//проверка жизней и назначение действий
	if (kbox[i].life==2) 
		{
			kbox[i].setAnimation(anim.dragonrun);
			//kbox[i].moveAngle(spacecar.getPosition(),1);
			kbox[i].rotate(spacecar.getPosition(1));
    			//kbox[i].drawDynamicBox('red');
    			kbox[i].moveAngle(speedkbox);			
		}else 
	if (kbox[i].life==1)
		{
			kbox[i].setAnimation(anim.dethdragon);
			//kbox[j].moveAngle();
		}else 
	if (kbox[i].life<=0)
		{
			score = score + 10;
			if (score>=100){speedkbox=2} else if(score>=200){speedkbox=3} else if(score>=400){speedkbox=4} else if(score>=500){speedkbox=10}
			if (timerkill==5)
				{
				if (kboxtimemax>=0) 
					{
					kboxtimemax=kboxtimemax-5;
					}
				timerkill=0;
				} else {timerkill=timerkill+1;}
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

if (kboxtime==kboxtimemax){createkbox(); kboxtime=0;}

kboxtime++;

});
//-------------------------------------------
