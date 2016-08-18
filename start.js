
tile = {};
tile.size = 16;
tile.img = null;
tile.setImageByName = function(name){

}
tile.setImageByIndex = function(index){
	if(index == 1)this.positionInImage = {x:16,y:0};	
	if(index == 2)this.positionInImage = {x:16,y:1};
	if(index == 3)this.positionInImage = {x:16,y:2};
	if(index == 4)this.positionInImage = {x:17,y:2};
	if(index == 5)this.positionInImage = {x:18,y:2};
	if(index == 6)this.positionInImage = {x:16,y:3};
}
tile.positionInImage = {x:16,y:0};
tile.position = null;
tile.draw = function(contex){
	contex.drawImage(	this.img, 
						this.positionInImage.x * this.size, 
						this.positionInImage.y * this.size, 
						this.size, 
						this.size,
						this.position.x * this.size, 
						this.position.y * this.size, 
						this.size, 
						this.size);	
}
function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
LoadPage = function () {
	var Пример = document.getElementById('canvas'), // Задаём контекст
	Контекст       = Пример.getContext('2d'),           // Контекст холста
	РазмерТайла  = 16,                                 // Размер одной ячейки на карте
	Картинка       = new Image(),                        // "Создаём" изображение
	Карта       =                                     // Карта уровня двумерным массивом
	[
		[{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4}], // 1ый ряд
		[{x:1,y:4},{x:1,y:1},{x:2,y:1},{x:3,y:1},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4}], // 2ый ряд
		[{x:1,y:4},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:1,y:4},{x:1,y:3},{x:1,y:3},{x:1,y:3}], // 3ый ряд
		[{x:1,y:4},{x:3,y:4},{x:2,y:3},{x:3,y:4},{x:1,y:4},{x:1,y:3},{x:1,y:4},{x:1,y:4}], // 4ый ряд
		[{x:1,y:4},{x:3,y:4},{x:2,y:4},{x:3,y:4},{x:1,y:4},{x:1,y:3},{x:1,y:4},{x:1,y:4}], // 5ый ряд
		[{x:1,y:4},{x:1,y:4},{x:1,y:3},{x:1,y:4},{x:1,y:4},{x:1,y:3},{x:1,y:4},{x:1,y:4}], // 6ый ряд
		[{x:1,y:4},{x:1,y:4},{x:1,y:3},{x:1,y:3},{x:1,y:3},{x:1,y:3},{x:1,y:4},{x:1,y:4}], // 7ый ряд
		[{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4}]  // 8ый ряд
	]; // Первая и вторая координата (x и y соответственно) задают фрагмент в исходном изображении
	// Размер холста равный 8х8 клеток
	Пример.width  = 45 * РазмерТайла;
	Пример.height = 45 * РазмерТайла;
	Картинка.src = 'images/TankSets.png';
	Картинка.onload = function() {  // Событие onLoad, ждём момента пока загрузится изображение
		for (var j = 0 ; j < 45; j ++){
			for (var i = 0 ; i < 45; i ++){
				t = tile;
				t.img = Картинка;

				index = getRandomInt(1, 6);
				
				t.setImageByIndex(index);
				t.position = {x:j,y:i};
				t.draw(Контекст);
			}
		}
	}
};