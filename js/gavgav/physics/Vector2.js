/*
Класс вектора

Сдеделал Харас
 */

/*вот исделал */
Vector2 = {};
Vector2.x = 0;
Vector2.y = 0;

/*
что то типа конструктора, функция возвращает вектор c с переданными координатами
 */
Vector2.Create = function(_x, _y){
    newV = Vector2;
    newV.init(_x, _y);
    return newV;
}

function Vector2D(_x, _y){
    this.x = _x;
    this.y = _y;
    
    /*
    Инициализация вектора с параметрами
    */
    this.init = function(_x, _y){
        this.x = _x;
        this.y = _y;
    }

    /*
    Длинна вектора
    */
    this.magnitude = function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    } 

    /*
    Квадрат длинны вектора
    */
    this.sqrMagnitude = function(){
        return this.x * this.x + this.y * this.y;
    } 


    /*
    Функция возвращает новый вектор который есть нормалищзация объекта
    */
    this.normalized = function(){
        len = this.magnitude();
        _x = this.x / len;
        _y = this.y / len;
        
        return Vector2.Create(_x, _y);
    } 

    /*
    Сумма векторов даёт новый вектор
    */
    this.multipy = function(v){
        _x = v.x + this.x;
        _y = v.y + this.y;

        return Vector2.Create(_x, _y);
    }

    /*
    Разность векторов дайт новый вектор
    */
    this.subtract = function(v){
        _x = this.x - v.x;
        _y = this.y - v.y;

        return Vector2.Create(_x, _y);
    }

    /*
    Расстояние между векторами
    */
    this.distance = function(v){
        _v = this.subtract(v);
        return _v.magnitude();
    }

    /*
    Dot Product или скалярное произведение векторов
    Свойства знака имеют место быть из за того, что cos угла >П/2 имеет отрицательное число:  
    •	Если Scalar = 0то вектора перпендикулярны.
    •	Если Scalar>0то вектора смотрят в одну сторону.
    •	Если Scalar<0то вектора смотрят в разные стороны.
    */
    this.dot = function(v){
        return this.x * v.x + this.y * v.y;
    }

    /*
    Угол между векторами
    формула Angle = acos(Scalar(ab, ac)/(len(ab)* len(ac)) );
    */
    this.angle = function(v){
        return Math.acos(this.dot(v)/(this.magnitude() * v.magnitude()));
    }

    this.draw = function(contex){
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(this.x, this.y);
            context.stroke();
    }
}

/*
Инициализация вектора с параметрами
 */
Vector2.init = function(_x, _y){
	this.x = _x;
    this.y = _y;
}

/*
Длинна вектора
 */
Vector2.magnitude = function(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
} 

/*
Квадрат длинны вектора
 */
Vector2.sqrMagnitude = function(){
    return this.x * this.x + this.y * this.y;
} 


/*
Функция возвращает новый вектор который есть нормалищзация объекта
 */
Vector2.normalized = function(){
    len = this.magnitude();
    _x = this.x / len;
    _y = this.y / len;
    
    return Vector2.Create(_x, _y);
} 

/*
Сумма векторов даёт новый вектор
 */
Vector2.multipy = function(v){
    _x = v.x + this.x;
    _y = v.y + this.y;

    return Vector2.Create(_x, _y);
}

/*
Разность векторов дайт новый вектор
 */
Vector2.subtract = function(v){
    _x = this.x - v.x;
    _y = this.y - v.y;

    return Vector2.Create(_x, _y);
}

/*
Расстояние между векторами
*/
Vector2.distance = function(v){
    _v = this.subtract(v);
    return _v.magnitude();
}

/*
Dot Product или скалярное произведение векторов
Свойства знака имеют место быть из за того, что cos угла >П/2 имеет отрицательное число:  
•	Если Scalar = 0то вектора перпендикулярны.
•	Если Scalar>0то вектора смотрят в одну сторону.
•	Если Scalar<0то вектора смотрят в разные стороны.
*/
Vector2.dot = function(v){
    return this.x * v.x + this.y * v.y;
}

/*
Угол между векторами
формула Angle = acos(Scalar(ab, ac)/(len(ab)* len(ac)) );
*/
Vector2.angle = function(v){
    return Math.acos(this.dot(v)/(this.magnitude() * v.magnitude()));
}

Vector2.draw = function(contex){
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(this.x, this.y);
        context.stroke();
}