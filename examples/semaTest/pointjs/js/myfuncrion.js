function lifeDraw(kbox)
{
	//console.log(kbox);	
	kbox.x
	kbox.y
	kbox.life

	kboxtext = "";

	for (var i = 0; i < kbox.life; i++) 
	{
		kboxtext = kboxtext+".";		
	}

	brush.drawText({
		x : kbox.x, y : kbox.y-25,
		text : kboxtext,
		color : 'white',
		size : 30,
		font : 'serif'
	});

}

//
function skyDrawMove()
{
var dt = game.getDT();
var camPos = camera.getPosition();

OOP.forArr(stars, function (el) 
	{
	el.draw();
    var fact = el.getDistanceC(spacecar.getPosition());
    if (fact <= visdist) 
    	{
      	el.visible=true;//el.transparent(0.01);
      	el.move(point(el.dx*dt, el.dy*dt));
      	if (el.x+el.w < camPos.x) el.x = -el.w + camPos.x+game.getWH().w;
      	if (el.y+el.h < camPos.y) el.y = -el.h + camPos.y+game.getWH().h;
      	if (el.x > camPos.x+game.getWH().w) el.x = camPos.x;
      	if (el.y > camPos.y+game.getWH().h) el.y = camPos.x;
    	} else 
    	{
    	el.visible=false;
      	//el.transparent(-0.01);
    	}
	});
}
//вызывает победу и завершает игру
function checkWin()                        
{
//	if (objLenght(kbox)<=0) {}	
		gameWin.setPositionC(spacecar.getPosition());
		spacecar.setVisible(false);
	  	gameWin.draw(); 
		pjs.game.stop();
}
//вызывает проигрыш и завершает игру
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
//-------------------------------------------
//вывод текста
//-------------------------------------------
function textDraw()
{

	pos = pjs.camera.getPosition(1);
	posx = pos.x;
	posy = pos.y;


		brush.drawText({
		x : posx-500, y : posy-250,
		text : 'fps: '+game.getFPS(),
		color : 'white',
		size : 30,
		font : 'serif'
	});

	brush.drawText({
		x : posx-400, y : posy-250,
		text : 'score: '+score,
		color : 'white',
		size : 30,
		font : 'serif'
	});

	brush.drawText({
		x : posx-270, y : posy-250,
		text : 'speed: '+speedkbox,
		color : 'green',
		size : 30,
		font : 'serif'
	});
}
//-------------------------------------------
//проиграть анимацию взрыва ракеты
//-------------------------------------------
function boomDraw(objx,objy,thisanim)
{
	boomPoint.push(new game.newAnimationObject({animation:thisanim,delay:1,w:40,h:40,x:objx,y:objy}));
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
//-------------------------------------------
//обработка кнопок
//-------------------------------------------
function keyIsDown()
{
//game.getWH(); - Получение фактических размеров игровой сцены. врнет object:w-ширина сцен,h-высота сцены,w2-центр сцены по X,h2-центр сцены по Y
	if ((key.isDown('UP'))||(key.isDown('W'))) 
	{
		scpos = spacecar.getPosition();	
		if (scpos.y>=0) 
			{
				spacecar.move(point(0, -speedsc*1.5));
			}
	}

	if ((key.isDown('DOWN'))||(key.isDown('S'))) 
	{
		scpos = spacecar.getPosition();	
		wh = game.getWH();		
		if (scpos.y<=wh.h) 
			{
				spacecar.move(point(0,speedsc*1.5));
			}
	}

	if ((key.isDown('LEFT'))||(key.isDown('A'))) 
	{
	scpos = spacecar.getPosition();	
		if (scpos.x>=0) 
			{
				spacecar.move(point(-speedsc*1.5, 0));
			}
	}

	if ((key.isDown('RIGHT'))||(key.isDown('D')))
	{
	scpos = spacecar.getPosition();	
	wh = game.getWH();		
		if (scpos.x<=wh.w) 
			{
				spacecar.move(point(speedsc*1.5, 0));
			}
	}

	if ((key.isPress('SPACE'))||(mouse.isPress('LEFT')))  
	{   
		//console.log("mouse left click"); 
		scpos = spacecar.getPosition();
		scposx=scpos.x; 
		scposy=scpos.y;
		//создаем обьект и кладем в массив packetов
		newpacket = new game.newAnimationObject({animation:animpacket.packet,delay:3,w:25,h:25,x:scposx+(spacecar.getSize().w/4),y:scposy});
		//задаем угол packet считывая угол мыши 
		newpacket.angle = spacecar.getAngle();
		//newpacket.myAngle = spacecar.getAngle();
		packet.push(newpacket);
		//console.log(packet);	
	}

if (mouse.isPress('RIGHT'))  
	{    
		//console.log("mouse right click");
		
		if (score>=20) 
			{
			score = score - 20;
			scpos = spacecar.getPosition();
			scposx=scpos.x; 
			scposy=scpos.y;
			//создаем обьект и кладем в массив packetов
			for (var i = 0; i < objLenght(kbox); i++) 
			{
				newpacket = new game.newAnimationObject({animation:animpacket.packet,delay:0,w:25,h:25,x:scposx+(spacecar.getSize().w/4),y:scposy});
				//задаем угол packet считывая угол мыши 
				newpacket.angle = pjs.vector.getAngle2Points(spacecar.getPosition(),kbox[i].getPosition());
				//newpacket.myAngle = spacecar.getAngle();
				packet.push(newpacket);
			} 
		} 
	}
}
//-------------------------------------------
//-------------------------------------------
function createkbox()
{
	//выбираем рандомно сторону появления противника
	//createkboxtime=createkboxtime-10;
	side = irand(1, 4);
	//создаем противника
	var time = new game.newAnimationObject({animation:animenemy.enemy,delay:25,w:50,h:50,x:-100,y:-100});
	time.life = lifekbox;
	wh = game.getWH();
	getmaxx=wh.w; getmaxy=wh.h;	 
	switch(side)
			{
				// с лева
				case 1: 	{
								posx = irand(0, 100);
								posy = irand(0, getmaxy);
								time.x = -posx;
								time.y = posy; 
								kbox.push(time);	
								break;
							} 
				// с права 
				case 2: 	{
								posx = irand(getmaxx, getmaxx+100);
								posy = irand(0, getmaxy);
								time.x = posx;
								time.y = posy; 
								kbox.push(time);
								break;
							}
				// с верху
				case 3: 	{	
								posx = irand(0, getmaxx);
								posy = irand(0, 100);
								time.x = posx;
								time.y = -posy; 
								pos = irand(0, 4);
								kbox.push(time);
								break;
							}
				// с низу
				case 4: 	{ 
								posx = irand(getmaxx, 100);
								posy = irand(0, getmaxy);
								time.x = posx;
								time.y = posy; 
								kbox.push(time);
								break;
							}
			}
}
//-------------------------------------------