var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullPage();

var game = pjs.game;
var point = pjs.vector.point;
var size = pjs.vector.size;
var camera = pjs.camera;
var brush = pjs.brush;
var oop = pjs.OOP;
var math = pjs.math;

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

var car = game.newRectObject(
	{
		x: 300, y: 200,
		w: 100, h: 50,
		fillColor: '#000000'
	});


var map = [];
oop.forInt(10, function()
	{
		map.push(game.newRectObject(
		{
			w: 30, h: 30,
			x: math.random(0, 400),
			y: math.random(0, 400),
			fillColor: '#A7623A',
		}));
	});

//-------------------------------------------
//обработка кнопок
//-------------------------------------------
function keyIsDown()
{
//game.getWH(); - Получение фактических размеров игровой сцены. врнет object:w-ширина сцен,h-высота сцены,w2-центр сцены по X,h2-центр сцены по Y
	if ((key.isDown('UP'))||(key.isDown('W'))) 
	{
		car.moveAngle(2*speed);
	}
	if ((key.isDown('DOWN'))||(key.isDown('S'))) 
	{
		car.moveAngle(-2*speed);
	}
	if ((key.isDown('LEFT'))||(key.isDown('A'))) 
	{
		car.turn(-1*speed);
	}
	if ((key.isDown('RIGHT'))||(key.isDown('D')))
	{
		car.turn(1*speed);
	}
	if ((key.isPress('SPACE'))||(mouse.isPress('LEFT')))  
	{   
	}
	if (mouse.isPress('RIGHT'))  
	{    
	}
}

var maxLen = 100;

game.newLoop('game', function () 
{
    game.fill('#D9D9D9');

	keyIsDown();
var len = maxLen;
var pos = car.getPositionC();
var pos2 = pjs.vector.getPointAngle(point(pos.x+len, pos.y),pos,car.getAngle());

camera.moveTimeC(pos,10);


if (map) 
{
for (var i = 0; i < objLenght(map); i++) 
	{
	if (map[i].isDynamicIntersect(car.getDynamicBox())) 
		{
			//map[i].moveAngle(speed, car.getAngle());
			map[i].x = pos2.x;
			map[i].y = pos2.y;

		}
	}
}


/*brush.drawLineA(
{
	x1: pos.x, y1: pos.y,
	x2: pos2.x,y2: pos2.y,
	strokeColor: '#FF0000',
});
*/
	oop.drawArr(map);
    car.draw();
});

game.startLoop('game');