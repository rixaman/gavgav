Tank = {};
Tank.size = 60;
Tank.init = function(){
	Tank.img = resources.get('images/hero_normal.png');
}

Tank.setImageByName = function(name){

}
Tank.setImageByIndex = function(index){
	// x:(canv.width/2), y:(canv.height)
	if(index == 1){
		this.positionInImage = {x:310,y:650};
	}	
}
Tank.positionInImage = {x:0, y:0};
Tank.position = null;
Tank.renderEntity = function(contex) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    contex.drawImage(ctx);
    ctx.restore();
}

Tank.draw = function(contex){
	contex.drawImage(this.img, this.positionInImage.x, this.positionInImage.y);	
}
Tank.reDraw = function(contex, x, y){
	// contex.drawImage(this.img, x, y);	
}


function DrawTank(x, y) {
    context.fillStyle = '#ff0000';
    context.fillRect(x, y, cellSize, cellSize);
    // context.fillStyle = '#909090';
    // context.beginPath();
    // context.moveTo(x, y + cellSize / 2);
    // context.lineTo(x + cellSize / 2, y + cellSize / 2);
    // context.lineTo(x + cellSize / 2, y);
    context.fill();
}