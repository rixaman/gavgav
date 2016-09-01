function keyIsDown()
{
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
		packet.push(new game.newAnimationObject(
			{animation:anim.kaktus2,w:25,h:25,x:scposx+(spacecar.getSize().w/4),y:scposy}));
		//console.log(packet);	
	}
}
//-------------------------------------------
//-------------------------------------------
function createkbox(col,kbox)
{
console.log(col,kbox);
i=0;
var pos = 50;
while (i<col)
	{
	i++;
	kbox.push(new game.newAnimationObject({animation:anim.dragon,delay:25,w:50,h:50,x:pos,y:50,}));
	pos=pos+75;
	}
}
//-------------------------------------------


