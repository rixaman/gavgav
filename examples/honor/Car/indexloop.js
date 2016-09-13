var pjs = new PointJS('2d', 600, 600);
pjs.system.initFullPage();

var game = pjs.game;
var point = pjs.vector.point;
var size = pjs.vector.size;
var camera = pjs.camera;
var brush = pjs.brush;
var oop = pjs.OOP;
var math = pjs.math;
var sys = pjs.system;

//максимальные координаты игры
var heightx = game.getWH().h;
var widthx = game.getWH().w;

//---------------------------------------------------
//инициализация контроля клавиатуры и мыши
var key = pjs.keyControl;
key.initKeyControl();
var mouse = pjs.mouseControl;
mouse.initMouseControl();
//---------------------------------------------------


//параметры скорости
//-------------------
var speed = 2,
	speedcar = 5;
//-------------------


//------------BEGIN--ANIMAION---------------------
//------------------------------------------------
//car1 animation
var tilecar = pjs.tiles.newImage('img/car1.png');
var gta3car1 = {
	car1:tilecar.getAnimation(0, 0, 160, 75, 1),
}
//bigcar1
var tilebigcar = pjs.tiles.newImage('img/car_big1.png');
var gta3bcar = {
	car_big1:tilebigcar.getAnimation(0, 0, 267, 103, 1),
}
//------------------------------------------------


//------------------------------------------------
//анимация игрока
//stand
var tile = pjs.tiles.newImage('img/gta3_stand.png');
var manstand = {
	stand:tile.getAnimation(0, 0, 85, 85, 1),
}
//run
var tile1 = pjs.tiles.newImage('img/gta3_run.png');
var manrun = {
	run:tile1.getAnimation(0, 0, 82, 85, 6),
}
//------------------------------------------------
//------------END----ANIMAION---------------------



posx = 10;
var	arrCar = [];
oop.forInt(10, function()
	{
		arrCar.push(game.newAnimationObject(
		{
			animation: gta3car1.car1,
			w: 160, h: 75,
			x: posx,y: 10, 
			delay: 5,
			angle:90,
		}));
		posx = posx + 80;
	});

posx = 0;
oop.forInt(2, function()
	{
		arrCar.push(game.newAnimationObject(
		{
			animation: gta3bcar.car_big1,
			w: 267, h: 103,
			x: posx,y: 300,
			delay: 5,
			angle:90,
		}));
		//sys.log(arrCar);
		posx = posx +110;
	});

for (var i = 0; i < objLenght(arrCar); i++) 
	{
		arrCar[i].life=5;	
	}


//игрок
var man = game.newAnimationObject({  
  	animation : manstand.stand,
	w : 85, h : 85,
  	x : 300, y : 100,
  	delay:5  
});
man.life = 10;

var animstand = true;

//------------------------------------------------

function endAnimation()
{
	if (man)
	{
		if (man.frame!=man.anim.r){}else
			{
				man.setAnimation(manstand.stand);
				animstand = true;
			}
	}	
}

var bum = false;
var carobj;
var incar = false;



game.newLoop('game', function () 
{
    
game.fill('#D9D9D9');


//события клавиш
//--------------
keyIsDown();
//--------------


//проверяем конец анимации
//------------------------
endAnimation();
//------------------------


//если мы в машине камера следит за машиной
//-----------------------------------------
if(carobj){var p=carobj;}
if (incar==true) 
	{ 
	if (carobj)
		{
		for (var i = 0; i < objLenght(arrCar); i++) 
			{	
			if 	(p!=arrCar[i]) 
				{
				if (carobj.isDynamicIntersect(arrCar[i].getDynamicBox()))
					{
						sys.log('tadah');						
					}
				}
			}
		}
		var pos = carobj.getPositionC();			
		camera.moveTimeC(pos,10);
	}
	
//-----------------------------------------


//если мы не в машине камера следит за игроком
//-------------------------------
if (incar==false)
{	
	var pos = man.getPositionC();
	camera.moveTimeC(pos,10);

} else {}
//-------------------------------


oop.drawArr(arrCar);

man.draw();

//var pos2 = pjs.vector.getPointAngle(point(pos.x+len, pos.y),pos,man.getAngle());

});

game.startLoop('game');