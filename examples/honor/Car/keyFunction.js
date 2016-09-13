//-------------------------------------------
//обработка кнопок
//-------------------------------------------
function keyIsDown()
{
	// is key Press
	//------------------------------------------
	//вперед/вверх
	if ((key.isDown('UP'))||(key.isDown('W'))) 
	{
		if (incar==true)
		{
			carobj.moveAngle(2*speedcar);
		}
		 else
		{
			man.moveAngle(2*speed);
			man.setAnimation(manrun.run);
		}
		
	}
	

	if ((key.isDown('DOWN'))||(key.isDown('S'))) 
	{
		if (incar==true)
		{
			carobj.moveAngle(-2*speedcar/2);
			//carobj.setAnimation(manrun.run);
		} else
		{
			man.moveAngle(-2*speed);
			man.setAnimation(manrun.run);
		}
	}

	if ((key.isDown('LEFT'))||(key.isDown('A'))) 
	{
		if (incar==true)
		{
			carobj.turn(-1*speedcar);			
		} else
		{
			man.turn(-1*speed);
		}
	}

	if ((key.isDown('RIGHT'))||(key.isDown('D')))
	{
		if (incar==true)
		{
			carobj.turn(1*speedcar);			
		} else
		{
			man.turn(1*speed);
		}
	}

	if ((key.isPress('SPACE'))||(mouse.isPress('LEFT')))  
	{   

	}

	//правый клик мыши
	//--------------------------------------------------------------------
	if (mouse.isPress('RIGHT'))  
	{    
		if (incar==true)
			{
				if (carobj)
					{
						sys.log("exit car");
						//man.setVisible("true");
						pos = carobj.getPosition();
						man.x = pos.x; man.y=pos.y;
						man.visible = "true";
						sys.log(man);
						incar=false;
					}
			} else
			{ 

				for (var i = 0; i < objLenght(arrCar); i++) 
					{	
					if (arrCar[i].isDynamicIntersect(man.getDynamicBox())) 
						{
							carobj=arrCar[i];
						}
					}
				if (carobj)
					{
						incar = true;
						man.x=-100;man.y=-100;
						man.setVisible("false");
						//man.visible = "false";				
						sys.log("in car");						
					}
			}
	}
	//--------------------------------------------------------------------
}
	//------------------------------------------