/*
Класс Circle2D

Сдеделал Харас
 */

function Circle2D(pos, rad){
    /*
    Позиция структура Vector2
    */
    this.position = pos;

    /*
    Радиус - вещественное число
    */
    this.radius = rad;

    /*
    Отладочно нарисовать
     */
    this.draw = function(context){
        
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.stroke();
    }
}