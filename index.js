var matter = require('matter-js');

var Bodies = matter.Bodies,
    Engine = matter.Engine,
    Render = matter.Render,
    World  = matter.World,
    Events = matter.Events,
    Bounds = matter.Bounds;

var engine = Engine.create(),
    world  = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: Math.min(document.documentElement.clientWidth, 800),
      height: Math.min(document.documentElement.clientHeight, 600),
      showAxes: true,
      showCollisions: true,
      showConvexHulls: true
    }
});

Engine.run(engine);
Render.run(render);
  
World.add(world, [
  Bodies.rectangle(400, 600, 400, 50, { isStatic: true }),
  Bodies.rectangle(600, 300, 30, 600, { isStatic: true }),
  Bodies.rectangle(200, 300, 30, 600, { isStatic: true })
]);

var addBall = function() {
  var center = Bodies.circle(400, 0, 20);
  World.add(world, [center]);
}

var counter = 0;

Events.on(engine, 'afterUpdate', function(event) {
    counter += 1;

    // every 1.5 sec
    if (counter >= 60 * 0.5) {
        addBall();
        counter = 0;
    }
});

