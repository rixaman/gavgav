(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"images/hero_down.png", id:"hero_down"},
		{src:"images/hero_left.png", id:"hero_left"},
		{src:"images/hero_normal.png", id:"hero_normal"},
		{src:"images/hero_right.png", id:"hero_right"},
		{src:"images/hero_up.png", id:"hero_up"}
	]
};



// symbols:



(lib.hero_down = function() {
	this.initialize(img.hero_down);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,73,61);


(lib.hero_left = function() {
	this.initialize(img.hero_left);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,67,61);


(lib.hero_normal = function() {
	this.initialize(img.hero_normal);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,73,61);


(lib.hero_right = function() {
	this.initialize(img.hero_right);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,67,61);


(lib.hero_up = function() {
	this.initialize(img.hero_up);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,73,61);


(lib.r_glaza_center = function() {
	this.initialize(img.r_glaza_center);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,53,48);


(lib.r_glaza_d = function() {
	this.initialize(img.r_glaza_d);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,49);


(lib.r_glaza_ispug = function() {
	this.initialize(img.r_glaza_ispug);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,53,48);


(lib.r_glaza_ispug_2 = function() {
	this.initialize(img.r_glaza_ispug_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,53,48);


(lib.r_glaza_l = function() {
	this.initialize(img.r_glaza_l);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,49);


(lib.r_glaza_r = function() {
	this.initialize(img.r_glaza_r);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,49);


(lib.r_glaza_red = function() {
	this.initialize(img.r_glaza_red);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,49);


(lib.r_glaza_up = function() {
	this.initialize(img.r_glaza_up);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,49);


(lib.r_glaza_zlost = function() {
	this.initialize(img.r_glaza_zlost);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,49);


(lib.r_hero2 = function() {
	this.initialize(img.r_hero2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,49);


// stage content:
(lib.Безымянный1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.instance = new lib.hero_up();

	this.instance_1 = new lib.hero_right();

	this.instance_2 = new lib.hero_normal();

	this.instance_3 = new lib.hero_left();

	this.instance_4 = new lib.hero_down();

	this.timeline.addTween(cjs.Tween.get({}).to(
		{
			state:[{t:this.instance}]
		}).to(
		{
			state:[{t:this.instance_1}]
		},4).to(
		{
			state:[{t:this.instance_2}]
		},5).to(
		{
			state:[{t:this.instance_3}]
		},5).to(
		{
			state:[{t:this.instance_4}]
		},5).to(
		{
			state:[]
		},5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(275,200,73,61);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;