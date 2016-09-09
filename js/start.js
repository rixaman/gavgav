function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tankUp()
{
	if (tank.position.y>cellSize)
	{	
		tank.position.y=tank.position.y-cellSize/2;
		//console.log(tank.position.y);
		tank.position.movepos==false;
	}
}

function tankDown()
{
	if (tank.position.y<13*cellSize)
	{
		tank.position.y=tank.position.y+cellSize/2;
		//console.log(tank.position.y);
		tank.position.movepos==false;	
	}
}

function tankLeft()
{
	if (tank.position.x>cellSize)
	{
		tank.position.x=tank.position.x-cellSize/2;
		//console.log(tank.position.x);
		tank.position.movepos==false;	
	}
}

function tankRight()
{
	if (tank.position.x<13*cellSize)
	{
		tank.position.x=tank.position.x+cellSize/2;
		//console.log(tank.position.x);
		tank.position.movepos==false;		
	}
	
}

function checkKey(e) {
    var event = window.event ? window.event : e;
    switch (event.keyCode) {
    	case 37:{
    				tankLeft();
    				break;
    			}
    	//up
    	case 38:{
    				tankUp();
    				break;
    	}
    	case 39:{
    				tankRight();
	    			break;
		    	}
		//down
    	case 40:{
    				tankDown();
	    			break;
    			}
    }
    Tank.reDraw(context, 100, 100);
    //console.log(event.keyCode)
}

function update(tank) {
	console.log('qq');
    // меняем координаты шарика
    tank.y -= 1;
    // ball.y += ball.vY;

}

function play(canv) {
	//alert("play");
    // draw(); // отрисовываем всё на холсте
    // console.log('12');

	DrawMap(canv);
	//tank.setImageByPath("images/enemy.png");
	tank.draw()
    //update(tank); // обновляем координаты
}

function init(){
	var canv = document.getElementById('canvas'); // Задаём контекст
	context = canv.getContext('2d');           // Контекст холста
	// canv.width  = 45 * 16;
	// canv.height = 45 * 16;
	
 	//  for (var j = 0 ; j < 45; j ++){
	// 	for (var i = 0 ; i < 45; i ++){
	// 		t = Tile;
	// 		index = getRandomInt(1, 6);
	// 		t.init();	
	// 		t.setImageByIndex(index);
	// 		t.position = {x:j,y:i};
	// 		t.draw(context);
	// 	}
	// }
	// танк


	// index = getRandomInt(1, 6);
	// tank.init();	
	// tank.setImageByIndex(1);
	// tank.position = {x:50,y:50};
	// tank.draw(context);

	LoadMap();
	DrawMap(canv);

	setInterval(function() { play(canv) }, 10);
};

LoadPage = function () {
	resources.load([
		'images/TankSets.png',
		'images/hero_normal.png',
	]);

	tank = Tank;
	tank.position.x= 160;
	tank.position.y= 13 * cellSize;
	//загружаем танку спрайт
	tank.setImageByPath("images/enemy.png");

	resources.onReady(init);
	document.onkeydown = checkKey;
};