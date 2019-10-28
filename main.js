window.addEventListener('load', function() {
    var canvas = document.getElementById('world');
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composites = Matter.Composites,
        Composite = Matter.Composite,
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
    rockOptions = { density: 0.00001, restitution: 0.0},
        fallBall = Bodies.circle(200, 310, 30, rockOptions);
    World.add(world, fallBall);
    //The ramp leading the ball into Newton's Cradle; connects with the part before
    var rampIn = Bodies.rectangle(720, 296, 200, 1, {isStatic:true});
    World.add(world, rampIn);
    Body.setAngle(rampIn, -57);
    //The horizontal ramp
    var rampFlat = Bodies.rectangle(390, 340, 480, 1, {isStatic:true});
    World.add(world, rampFlat);
    //Newton's Cradle
    var cradle = Composites.newtonsCradle(280, 100, 5, 30, 200);
    World.add(world, cradle);
    var currentX = cradle.position.x();
    var currentY = cradle.position.y();
    //backboard
    var backboard = Bodies.rectangle(60, 360, 1, 100, {isStatic:true});
    World.add(world, backboard);
    //net
    var group = Body.nextGroup(true),
        particleOptions = { friction: 0, collisionFilter: 0, render: { visible: false }, restitution: 0.0},//if collision filter is 0, it cannot collide with any other object
        constraintOptions = { stiffness: 0 },
        cloth = Composites.softBody(51, 370, 6, 5, 5, 5, false, 8, particleOptions, constraintOptions);

    for (var i = 0; i < 30; i++) {
        if(i==0 || i==24 || i==5 || i==29){
            cloth.bodies[i].isStatic = true;
        }
    }
    World.add(world, cloth);
    groupTranslate(30,50);
    //function that changes x and y of all pieces with an import of an x and y
    function groupTranslate(x, y) {
        Body.translate(incomBall,{x:x, y:y});
        Body.translate(fallBall,{x:x, y:y});
        Composite.translate(cloth,{x:x, y:y});
        Body.translate(backboard,{x:x, y:y});
        Body.translate(rampIn,{x:x, y:y});
        Body.translate(rampFlat,{x:x, y:y});
        Composite.translate(cradle, {x: -(currentX - x), y:-(currentY - y)})
    }
    function groupScale(x , y) {
        Body.scale({incomBall, fallBall, cloth, backboard, cradle, rampFlat, rampIn}, x, y);
    }
});