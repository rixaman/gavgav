Tank = {};
Tank.size = 60;
Tank.init = function()
{
   
}

//---------------------------------------------------
Tank.setImageByPath = function(path)
{
        pic = new Image();          
        pic.src = path;
        tank.img = pic; 
}

Tank.draw = function()
{

    context.drawImage(tank.img, tank.position.x, tank.position.y); 
    tank.position.movepos=true;
    //contex.drawImage(this.img, this.positionInImage.x, this.positionInImage.y);    
}
//---------------------------------------------------

Tank.setImageByIndex = function(index)
{
   // x:(canv.width/2), y:(canv.height)
   if(index == 1)
   {
        this.positionInImage = {x:310,y:650};
   }	
}

Tank.positionInImage = {x:0, y:0};
Tank.position = {x:0, y:0, bol:false};
Tank.renderEntity = function(contex) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    contex.drawImage(ctx);
    ctx.restore();
}



Tank.reDraw = function(contex, x, y)
{
    // contex.drawImage(this.img, x, y);	
}


function DrawTank(x, y) 
{
    context.fillStyle = '#ff0000';
    context.fillRect(x, y, cellSize, cellSize);
    // context.fillStyle = '#909090';
    // context.beginPath();
    // context.moveTo(x, y + cellSize / 2);
    // context.lineTo(x + cellSize / 2, y + cellSize / 2);
    // context.lineTo(x + cellSize / 2, y);
    context.fill();
}

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

function createRocket()
{
    console.log("piy piy");
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
        case 32:{
            createRocket();
            break;
        }
    }
    // Tank.reDraw(context, 100, 100);
    // console.log(event.keyCode);
    console.log(tank.position.x);
    console.log(tank.position.y);
}

function update(tank) {
    console.log('qq');
    // меняем координаты шарика
    tank.y -= 1;
    // ball.y += ball.vY;
}