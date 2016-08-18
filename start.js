function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init(){
	var canv = document.getElementById('canvas'); // Задаём контекст
	context       = canv.getContext('2d');           // Контекст холста
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
};

LoadPage = function () {
	resources.load([
		'images/TankSets.png'
			]);
	
	resources.onReady(init);
};