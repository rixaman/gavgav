/*
Класс Прямоугольника

Сдеделал Харас
 */

/*вот исделал */
function Box2D(v1, v2){
    /*
    Позиция бокса
    */
    this.position = null;

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

