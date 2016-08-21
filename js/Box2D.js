/*
Класс Прямоугольника

Сдеделал Харас
 */

/*вот исделал */
Box2D = {};

/*
Позиция бокса
 */
Box2D.position = null;

/*
Верхняя левая координата
 */
Box2D.leftUp = null;

/*
Нижняя правая координата
 */
Box2D.rightDown = null;

Box2D.Create = function(lup, rdown){
    Box2D = Box2D;
    Box2D.init(lup, rdown);
    return newV;
}

Box2D.init = function(lup, rdown){
    this.leftUp = lup;
    this.rightDown = rdown;
}

Box2D.draw = function(context){
    
    alert(this.leftUp.x);

    context.beginPath();
    context.moveTo(this.leftUp.x, this.leftUp.y);
    context.lineTo(this.leftUp.x, this.rightDown.x);
    //context.lineTo(this.rightDown.x, this.rightDown.y);
    //context.lineTo(this.rightDown.x, this.leftUp.y);
    //context.lineTo(this.leftUp.x, this.leftUp.y);
    context.stroke();
}