function Tile(){
	this.size = 16;
	this.init = function(){
		this.img = resources.get('images/TankSets.png');
	}
	this.setImageByName = function(name){

	}

	this.setImageByIndex = function(index){
		if(index == 1)this.positionInImage = {x:16,y:0};	
		if(index == 2)this.positionInImage = {x:16,y:1};
		if(index == 3)this.positionInImage = {x:16,y:2};
		if(index == 4)this.positionInImage = {x:17,y:2};
		if(index == 5)this.positionInImage = {x:18,y:2};
		if(index == 6)this.positionInImage = {x:16,y:3};
	}
	this.positionInImage = {x:16,y:0};
	this.position = null;
	this.renderEntity = function(contex) {
		ctx.save();
		ctx.translate(this.position.x, this.position.y);
		contex.drawImage(ctx);
		ctx.restore();
	}

	this.draw = function(contex){
		contex.drawImage(
			this.img, 
			this.positionInImage.x * this.size, 
			this.positionInImage.y * this.size, 
			this.size, 
			this.size,
			this.position.x * this.size, 
			this.position.y * this.size, 
			this.size, 
			this.size
		);	
	}
}
