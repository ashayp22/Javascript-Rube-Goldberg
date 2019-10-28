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

var secondBall, trianglePedestal, catapultBoard, constraint1, holdCatapult, holdingBorder, firstBall;

changeLocation(0, 0);
changeSize(1, 1);

function changeLocation(x, y){
    firstBall = Bodies.circle(300 + x, 350 + y, 25, {
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

    secondBall = Bodies.circle(450 + x, 460 + y, 25, {
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

    trianglePedestal = Bodies.polygon(350 + x, 550 + y, 3, 40, {
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

    holdCatapult = Bodies.rectangle(450 + x, 543 + y, 40, 40, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'white',
            lineWidth: 2
        }
    } );

    holdingBorder = Bodies.rectangle(495 + x, 475 + y, 10, 50, {
        isStatic: false,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    catapultBoard = Bodies.rectangle(350 + x, 510 + y, 300, 25, {
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

    constraint1 = Constraint.create({
        bodyA: catapultBoard,
        pointB: Vector.clone(catapultBoard.position),
        length: 0,
        stiffness: 1,
    });
    World.add(engine.world, [secondBall, trianglePedestal, catapultBoard, constraint1, holdCatapult, firstBall]);
}

function changeSize(scaleX, scaleY) {
    Body.scale(secondBall, scaleX, scaleY);
    Body.scale(trianglePedestal, scaleX, scaleY);
    Body.scale(catapultBoard, scaleX, scaleY);
    Body.scale(holdCatapult, scaleX, scaleY);
    Body.scale(firstBall, scaleX, scaleY);
}

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