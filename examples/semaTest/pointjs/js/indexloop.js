//-------------------------------------------
var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullPage();

var game  = pjs.game;
var point = pjs.vector.point;
var brush = pjs.brush;

var key = pjs.keyControl;
key.initKeyControl();

var tile = pjs.tiles.newImage('imgs/chrome.png');
var anim = {
  dragon : tile.getAnimation(14, 9, 44, 47, 2),
  dethdragon:tile.getAnimation(103, 9, 44, 47, 1),
  gameOver : tile.getAnimation(162, 8, 203, 56, 1),
  kaktus1 : tile.getAnimation(92, 93, 27, 50, 1),
  kaktus2 : tile.getAnimation(135, 117, 20, 24, 1),
};

var spacecar = game.newAnimationObject({  
  	animation : anim.kaktus1,
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

var kbox=[], packet=[];
var crate_kbox = true;
var speed = 5, 
    kboxcol=15,
    wincol=kboxcol;



//-------------------------------------------
//LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP
game.newLoop('game', function () {
game.fill('#D9D9D9');

if (crate_kbox==true) 
	{
	createkbox(kboxcol,kbox); 
	crate_kbox=false;
	}


//отлицаигрока
//pjs.camera.moveTimeC(spacecar.getPosition(1), 10);


//нажатие клавиш
keyIsDown();

// if packet exist
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

			//dethdragon
			kbox[j].setAnimation(anim.dethdragon);
			//kbox[j].setAnimation(anim.dragon);
			
			//kbox[j].rotateForAngle(180, 10); 
			//kbox[j].moveAngle(spacecar.getPosition(), 1);
			//kbox[j].draw();
			//kbox[j].animation=anim.dragon;
			kbox.splice(j,1);

			packet.splice(i,1);
			
		        }
		}
    	if (packet[i]) 
		{
		if (packet[i].getPosition().y<0)
			{
			packet.splice(i,1);
			} else 
			{
			packet[i].move(point(0, -speed*1.5));
			}
		
		}
	}

	//если packet уходит за пределы избаляемся от него
}

//проверка на победу
if (objLenght(kbox)<=0) 
	{
	
	gameWin.setPositionC(spacecar.getPosition());
  	gameWin.draw();
	spacecar.setVisible(false); 
	pjs.game.stop();
	}


//отрисовка обьектов
for (var i = 0; i < objLenght(kbox); i++) 
	{
	kbox[i].draw();
	kbox[i].rotate(spacecar.getPosition(1));
	kbox[i].moveTime(spacecar.getPosition(), 200);
	if (spacecar.isDynamicIntersect(kbox[i].getDynamicBox())) 
		{	
		console.log("GAME OWER!!!!!");
		gameOver.setPositionC(spacecar.getPosition());
  		spacecar.setVisible(false);
		gameOver.draw();		
		pjs.game.stop();
		}
	}
	spacecar.draw();

});
//-------------------------------------------
