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

var speed = 3;

/*
var man = game.newRectObject(
	{
		x: 300, y: 200,
		w: 100, h: 50,
		fillColor: '#000000'
	});
*/

//car animation
var tilecar = pjs.tiles.newImage('img/car1.png');
var gta3car1 = {
	car1:tilecar.getAnimation(0, 0, 160, 75, 1),
}

var map = [];
oop.forInt(5, function()
	{
		map.push(game.newAnimationObject(
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
			carobj.moveAngle(2*speed);
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
			carobj.moveAngle(-2*speed);
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
			carobj.turn(-1*speed);			
		} else
		{
			man.turn(-1*speed);
		}
	}
	if ((key.isDown('RIGHT'))||(key.isDown('D')))
	{
		if (incar==true)
		{
			carobj.turn(1*speed);			
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
		console.log("залазим в "+carobj);
		sys.log(carobj);


	if (carobj)
		{
		if (incar==true)
			{
				sys.log("exit car");
				man.setVisible("true");
				incar=false;		
			} else
			{
				incar = true;
				man.setVisible("false");
				sys.log("in car")
			}
		}


	}
	//------------------------------------------

	//is key Up
	//------------------------------------------
	if ((key.isUp('UP'))||(key.isDown('W'))) 
	{
	}
	if ((key.isUp('DOWN'))||(key.isDown('S'))) 
	{
	}
	//------------------------------------------

}

var maxLen = 100;

game.newLoop('game', function () 
{
    game.fill('#D9D9D9');

keyIsDown();

endAnimation();
//if (man.frame==man.anim.r){man.setAnimation(manstand.stand);}


var len = maxLen;
var pos = man.getPositionC();
//var pos2 = pjs.vector.getPointAngle(point(pos.x+len, pos.y),pos,man.getAngle());

camera.moveTimeC(pos,10);

for (var i = 0; i < objLenght(map); i++) 
	{
	var dist = pjs.vector.getDistance(map[i].getPosition(), man.getPosition());
	if (dist<100) {carobj = map[i];} else {carobj=0;} 
	}
/*
if (map) 
{
for (var i = 0; i < objLenght(map); i++) 
	{
	if (map[i].isDynamicIntersect(man.getDynamicBox())) 
		{
			//map[i].moveAngle(speed, man.getAngle());
			map[i].x = pos2.x;
			map[i].y = pos2.y;

		}
	}
}
*/

/*brush.drawLineA(
{
	x1: pos.x, y1: pos.y,
	x2: pos2.x,y2: pos2.y,
	strokeColor: '#FF0000',
});
*/
	

	oop.drawArr(map);
    man.draw();





});

game.startLoop('game');