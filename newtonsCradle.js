window.addEventListener('load', function() {
    var canvas = document.getElementById('world');
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
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
    //ball that falls down the angled ramp
    var incomBall = Bodies.circle(770, 230, 30);
    World.add(world, incomBall);
    Body.setVelocity(incomBall, {x:-10, y:4});
    //ball that falls off the horizontal ramp into a hole
    var fallBall = Bodies.circle(200, 310, 30);
    World.add(world, fallBall);
    //The circle for the hole
    var hole = Bodies.circle(90, 410, 30, {isStatic:true});
    World.add(world, hole);
    //The ramp leading the ball into Newton's Cradle; connects with the part before
    var rampIn = Bodies.rectangle(280, 300, 200, 1, {isStatic:true});
    World.add(world, rampIn);
    Body.translate(rampIn, {x: 440, y:-4});
    Body.setAngle(rampIn, -57);
    //The horizontal ramp
    var rampFlat = Bodies.rectangle(380, 340, 500, 1, {isStatic:true});
    World.add(world, rampFlat);
    //Newton's Cradle
    var cradle = Composites.newtonsCradle(280, 100, 5, 30, 200);
    World.add(world, cradle);
    //check "collision" by comparing y positions of two objects
    while(!(fallBall.position.y < hole.position.y)){
        Body.setStatic(fallBall, true);
        fallBall.render.visible(false);
    }
});