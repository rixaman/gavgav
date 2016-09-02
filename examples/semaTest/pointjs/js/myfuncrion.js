function checkWin()                        
{
if (objLenght(kbox)<=0) 
	{	
	gameWin.setPositionC(spacecar.getPosition());
  	gameWin.draw();
	spacecar.setVisible(false); 
	pjs.game.stop();
	}
}

function checkDestruction()
{
console.log("GAME OWER!!!!!");
//gameOver.setPositionC(spacecar.getPosition());
//spacecar.setVisible(false);
//gameOver.draw();		
 brush.drawText({
  x : spacecar.getPosition(1).x, y : spacecar.getPosition(1).y,
  text : 'you score: '+score,
  color : 'red',
  size : 100,
  font : 'serif'
 });


pjs.game.stop();
}

function boomDraw(objx,objy)
{
boomPoint.push(new game.newAnimationObject({animation:animGalaxyGa.boom,delay:1,w:50,h:150,x:objx,y:objy}));
}

function endAnimation(boomPoint)
{
for (var i = 0; i < objLenght(boomPoint); i++) 
	{
		if (boomPoint[i]) 
		{
		boomPoint[i].draw();
		if (boomPoint[i].frame==boomPoint[i].anim.r){boomPoint.splice(i,1);};
		}
	}
}


function keyIsDown()
{
  if (key.isDown('UP')) {
    spacecar.move(point(0, -speed*1.5));
  }

  if (key.isDown('DOWN')) {
    spacecar.move(point(0, speed*1.5));
  }

  if (key.isDown('LEFT')) {
    spacecar.move(point(-speed*1.5, 0));
  }

  if (key.isDown('RIGHT')) {
    spacecar.move(point(speed*1.5, 0));
  }

  if (key.isPress('SPACE')) 
	{    
	console.log(objLenght(kbox));
	scpos = spacecar.getPosition();
	scposx=scpos.x; 
	scposy=scpos.y;
                //создаем обьект и кладем в массив packetов
		
		packet.push(new game.newAnimationObject({animation:animpacket.packet,delay:0,w:25,h:25,x:scposx+(spacecar.getSize().w/4),y:scposy}));
		//console.log(packet);	
	}
}
//-------------------------------------------
//-------------------------------------------
function createkbox()
{
	pos = irand(0, 400);
	var time = new game.newAnimationObject({animation:anim.dragon,delay:25,w:50,h:50,x:pos,y:50});
	time.life = 2;	 
	kbox.push(time);
}
//-------------------------------------------


