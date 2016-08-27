/*
Класс Прямоугольника

Сдеделал Харас
 */

/*вот исделал */
function Box2D(v1, v2){
    /*
    Позиция бокса
    */
    //this.position = null;

    /*
    Верхняя левая координата
    */
    this.leftUp = v1;

    /*
    Нижняя правая координата
    */
    this.rightDown = v2;

    this.init = function(lup, rdown){
        this.leftUp = lup;
        this.rightDown = rdown;
    }

    this.getCenterPosition = function(){
        var t = this.leftUp.multipy(this.rightDown);
        t.x = t.x/2;
        t.y = t.y/2;
        return t; 
    }

    this.сollisionToBox2D = function(box){
        
        //Получаем центры 
        var pos1 = this.getCenterPosition();
        var pos2 = box.getCenterPosition();

        //Получаем расстояния от центров
        var tX = Math.abs(pos1.x - pos2.x);
        var tY = Math.abs(pos1.y - pos2.y);

        //Получаем сумму половины длин сторон
        var dt = this.leftUp.subtract(this.rightDown);
        var db = box.leftUp.subtract(box.rightDown);

        if(
            (tX > (dt.x + db.x)) &&
            (tY > (dt.y + db.y))
            ) return true;
        return false;
    }


    this.draw = function(context){
        
        context.beginPath();
        context.moveTo(this.leftUp.x, this.leftUp.y);
        context.lineTo(this.leftUp.x, this.rightDown.y);
        context.lineTo(this.rightDown.x, this.rightDown.y);
        context.lineTo(this.rightDown.x, this.leftUp.y);
        context.lineTo(this.leftUp.x, this.leftUp.y);
        context.stroke();
    }
}

