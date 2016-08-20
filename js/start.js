function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkKey(e) {
    var event = window.event ? window.event : e;
    switch (event.keyCode) {
    	case 37:
    		break;
    	case 38:
    		break;
    	case 39:
    		break;
    	case 40:
    		break;
    }
    Tank.reDraw(context, 100, 100);
    console.log(event.keyCode)
}

function init(){
	var canv = document.getElementById('canvas'); // Задаём контекст
	context = canv.getContext('2d');           // Контекст холста
	canv.width  = 45 * 16;
	canv.height = 45 * 16;
	
    for (var j = 0 ; j < 45; j ++){
		for (var i = 0 ; i < 45; i ++){
			t = tile;
			index = getRandomInt(1, 6);
			t.init();	
			t.setImageByIndex(index);
			t.position = {x:j,y:i};
			t.draw(context);
		}
	}
	// танк
	tank = Tank;
	// index = getRandomInt(1, 6);
	tank.init();	
	tank.setImageByIndex(1);
	// tank.position = {x:50,y:50};
	tank.draw(context);
};

LoadPage = function () {
	resources.load([
		'images/TankSets.png',
		'images/hero_normal.png',
	]);
	resources.onReady(init);
	document.onkeydown = checkKey;
};