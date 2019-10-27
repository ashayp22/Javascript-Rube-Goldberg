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

var firstBall = Bodies.circle(300, 350, 25, {
    isStatic: false,
    density: 0.5,
    frictionAir: 0.001,
    restitution: 0,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

var secondBall = Bodies.circle(450, 460, 25, {
    isStatic: false,
    density: 0.005,
    frictionAir: 0.001,
    restitution: 0,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

var ground = Bodies.rectangle(400, 710, 810, 60, { isStatic: true });

var trianglePedestal = Bodies.polygon(350, 550, 3, 40, {
    isStatic: true,
    collisionFilter: {
        group: group
    },
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});
Matter.Body.rotate(trianglePedestal, Math.PI/2);

var holdCatapult = Bodies.rectangle(450, 543, 40, 40, {
    isStatic: true,
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
} );

var holdingBorder = Bodies.rectangle(495, 475, 10, 50, {
   isStatic: false,
   render: {
       fillStyle: '#000000',
       strokeStyle: 'white',
       lineWidth: 2
   }
});

var catapultBoard = Bodies.rectangle(350, 510, 300, 25, {
    isStatic: false,
    collisionFilter: {
        group: group
    },
    render: {
        fillStyle: '#000000',
        strokeStyle: 'white',
        lineWidth: 2
    }
});

var constraint = Constraint.create({
    bodyA: catapultBoard,
    pointB: Vector.clone(catapultBoard.position),
    length: 0,
    stiffness: 1,
});

// var board2board = Constraint.create({
//     bodyA: catapultBoard,
//     bodyB: holdingBorder,
//
//     length: 0,
//     stiffness: 1
// });

World.add(engine.world, [secondBall, ground, trianglePedestal, catapultBoard, constraint, holdCatapult, holdingBorder, firstBall]);
var mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: canvas,
    constraint: {
        render: {
            visible: false
        },
        stiffness: 0.8
    }
});
World.add(engine.world, mouseConstraint);

Engine.run(engine);
Render.run(render);