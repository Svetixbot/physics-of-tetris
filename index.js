var matter = require('matter-js');

var Bodies = matter.Bodies,
    Engine = matter.Engine,
    Render = matter.Render,
    World  = matter.World,
    Events = matter.Events,
    Body   = matter.Body;

var engine = Engine.create(),
    world  = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: Math.min(document.documentElement.clientWidth, 800),
      height: Math.min(document.documentElement.clientHeight, 600),
      showCollisions: true,
      showConvexHulls: true,
      wireframes: false
    }
});

Engine.run(engine);
Render.run(render);
  

var createOTetrimino = function () {

  var oTetrimino = Body.create( { parts: [
      Bodies.rectangle(390, 10, 20, 20),
      Bodies.rectangle(410, 30, 20, 20),
      Bodies.rectangle(410, 10, 20, 20),
      Bodies.rectangle(390, 30, 20, 20)]});

  return oTetrimino;
}  


var top = Bodies.rectangle(400, 0, 400, 50, { isStatic: true, label: "top"})

World.add(world, [
  top,
  Bodies.rectangle(400, 600, 400, 50, { isStatic: true, label: "bottom" }),
  Bodies.rectangle(600, 300, 30, 600, { isStatic: true }),
  Bodies.rectangle(200, 300, 30, 600, { isStatic: true })
]);

var addBall = function() {
  World.add(world, [createOTetrimino()]);
}

var morePlease = true

var counter = 0;

Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      if (pair.bodyA === top || pair.bodyB === top)
        morePlease = false;
    }
});

Events.on(engine, 'collisionEnd', function(event) {    
  var pairs = event.pairs;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    if (pair.bodyA === top || pair.bodyB === top)
      morePlease = true;
  }
});


Events.on(engine, 'afterUpdate', function(event) {
    counter += 1;

    // every 1.5 sec
    if (counter >= 60 * 0.5 && morePlease) {
        addBall();
        counter = 0;
    }
});

