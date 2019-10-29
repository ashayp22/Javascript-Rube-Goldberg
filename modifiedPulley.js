
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

var tommyHelp = 0.2;

changeLocation(0, 0);
changeSize(tommyHelp,  tommyHelp);

var pulleyCircle,
    rubesBalls,
    pulleyBar1,
    rampDown_part1,
    secondBall,
    rampDown_part2;

function changeLocation(x , y){
    pulleyCircle = Bodies.circle((tommyHelp * 300) + x, (tommyHelp * 300) + y, 60, {
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

    rubesBalls = Bodies.circle((tommyHelp * 190) + x, (tommyHelp * 200) + y, 20, {
        isStatic: false,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    pulleyBar1 = Bodies.rectangle((tommyHelp * 300) + x, (tommyHelp * 300) + y, 300, 10, {
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

    rampDown_part1 = Bodies.rectangle((tommyHelp * 450) + x, (tommyHelp * 250) + y, 10, 10, {
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

    secondBall = Bodies.circle((tommyHelp * 447) + x, (tommyHelp * 200) + y, 20, {
        isStatic: false,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    rampDown_part2 = Bodies.rectangle((tommyHelp * 490) + x, (tommyHelp * 285) + y, 100, 10, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    Body.rotate(rampDown_part2, 0.785398);

    constraint = Constraint.create({
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

    World.add(engine.world, [pulleyCircle, constraint, rubesBalls, pulleyBar1, consBarPulley, rampDown_part1, secondBall, rampDown_part2]);
}

function changeSize(scaleX, scaleY) {
    Body.scale(pulleyCircle, scaleX, scaleY);
    Body.scale(pulleyBar1, scaleX, scaleY);
    Body.scale(rubesBalls, scaleX, scaleY);
    Body.scale(rampDown_part1, scaleX, scaleY);
    Body.scale(secondBall, scaleX, scaleY);
    Body.scale(rampDown_part2, scaleX, scaleY);


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
