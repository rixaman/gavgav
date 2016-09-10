var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullPage();

var game = pjs.game;
var point = pjs.vector.point;
var pic = pjs.tiles;

var height = game.getWH().h;
var width = game.getWH().w;

//---------------------------------------------------
//инициализация контроля клавиатуры и мыши
var key = pjs.keyControl;
key.initKeyControl();
var mouse = pjs.mouseControl;
mouse.initMouseControl();
//---------------------------------------------------

//скорость игрока
var speeddoc = 3;

//background
//----------------
var fon1 = game.newImageObject({
 x : 0, y : 0,
 file : 'imgs/fon.jpg',
 h : height
});
//----------------

//ground
//----------------
var gr1 = game.newImageObject({
 x : 0, y : height-179,
 file : 'imgs/ground.png',
 w : width
});
//----------------

//animation : pjs.tiles.newAnimation('imgs/run_dog.png', 150, 120, 5)

//анимация собаки
//----------------
var tile1 = pic.newImage('imgs/run_dog_right.png');
	var animrdog = {
		runrdog:tile1.getAnimation(0, 0, 150, 120, 5),
	}
var tile2 = pic.newImage('imgs/run_dog_left.png');
	var animldog = {
		runldog:tile2.getAnimation(0, 0, 150, 120, 5),
	}
var tile2 = pic.newImage('imgs/run_dog_left.png');
	var animldog = {
		runldog:tile2.getAnimation(0, 0, 150, 120, 5),
	}
//----------------

//dog
//----------------
var dog = game.newAnimationObject({
    x : 100, y : height -210,
    h : 120, w : 150,
  	animation:animrdog.runrdog,
  	delay : 10,
});
//----------------

//-------------------------------------------
//обработка кнопок
//-------------------------------------------
function keyIsDown()
{
//game.getWH(); - Получение фактических размеров игровой сцены. врнет object:w-ширина сцен,h-высота сцены,w2-центр сцены по X,h2-центр сцены по Y
	if ((key.isDown('UP'))||(key.isDown('W'))) 
	{

	}

	if ((key.isDown('DOWN'))||(key.isDown('S'))) 
	{

	}

	if ((key.isDown('LEFT'))||(key.isDown('A'))) 
	{
		dog.setAnimation(animldog.runldog);
		pos = dog.getPosition();	
		if (pos.x>=0) 
			{
				dog.move(point(-speeddoc*1.5, 0));
			}
	}

	if ((key.isDown('RIGHT'))||(key.isDown('D')))
	{
		dog.setAnimation(animrdog.runrdog);
		pos = dog.getPosition();	
		wh = game.getWH();		
		if (pos.x<=wh.w) 
			{
				dog.move(point(speeddoc*1.5, 0));
			}
	}

	if ((key.isPress('SPACE'))||(mouse.isPress('LEFT')))  
	{   

		//хз как это сделать
		pos = dog.getPosition();	
		pos.y = pos.y - 30;
		console.log(dog.getPosition());
		dog.moveTime(pos, 30);

	}

	if (mouse.isPress('RIGHT'))  
		{    
		}
}



game.newLoop('game', function () {
    game.fill('#D9D9D9');

    //key down
    keyIsDown();

    //background draw
    fon1.draw();
    //ground draw
    gr1.draw();
    //dog draw
    dog.draw();

});

game.startLoop('game');