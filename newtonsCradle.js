window.addEventListener('load', function() {
    var canvas = document.getElementById('world');
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composites = Matter.Composites,
        World = Matter.World;

// create engine
    var engine = Engine.create(),
        world = engine.world;

// create renderer
    var render = Render.create({
        canvas: canvas,
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            background: 'transparent',
            wireframes: false,
            showAngleIndicator: false,
            showVelocity: true
        }
    });

    Render.run(render);

// create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

// add bodies
    transScaleBodies(100,30);
    function transScaleBodies(x,y) {
        var incomBall = Bodies.circle(770 + x, 230 + y, 30, {velocity: {x:-10, y: 4}, density: 0.0035});
        World.add(world, incomBall);
        var rockOptions = {density: 0.00001, restitution: 0.0},
            fallBall = Bodies.circle(200 + x, 310 + y, 30, rockOptions);
        World.add(world, fallBall);
        var rampIn = Bodies.rectangle(720 + x, 296 + y, 200, 1, {isStatic: true, angle:-57});
        World.add(world, rampIn);
        var rampFlat = Bodies.rectangle(390 + x, 340 + y, 480, 1, {isStatic: true});
        World.add(world, rampFlat);
        var cradle = Composites.newtonsCradle(280 + x, 100 + y, 5, 30, 200);
        World.add(world, cradle);
        var backboard = Bodies.rectangle(60 + x, 360 + y, 1, 100, {isStatic: true});
        World.add(world, backboard);
        var group = Body.nextGroup(true),
            particleOptions = {friction: 0, collisionFilter: 0, render: {visible: false}, restitution: 0.0},//if collision filter is 0, it cannot collide with any other object
            constraintOptions = {stiffness: 0},
            cloth = Composites.softBody(51 + x, 370 + y, 6, 5, 5, 5, false, 8, particleOptions, constraintOptions);
        for (var i = 0; i < 30; i++) {
            if (i == 0 || i == 24 || i == 5 || i == 29) {
                cloth.bodies[i].isStatic = true;
            }
        }
        World.add(world, cloth);
        var saanjiBodies = [incomBall, fallBall, rampFlat, rampIn, cradle, backboard, cloth];
    }
});