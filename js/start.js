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