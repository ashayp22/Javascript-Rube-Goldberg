var canvas = document.getElementById("world");

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Vector = Matter.Vector,
    Body = Matter.Body;

var engine = Engine.create();

var group = Body.nextGroup(true);

var render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: 700,
        height: 700,
        background: '#6e7075',
        wireframes: false,
        showAngleIndicator: true
    }
});

var pulleyCircle = Bodies.circle(300, 300, 60, {
    collisionFilter: {
        group: group
    },
    isStatic: true,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

var rubesBalls = Bodies.circle(190, 200, 20, {
    isStatic: false,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

var pulleyBar1 = Bodies.rectangle(300, 300, 300, 10, {
    frictionAir: 0.0001,
    collisionFilter: {
        group: group
    },
    isStatic: false,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

var rampDown_part1 = Bodies.rectangle(460, 250, 30, 10, {
    isStatic: true,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

var secondBall = Bodies.circle(447, 200, 20, {
    isStatic: false,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

var rampDown_part2 = Bodies.rectangle(510, 285, 100, 10, {
    isStatic: true,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

Body.rotate(rampDown_part2, 0.785398);

var constraint = Constraint.create({
    bodyA: pulleyCircle,
    pointB: Vector.clone(pulleyCircle.position),
    length: 0,
    stiffness: 1,
});

var consBarPulley = Constraint.create({
   bodyA: pulleyCircle,
   bodyB: pulleyBar1,
   length: 0,
   stiffness: 1,
});

var ground = Bodies.rectangle(400, 710, 810, 60, { isStatic: true });

World.add(engine.world, [pulleyCircle, constraint, rubesBalls, pulleyBar1, ground, consBarPulley, rampDown_part1, secondBall, rampDown_part2]);

var mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: canvas,
    constraint: {
        render: {
            visible: false
        },
        stiffness: 0.8
    }
});

function myFunction(){

}

World.add(engine.world, mouseConstraint);

Engine.run(engine);
Render.run(render);