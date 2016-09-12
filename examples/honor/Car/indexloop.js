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

var heightx = game.getWH().h;
var widthx = game.getWH().w;

//---------------------------------------------------
//инициализация контроля клавиатуры и мыши
var key = pjs.keyControl;
key.initKeyControl();
var mouse = pjs.mouseControl;
mouse.initMouseControl();
//---------------------------------------------------

var speed = 2,
	speedcar = 5;

//car animation
var tilecar = pjs.tiles.newImage('img/car1.png');
var gta3car1 = {
	car1:tilecar.getAnimation(0, 0, 160, 75, 1),
}

var	arrCar = [];
oop.forInt(10, function()
	{
		arrCar.push(game.newAnimationObject(
		{
			animation: gta3car1.car1,
			w: 160, h: 75,
			x: math.random(0, 600),
			y: math.random(0, 600),
			delay: 5,
		}));
	});

//игрок
//------------------------------------------------
//анимация игрока
//stand
var tile = pjs.tiles.newImage('img/gta3_stand.png');
var manstand = {
	stand:tile.getAnimation(0, 0, 85, 85, 1),
}
var tile1 = pjs.tiles.newImage('img/gta3_run.png');
var manrun = {
	run:tile1.getAnimation(0, 0, 82, 85, 6),
}

var animstand = true;

//игрок
var man = game.newAnimationObject({  
  	animation : manstand.stand,
	w : 85, h : 85,
  	x : 100, y : 100,
  	delay:5  
});

man.life = 10;
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
//-------------------------------------------
//обработка кнопок
//-------------------------------------------
function keyIsDown()
{
	// is key Press
	//------------------------------------------
	if ((key.isDown('UP'))||(key.isDown('W'))) 
	{
		if (incar==true)
		{
			carobj.moveAngle(2*speedcar);
			//carobj.setAnimation(manrun.run);

		} else
		{
			man.moveAngle(2*speed);
			man.setAnimation(manrun.run);
		}
	}

	if ((key.isDown('DOWN'))||(key.isDown('S'))) 
	{
		if (incar==true)
		{
			carobj.moveAngle(-2*speedcar/2);
			//carobj.setAnimation(manrun.run);
		} else
		{
			man.moveAngle(-2*speed);
			man.setAnimation(manrun.run);

		}
	}
	if ((key.isDown('LEFT'))||(key.isDown('A'))) 
	{
		if (incar==true)
		{
			carobj.turn(-1*speedcar);			
		} else
		{
			man.turn(-1*speed);
		}
	}
	if ((key.isDown('RIGHT'))||(key.isDown('D')))
	{
		if (incar==true)
		{
			carobj.turn(1*speedcar);			
		} else
		{
			man.turn(1*speed);
		}
	}

	if ((key.isPress('SPACE'))||(mouse.isPress('LEFT')))  
	{   

	}
	if (mouse.isPress('RIGHT'))  
	{    

	if (carobj)
		{
		if (incar==true)
			{
				sys.log("exit car");
				//man.setVisible("true");
				pos = carobj.getPosition();
				man.x = pos.x; man.y=pos.y;
				man.visible = "true";
				sys.log(man);
				incar=false;		
			} else
			{
				incar = true;
				man.x=-100;man.y=-100;
				man.setVisible("false");
				//man.visible = "false";				
				sys.log("in car");
			}
		}

	}
	//------------------------------------------

}

game.newLoop('game', function () 
{
    game.fill('#D9D9D9');

keyIsDown();

endAnimation();
//if (man.frame==man.anim.r){man.setAnimation(manstand.stand);}


if (incar==false) 
	{ 
		var pos = man.getPositionC();
		camera.moveTimeC(pos,10);
	}
if (incar==true) 
	{ 
		if (carobj)
		{
			var pos = carobj.getPositionC();
			camera.moveTimeC(pos,10);
		}
	}

//var pos2 = pjs.vector.getPointAngle(point(pos.x+len, pos.y),pos,man.getAngle());


if (incar==false)
{	
	for (var i = 0; i < objLenght(arrCar); i++) 
		{	
			if (arrCar[i].isDynamicIntersect(man.getDynamicBox())) 
			{
				carobj=arrCar[i];
				//sys.log(arrCar[i]);
			} 
			//var dist = pjs.vector.getDistance(arrCar[i].getPosition(), man.getPosition());
			//if (dist<100) {carobj =	arrCar[i];} else {carobj=0;} 
		}
} else {}

	oop.drawArr(arrCar);

    man.draw();

});

game.startLoop('game');