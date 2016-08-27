// Tank's level
// Размер одной ячейки на карте
var cellSize = 32,
    // Массив карты поля боя
    map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
        [2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

// Рисуем часть кирпичной стены
function DrawBrick(x, y) {
    // Отрисовка основного цвета кирпича
    context.fillStyle = '#FFA500';
    context.fillRect(x, y, cellSize / 2, cellSize / 2);
    // Отрисовка теней
    context.fillStyle = '#CD8500';
    context.fillRect(x, y, cellSize / 2, cellSize / 16);
    context.fillRect(x, y + cellSize / 4, cellSize / 2, cellSize / 16);
    context.fillRect(x + cellSize / 4, y, cellSize / 16, cellSize / 4);
    context.fillRect(x + cellSize / 16, y + cellSize / 4, cellSize / 16, cellSize / 4);
    // Отрисовка раствора между кирпичами
    context.fillStyle = '#D3D3D3';
    context.fillRect(x, y + cellSize / 4 - cellSize / 16, cellSize / 2, cellSize / 16);
    context.fillRect(x, y + cellSize / 2 - cellSize / 16, cellSize / 2, cellSize / 16);
    context.fillRect(x + cellSize / 4 - cellSize / 16, y, cellSize / 16, cellSize / 4);
    context.fillRect(x, y + cellSize / 4 - cellSize / 16, cellSize / 16, cellSize / 4);
}

// Рисуем часть бетонного блока
function DrawHardBrick(x, y) {
    // Отрисовка основного фона
    context.fillStyle = '#cccccc';
    context.fillRect(x, y, cellSize / 2, cellSize / 2);
    // Отрисовка Тени
    context.fillStyle = '#909090';
    context.beginPath();
    context.moveTo(x, y + cellSize / 2);
    context.lineTo(x + cellSize / 2, y + cellSize / 2);
    context.lineTo(x + cellSize / 2, y);
    context.fill();
    // Отрисовка белого прямоугольника сверху
    context.fillStyle = '#eeeeee';
    context.fillRect(x + cellSize / 8, y + cellSize / 8, cellSize / 4, cellSize / 4);
}
tiles = [];
function LoadMap() {
    for (var j = 0 ; j < 26; j ++){
	    for (var i = 0 ; i < 26; i ++){
            index = map[j][i];
	 		if(index == 0)continue;
            t = new Tile();
	 		t.init();	
	 		t.setImageByIndex(index);
	 		t.position = {x:i + 2, y:j + 2};
            tiles[tiles.length] = t;
        }
    }
}


function DrawMap(canv) {
	canv.width = 15 * cellSize;
	canv.height = 15 * cellSize;
	context.fillStyle = '#ccc';
	context.fillRect(0, 0, canv.width, canv.height);
	context.fillStyle = '#000';
	context.fillRect(cellSize, cellSize, 13 * cellSize, 13 * cellSize);
	// Цикл обрабатывающий массив в котором содержатся значения элементов карты
	// если попадается 1 то рисуется кирпичный блок
	// если 2, то бетонная стена
	/*for (var j = 0; j < 26; j++)
	for (var i = 0; i < 26; i++) {
	    switch (map[j][i]) {
	        case 1:
	            DrawBrick(i * cellSize / 2 + cellSize, j * cellSize / 2 + cellSize);
	            break;
	        case 2:
	            DrawHardBrick(i * cellSize / 2 + cellSize, j * cellSize / 2 + cellSize);
	            break;
	    }*
	}	*/

    for(var i = 0; i < tiles.length;i++){
        tiles[i].draw(context);
    }
}