//Setup Matter JS
var engine;
var world;

var ball; //starting ball

var floor; //starting platform

var mouseConstraint; //mouses

var mouseDown; //if the mouse is held down

var draggingParts; //if you are dragging static bodies

var render; //actual render

// keep track of current bounds scale (view zoom)
var boundsScaleTarget,
    boundsScale;


var alreadyDown;

var done1;
var counter1;

var done2;
var counter2;

var done3;
var counter3;

var done4;
var counter4;

var lastmouse;


//nick -------------------------------------------------------------------------------------------------------------------------

var group = Matter.Body.nextGroup(true);

var nickP_pulleyArray = [];

var tommyHelp = 5;

var pulleyCircle,
    pulleyBar1,
    rampDown_part1,
    secondBall,
    rampDown_part2,
    popikconstraint,
    ramp3;


function changeLocation(x , y){
    pulleyCircle = Matter.Bodies.circle((tommyHelp * 300) + x, (tommyHelp * 300) + y, 60, {
        collisionFilter: {
            group: group
        },
        isStatic: true,
        render: {
            fillStyle: "#ff1609",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    pulleyBar1 = Matter.Bodies.rectangle((tommyHelp * 300) + x, (tommyHelp * 300) + y, 300, 10, {
        frictionAir: 0.0001,
        density: 0.01,
        collisionFilter: {
            group: group
        },
        isStatic: false,
        render: {
            fillStyle: "#222bbd",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    rampDown_part1 = Matter.Bodies.rectangle((tommyHelp * 450) + x, (tommyHelp * 250) + y, 15, 15, {
        isStatic: true,
        collisionFilter: {
            group: group
        },
        render: {
            fillStyle: "#222bbd",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    secondBall = Matter.Bodies.circle((tommyHelp * 448) + x, (tommyHelp * 200) + y, 18, {
        isStatic: false,
        render: {
            fillStyle: "#ff1609",
            strokeStyle: 'white',
            lineWidth: 2
        },
        density: 0.4
    });

    rampDown_part2 = Matter.Bodies.rectangle((tommyHelp * 500) + x, (tommyHelp * 285) + y, 100, 10, {
        isStatic: true,
        render: {
            fillStyle: "#222bbd",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    ramp3 = Matter.Bodies.rectangle((tommyHelp * 565) + x, (tommyHelp * 325) + y, 60, 10, {
        isStatic: true,
        render: {
            fillStyle: "#222bbd",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });


    Matter.Body.rotate(rampDown_part2, 0.785398);

    popikconstraint = Matter.Constraint.create({
        bodyA: pulleyCircle,
        pointB: Matter.Vector.clone(pulleyCircle.position),
        length: 0,
        stiffness: 1,
    });

    var consBarPulley = Matter.Constraint.create({
        bodyA: pulleyCircle,
        bodyB: pulleyBar1,
        length: 0,
        stiffness: 1,
    });

    Matter.World.add(world, [pulleyCircle, popikconstraint, pulleyBar1, consBarPulley, rampDown_part1, secondBall, rampDown_part2, ramp3]);
    nickP_pulleyArray.push(pulleyCircle, pulleyBar1, rampDown_part1, rampDown_part2, secondBall, ramp3);
}


function changeSize(scaleX, scaleY) {
    Matter.Body.scale(pulleyCircle, scaleX, scaleY);
    Matter.Body.scale(pulleyBar1, scaleX, scaleY);
    Matter.Body.scale(rampDown_part1, scaleX, scaleY);
    Matter.Body.scale(secondBall, scaleX, scaleY);
    Matter.Body.scale(rampDown_part2, scaleX, scaleY);

}


//and nicks part 2

var thirdball, trianglePedestal, catapultBoard, constraint1, holdCatapult, holdingBorder;

var nickP_catapultArray = [];

var NicktommyHelp = 2; //change this to scale

function changeLocation2(x, y){

    thirdball = Matter.Bodies.circle((NicktommyHelp * 450) + x, (NicktommyHelp * 460) + y, 17, {
        isStatic: false,
        density: 0.005,
        frictionAir: 0.001,
        restitution: 0,
        render: {
            fillStyle: "#ff1609",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    trianglePedestal = Matter.Bodies.polygon((NicktommyHelp * 350) + x, (NicktommyHelp * 550) + y, 3, 40, {
        isStatic: true,
        collisionFilter: {
            group: group
        },
        render: {
            fillStyle: "#222bbd",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });
    Matter.Body.rotate(trianglePedestal, Math.PI/2);

    holdCatapult = Matter.Bodies.rectangle((NicktommyHelp * 450) + x, (NicktommyHelp * 543) + y, 40, 40, {
        isStatic: true,
        render: {
            fillStyle: "#222bbd",
            strokeStyle: 'white',
            lineWidth: 2
        }
    } );

    holdingBorder = Matter.Bodies.rectangle((NicktommyHelp * 495) + x, (NicktommyHelp * 475) + y, 10, 50, {
        isStatic: false,
        render: {
            fillStyle: "#222bbd",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    catapultBoard = Matter.Bodies.rectangle((NicktommyHelp * 350) + x, (NicktommyHelp * 510) + y, 300, 25, {
        isStatic: false,
        collisionFilter: {
            group: group
        },
        render: {
            fillStyle: "#222bbd",
            strokeStyle: 'white',
            lineWidth: 2
        }
    });

    constraint1 = Matter.Constraint.create({
        bodyA: catapultBoard,
        pointB: Matter.Vector.clone(catapultBoard.position),
        length: 0,
        stiffness: 1,
    });
    Matter.World.add(engine.world, [thirdball, trianglePedestal, catapultBoard, constraint1, holdCatapult]);
    nickP_catapultArray.push(thirdball, trianglePedestal, catapultBoard, holdCatapult);
}

function changeSize2(scaleX, scaleY) {
    Matter.Body.scale(thirdball, scaleX, scaleY);
    Matter.Body.scale(trianglePedestal, scaleX, scaleY);
    Matter.Body.scale(catapultBoard, scaleX, scaleY);
    Matter.Body.scale(holdCatapult, scaleX, scaleY);
}

//joe -------------------------------------------------------------------------------------------------------------------------

var joeBodies = [];

function translate(x, y, z) {


    // var circle = Matter.Bodies.circle((0+x)*z, (50+y)*z, 22*z); // initial ball
    var boxVert = Matter.Bodies.rectangle((280+x)*z, (350+y)*z, 50*z, 10*z,{ isStatic: true, render: { fillStyle: "#222bbd"}});                            //platform holding ball

    var ground = Matter.Bodies.rectangle((-290+x)*z, (810+y)*z, 1000*z, 60*z, {  isStatic: true , render: { fillStyle: "#222bbd"}});                           // floor
    var circle2 = Matter.Bodies.circle((260+x)*z, (345+y)*z, 25*z, {render: {fillStyle: "#ff1609",}});                                                     // 2nd ball
    var ground2 = Matter.Bodies.rectangle((310+x)*z, (810+y)*z, 100*z, 60*z, { isStatic: true , render: { fillStyle: "#222bbd"}});
    var ground3 = Matter.Bodies.rectangle((245+x)*z, (835+y)*z, 60*z, 5*z, { isStatic: true , render: { fillStyle: "#222bbd"}}); //bottom right platform

    var domino1  = Matter.Bodies.rectangle((205+x)*z, (725+y)*z, 10*z, 100*z, {render: { fillStyle: "#afb0ff"}});                                            //first domino
    var domino2  = Matter.Bodies.rectangle((130+x)*z, (700+y)*z, 12.5*z, 150*z, {render: { fillStyle: "#8588ff"}});                                            //second domino
    var domino3  = Matter.Bodies.rectangle((50+x)*z, (720+y)*z, 15*z, 200*z, {render: { fillStyle: "#6c74ff"}});
    var domino4  = Matter.Bodies.rectangle((-50+x)*z, (725+y)*z, 17.5*z, 250*z, {render: { fillStyle: "#5352ff"}});                                            //first domino
    var domino5  = Matter.Bodies.rectangle((-200+x)*z, (700+y)*z, 20*z, 300*z, {render: { fillStyle: "#4646ff"}});                                            //second domino
    var domino6  = Matter.Bodies.rectangle((-450+x)*z, (720+y)*z, 22.5*z, 350*z, {render: { fillStyle: "#2e2dff"}});    //third domino
    var domino7  = Matter.Bodies.rectangle((-650+x)*z, (720+y)*z, 25*z, 400*z, {render: { fillStyle: "#140bb8"}});    //third domino

    var wall1 = Matter.Bodies.rectangle((207.5+x)*z, (225+y)*z, 7.5*z, 700*z, { isStatic: true , render: { fillStyle: "#222bbd"}});
    var wall2 = Matter.Bodies.rectangle((260+x)*z, (475+y)*z, 7.5*z, 225*z, { isStatic: true , render: { fillStyle: "#222bbd"}});


    var ramp1 = Matter.Bodies.rectangle((535+x)*z, (600+y)*z, 500*z, 10*z, { isStatic: true, angle: Math.PI * 0.8, friction: 0, render: { fillStyle: "#83a6f6"}});   //second ramp
    // var ramp2 = Matter.Bodies.rectangle((100+x)*z, (100+y)*z, 400*z, 10*z, {   isStatic: true, angle: Math.PI * 0.4 });
    var ramp3 = Matter.Bodies.rectangle((340+x)*z, (375+y)*z, 85*z, 10*z, {   isStatic: true, angle: Math.PI * 0.1 , render: { fillStyle: "#83a6f6"}});


    //all the ramps

    var ramp4 = Matter.Bodies.rectangle((255+x)*z, (-780+y)*z, 350*z, 20*z, {   isStatic: true, angle: Math.PI * 0.2 , render: { fillStyle: "#83a6f6"}});
    var ramp5 = Matter.Bodies.rectangle((455+x)*z, (-580+y)*z, 350*z, 20*z, {   isStatic: true, angle: Math.PI * -0.2 , render: { fillStyle: "#83a6f6"}});
    var ramp6 = Matter.Bodies.rectangle((255+x)*z, (-380+y)*z, 350*z, 20*z, {   isStatic: true, angle: Math.PI * 0.2 , render: { fillStyle: "#83a6f6"}});
    var ramp7 = Matter.Bodies.rectangle((455+x)*z, (-180+y)*z, 350*z, 20*z, {   isStatic: true, angle: Math.PI * -0.2 , render: { fillStyle: "#83a6f6"}});


    Matter.World.add(engine.world, [ground,boxVert,domino7,circle2, ground2,domino1,domino2,domino3,domino4,domino5,domino6, ground3, wall1,ramp3, wall2, ramp1, ramp4, ramp5, ramp6, ramp7]);
    joeBodies = [ground,boxVert,circle2,ground2,domino7,domino1,domino2,domino3, domino4,domino5,domino6,ground3, wall1, wall2, ramp1,ramp3, ramp4, ramp5, ramp6, ramp7];
}


//tommy -------------------------------------------------------------------------------------------------------------------------

var Tommy_Constraint_1, Tommy_Constraints_body1, Tommy_Ball_1, Tommy_Ball_2, Tommy_movable_Wall_1;


var TommyF_Array = [];
function translate2(x, y, z) {
    var Tommy_Wall_1 =  Matter.Bodies.rectangle((700+x)*z, (625+y)*z, 400*z, 20*z , {  friction:0, isStatic: true, angle: -.3, render: { fillStyle: "#222bbd"} });
    var Tommy_Wall_2 =  Matter.Bodies.rectangle((505+x)*z, (-155+y)*z, 200*z, 20*z , {  friction:0, isStatic: true, angle: -.6, render: { fillStyle: "#222bbd"} }); //1
    var Tommy_Wall_3 =  Matter.Bodies.rectangle((305+x)*z, (-80+y)*z, 190*z, 20*z , {  friction:0, isStatic: true, angle: -.2, render: { fillStyle: "#222bbd"} }); //2
    var Tommy_Wall_4 =  Matter.Bodies.rectangle((240+x)*z, (150+y)*z, 200*z, 20*z , {  friction:0, isStatic: true, angle: -.2, render: { fillStyle: "#222bbd"} });
    var Tommy_Wall_5 =  Matter.Bodies.rectangle((390+x)*z, (700+y)*z, 200*z, 20*z , {  friction:0, isStatic: true, angle: 0, render: { fillStyle: "#222bbd"} });
    var Tommy_Wall_6 =  Matter.Bodies.rectangle((420+x)*z, (400+y)*z, 20*z, 500*z , {  friction:0, isStatic: true, angle: 0, render: { fillStyle: "#222bbd"} });
    var Tommy_Wall_7 =  Matter.Bodies.rectangle((380+x)*z, (400+y)*z, 20*z, 500*z , { friction:0,  isStatic: true, angle: 0, render: { fillStyle: "#222bbd"} });
    var Tommy_Wall_8 =  Matter.Bodies.rectangle((270+x)*z, (700+y)*z, 20*z, 100*z , { friction:0,  isStatic: true, angle: 0, render: { fillStyle: "#222bbd"} });
    var Tommy_Wall_9 =  Matter.Bodies.rectangle((230+x)*z, (3+y)*z, 50*z, 20*z , {  friction:0, isStatic: true, angle: 0, render: { fillStyle: "#222bbd"} });

    Tommy_movable_Wall_1 =  Matter.Bodies.rectangle((400+x)*z, (675+y)*z, 20*z, 38*z , {mass: 0.01, friction:0,  isStatic: true, angle: 0 , render: { fillStyle: "#f31308"}});
    var Tommy_movable_Wall_2 =  Matter.Bodies.rectangle((400+x)*z, (250+y)*z, 20*z, 800*z , {mass: 0.01,  friction:0, isStatic: false, angle: 0, render: { fillStyle: "#819bf0"} });


    Tommy_Ball_1 =  Matter.Bodies.circle((450+x)*z, (-170+y)*z, 15*z, { isStatic: false, friction: 0, density: 1 , render: {fillStyle: "#ff1609",}}); //3
    Tommy_Ball_2 =  Matter.Bodies.circle((230+x)*z, (-5+y)*z, 22*z, { friction: 0, density: .5 , render: {fillStyle: "#ff1609",} });

    var Tommy_Ball_3 =  Matter.Bodies.circle((925+x)*z, (510+y)*z, 20*z, {friction: 0  , render: {fillStyle: "#ff1609",}});
    var platform = Matter.Bodies.rectangle((925+x)*z, (560+y)*z, 50*z, 20*z , {  friction:0, isStatic: true, angle: 0 , render: {fillStyle: "#6078ff",}});

    //5,6
    Tommy_Constraints_body1 =  Matter.Bodies.rectangle((200+x)*z, (-55+y)*z, 20*z, 100*z , {  friction:0, restitution: 0.1, isStatic: false, angle: 0 , render: { fillStyle: "#afb0ff"}});

    Tommy_Constraint_1 = Matter.Constraint.create({
        bodyA: Tommy_Constraints_body1,
        pointB:  Matter.Vector.clone(Tommy_Constraints_body1.position),
        length: 0,
        stiffness: 0
    });

    Matter.World.add(engine.world, [platform, Tommy_Wall_1, Tommy_Wall_2, Tommy_Wall_3, Tommy_Wall_4, Tommy_Wall_5, Tommy_Wall_6, Tommy_Wall_7, Tommy_Wall_8, Tommy_Wall_9,
        Tommy_movable_Wall_1, Tommy_movable_Wall_2, Tommy_Ball_1, Tommy_Ball_2, Tommy_Ball_3, Tommy_Constraints_body1
        , Tommy_Constraint_1]);

    TommyF_Array. push(platform, Tommy_Ball_3, Tommy_Wall_1, Tommy_Wall_2, Tommy_Wall_3, Tommy_Wall_4, Tommy_Wall_5, Tommy_Wall_6, Tommy_Wall_7, Tommy_Wall_8, Tommy_Wall_9,
        Tommy_movable_Wall_1, Tommy_movable_Wall_2, Tommy_Ball_1, Tommy_Ball_2,  Tommy_Constraints_body1);


}


//sanji -------------------------------------------------------------------------------------------------------------------------



var saanjiBodies, cradle, cloth, basketball;


function transScaleBodies(x,y) {


    var rampFlat = Matter.Bodies.rectangle(-250 + x, 290 + y, 100, 20, {isStatic: true, render: {fillStyle: "#60a6ff",}});
    Matter.World.add(world, rampFlat);
    cradle = Matter.Composites.newtonsCradle(-60 + x, -290 + y, 8, 60, 500);
    Matter.World.add(world, cradle);

    for(var i = 0; i < cradle.bodies.length; i++) {
        cradle.bodies[i].render.fillStyle="#f" + i + "1919";
    }


    var groupId = Matter.Body.nextGroup(true),
        particleOptions = { friction: 0.00001, groupId: groupId, render: { visible: false }};

    cloth = Matter.Composites.softBody(-650+x, 850+y, 10, 10, 30, 30, false, 8, particleOptions);

    for (var i = 0; i < 10; i++) {
        if (i === 0 || i  === 9)  {
            cloth.bodies[i].isStatic = true;
        }
    }

    Matter.World.add(world, cloth);

    basketball = Matter.Bodies.circle((-250+x), (200+y), 70, {render: {fillStyle: "#fea20b"}});
    Matter.World.add(world, basketball);

    var backboard = Matter.Bodies.rectangle(-690+x, 625+y, 60, 500, { isStatic: true, render: { fillStyle: '#000000'} });
    Matter.World.add(world, backboard);

    var rim = Matter.Bodies.rectangle(-450+x, 850+y, 425, 50, { isStatic: true, render: { fillStyle: '#000000'}, collisionFilter: {
            mask: null
        } });
    Matter.World.add(world, rim);


    saanjiBodies = [ basketball, cloth, cradle, backboard, rampFlat, rim];
}






//continue --------------------------------------------------------------------------------------------------------


function start(interactive) {

    //set variables

    mouseDown = false;
    draggingParts = true;

    boundsScaleTarget = 1,
        boundsScale = {
            x: 1,
            y: 1
        };


    alreadyDown = false;

    done1 = false;
    counter1 = 0;

    done2 = false;
    counter2 = 0;

    done3 = false;
    counter3 = 0;

    done4 = false;
    counter4 = 0;

    lastmouse = {
        x: 0,
        y: 0
    }

    //create engine

    engine = Matter.Engine.create({});

    world = engine.world;

    var canvas = document.getElementById('world'); //Fetch our canvas


    //create mouse

    render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: screen.width,
            height: 800,
            hasBounds: true,
            background: '#f4f3ff',
            wireframes: false, //shows the actual wireframes on the objects
            showAngleIndicator: false
        }
    });


    ball = Matter.Bodies.circle(-1200, -1400, 50, { //x, y, radius
        density: 0.04, //density (m / v)
        friction: 0.01, //friction
        frictionAir: 0.00001, //friction due to air
        restitution: 0.8, //elasticity - the higher it is, the more the ball will bounce
        render: {
            fillStyle: '#f35e66',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });


    Matter.World.add(world, ball);

    stopBall();

    floor = new Platform(-1200, -1300, 600, 30, 0.2, true);

    mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
        element: canvas,
        constraint: {
            render: {
                visible: false
            },
            stiffness: 0.8
        }
    });

    Matter.World.add(world, mouseConstraint);

    //add in everyone elses parts ------------------------------------------------------------------------------------


    if(interactive) {
        changeLocation(1500, -2600);
        changeSize(tommyHelp, tommyHelp);


        changeLocation2(2500, -1300);
        changeSize2(NicktommyHelp, NicktommyHelp);


        translate(2000, 1200, 1.5); // x value translates x, y value translates y and z value scales all bodies by that value


        translate2(100, 0, 3); // x value translates x, y value translates y and z value scales all bodies by that value


        transScaleBodies(-4000, 850);
    } else {

        changeLocation(-1500, -2600);
        changeSize(tommyHelp, tommyHelp);


        changeLocation2(1100, -1500);
        changeSize2(NicktommyHelp, NicktommyHelp);


        translate(500, 800, 1.5); // x value translates x, y value translates y and z value scales all bodies by that value


        translate2(-1190, 200, 3); // x value translates x, y value translates y and z value scales all bodies by that value


        transScaleBodies(-4000, 850);
    }


    // for(i = 0; i < nickP_pulleyArray.length; i++) {
    //     nickP_pulleyArray[i].isStatic = true;
    // }

    //-----------------------------------------------------------------------------------------------------------------
    //Start the engine
    Matter.Engine.run(engine); //physics
    Matter.Render.run(render); //graphics


    boundsScale.x = 6.59014;
    boundsScale.y = 6.59014;
    boundsScaleTarget = 6.599999999;

    render.bounds.max.x = 4659.5933;
    render.bounds.max.y = 3286.48197;

    render.bounds.min.x = -5472.8639;
    render.bounds.min.y = -1985.63121;


    Matter.Mouse.setScale(mouseConstraint.mouse, boundsScale);
    Matter.Mouse.setOffset(mouseConstraint.mouse, render.bounds.min);

    // use the engine tick event to control our view
    Matter.Events.on(engine, 'beforeTick', function() {
        var world = engine.world,
            mouse = mouseConstraint.mouse,
            translate;

        // mouse wheel controls zoom
        var scaleFactor = mouse.wheelDelta * -0.1;
        if (scaleFactor !== 0) {
            if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 6.4)) {
                boundsScaleTarget += scaleFactor;
            }
        }

        // if scale has changed
        if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
            // smoothly tween scale factor
            scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
            boundsScale.x += scaleFactor;
            boundsScale.y += scaleFactor;

            // scale the render bounds
            render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
            render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

            // translate so zoom is from centre of view
            translate = {
                x: render.options.width * scaleFactor * -0.5,
                y: render.options.height * scaleFactor * -0.5
            };

            Matter.Bounds.translate(render.bounds, translate);

            // update mouse
            Matter.Mouse.setScale(mouse, boundsScale);
            Matter.Mouse.setOffset(mouse, render.bounds.min);
        }

        // console.log("---");
        // console.log(boundsScale);
        // console.log(boundsScaleTarget);
        // console.log(render.bounds.max);
        // console.log(render.bounds.min);

        //now, we check collisions
        if(!done1) {
            if(Matter.SAT.collides(secondBall, catapultBoard).collided) {
                counter1++;
                if(counter1 == 6) {
                    Matter.World.remove(world, secondBall);

                    nickP_pulleyArray = nickP_pulleyArray.splice(nickP_pulleyArray.indexOf(secondBall), 1);
                    done1 = true;
                }

            }
        }


        if(!done2) {
            if(Matter.SAT.collides(ball, pulleyBar1).collided) {
                counter2++;
                if(counter2 == 1) {
                    Matter.World.remove(world, ball);
                    done2 = true;
                }

            }
        }

        if(!done3) {
            if(Matter.SAT.collides(Tommy_Ball_1, Tommy_Constraints_body1).collided) {
                counter3++;
            } else if(counter3 > 12) {
                Matter.World.remove(world, Tommy_Ball_1);
                TommyF_Array = TommyF_Array.splice(TommyF_Array.indexOf(Tommy_Ball_1), 1);
                done3 = true;
            }
        }

        if(!done4) {
            if(Matter.SAT.collides(cloth.bodies[5], basketball).collided) {
                counter4++;
                if(counter4 == 30) {
                    document.getElementById("myModal").style.display = "block";
                    done4 = true;
                }
            }
        }


    });


}

function Platform(x, y, w, h, a, static) {
    var options = {
        friction: 0,
        restitution: 0.95,
        angle: a,
        isStatic: static,
        render: { fillStyle: "#222bbd"}
    }
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    Matter.World.add(world, this.body);

}


function moveStatic() { //moves static bodies

    if(nickP_pulleyArray.indexOf(mouseConstraint.body) >= 0) {
        for(i = 0; i < nickP_pulleyArray.length; i++) {
            // Matter.Body.translate(nickP_pulleyArray[i], {x: mouseConstraint.mouse.position.x - nickP_pulleyArray[i].position.x, y: mouseConstraint.mouse.position.y - nickP_pulleyArray[i].position.y});
            Matter.Body.translate(nickP_pulleyArray[i], {x: mouseConstraint.mouse.position.x - lastmouse.x, y: mouseConstraint.mouse.position.y - lastmouse.y});

            Matter.Body.setVelocity(nickP_pulleyArray[i], {x: 0, y: 0});
        }

        popikconstraint.pointB = Matter.Vector.clone(pulleyCircle.position);

        lastmouse.x = mouseConstraint.mouse.position.x;
        lastmouse.y = mouseConstraint.mouse.position.y;

    } else if(nickP_catapultArray.indexOf(mouseConstraint.body) >= 0) {
        for(i = 0; i < nickP_catapultArray.length; i++) {
            Matter.Body.translate(nickP_catapultArray[i], {x: mouseConstraint.mouse.position.x - lastmouse.x, y: mouseConstraint.mouse.position.y - lastmouse.y});
            Matter.Body.setVelocity(nickP_catapultArray[i], {x: 0, y: 0});
        }

        constraint1.pointB = Matter.Vector.clone(catapultBoard.position);

        lastmouse.x = mouseConstraint.mouse.position.x;
        lastmouse.y = mouseConstraint.mouse.position.y;

    } else if(joeBodies.indexOf(mouseConstraint.body) >= 0) {
        for(i = 0; i < joeBodies.length; i++) {
            Matter.Body.translate(joeBodies[i], {x: mouseConstraint.mouse.position.x - lastmouse.x, y: mouseConstraint.mouse.position.y - lastmouse.y});
            Matter.Body.setVelocity(joeBodies[i], {x: 0, y: 0});
        }

        lastmouse.x = mouseConstraint.mouse.position.x;
        lastmouse.y = mouseConstraint.mouse.position.y;

    } else if(TommyF_Array.indexOf(mouseConstraint.body) >= 0) {

        for(i = 0; i < TommyF_Array.length; i++) {
            Matter.Body.translate(TommyF_Array[i], {x: mouseConstraint.mouse.position.x - lastmouse.x, y: mouseConstraint.mouse.position.y - lastmouse.y});
            Matter.Body.setVelocity(TommyF_Array[i], {x: 0, y: 0});
        }

        Tommy_Constraint_1.pointB = Matter.Vector.clone(Tommy_Constraints_body1.position);

        lastmouse.x = mouseConstraint.mouse.position.x;
        lastmouse.y = mouseConstraint.mouse.position.y;

    } else if(saanjiBodies.indexOf(mouseConstraint.body) >= 0) {

        // for(i = 0; i < saanjiBodies.length; i++) {
        //     Matter.Body.translate(saanjiBodies[i], {x: mouseConstraint.mouse.position.x - lastmouse.x, y: mouseConstraint.mouse.position.y - lastmouse.y});
        //     Matter.Body.setVelocity(saanjiBodies[i], {x: 0, y: 0});
        // }
        //
        // Matter.Composite.translate(cloth, Matter.Vector.create(mouseConstraint.mouse.position.x - lastmouse.x, mouseConstraint.mouse.position.y - lastmouse.y));
        //
        // Matter.Composite.translate(cradle, Matter.Vector.create(mouseConstraint.mouse.position.x - lastmouse.x, mouseConstraint.mouse.position.y - lastmouse.y));
        //
        // for(i = 0; i < 5; i++) {
        //     cradle.constraints[i].pointA = Matter.Vector.add(Matter.Vector.clone(cradle.bodies[i].position), Matter.Vector.create(0, -300));
        // }
        //
        // lastmouse.x = mouseConstraint.mouse.position.x;
        // lastmouse.y = mouseConstraint.mouse.position.y;

    } else if(mouseConstraint.body != null) { //ball or ramp
        // Matter.Body.translate(mouseConstraint.body, {x: mouseConstraint.mouse.position.x - mouseConstraint.body.position.x, y: mouseConstraint.mouse.position.y - mouseConstraint.body.position.y});
        // Matter.Body.setVelocity( mouseConstraint.body, {x: 0, y: 0});
    }

    console.log(mouseConstraint.body);

}

function clicked() {
    if(!draggingParts ) {
        // moveBall();
    }
}

// function moveBall() { //moves ball to mouse position
//     Matter.Body.translate(ball, {x: mouseConstraint.mouse.mousedownPosition.x - ball.position.x, y: mouseConstraint.mouse.mousedownPosition.y - ball.position.y});
//     Matter.Body.setVelocity( ball, {x: 0, y: 0});
// }


$(document).ready(function() {

    $("canvas").mousemove(function() {
        if(mouseDown && draggingParts) {
            moveStatic();
        }
    })
    $("canvas").mousedown(function() {
        mouseDown = true;

        if(!alreadyDown) { //code below only executed on the first instance the mouse is down
            if(draggingParts) {
                lastmouse.x = mouseConstraint.mouse.position.x;
                lastmouse.y = mouseConstraint.mouse.position.y;
            }
            alreadyDown = true;
        }

    })
    $("canvas").mouseup(function() {
        mouseDown = false;
        alreadyDown = false;
    })
    $("canvas").bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
            //zoom in
        }
        else{
            //zoom out
        }
    });

});

$(document).keydown(function(e){
    if (e.keyCode == 87){ //W Up
        render.bounds.min.y -= boundsScale.y * 50;
        render.bounds.max.y -= boundsScale.y * 50;
    }
    if (e.keyCode == 68){ //D Right
        render.bounds.min.x += boundsScale.x * 50;
        render.bounds.max.x += boundsScale.x * 50;
    }
    if (e.keyCode == 83){ //S Down
        render.bounds.min.y += boundsScale.y * 50;
        render.bounds.max.y += boundsScale.y * 50;
    }
    if (e.keyCode == 65){ //A Left
        render.bounds.min.x -= boundsScale.x * 50;
        render.bounds.max.x -= boundsScale.x * 50;
    }
});

function setParts() {
    document.getElementById("info").innerHTML = "You can move the parts";
    draggingParts = true;
}


function stopBall() {
    ball.isStatic = true;
}

function releaseBall() {
    ball.isStatic = false;
    Matter.Body.setVelocity( ball, {x: 0, y: 0});
    document.getElementById("info").innerHTML = "And we're off!";
    Tommy_movable_Wall_1.isStatic = false;
}


//load

function loadCompleted() {
    //hide current
    document.getElementById("start1").style.visibility = "hidden";
    document.getElementById("start1").style.display = "none";

    document.getElementById("start2").style.visibility = "hidden";
    document.getElementById("start2").style.display = "none";
    //show rest
    document.getElementById("goldberg").style.visibility = "visible";
    document.getElementById("goldberg").style.display = "inline-block";

    start(false);

    draggingParts = false;
    document.getElementById("info").innerHTML = "WASD for moving the view, scroll in/out for zoom";

    document.getElementById("hint").style.visibility = "hidden";
    document.getElementById("hint").style.display = "none";
    interactive = false;

}

var interactive;

function loadInteractive() {
    //hide current
    document.getElementById("start1").style.visibility = "hidden";
    document.getElementById("start1").style.display = "none";

    document.getElementById("start2").style.visibility = "hidden";
    document.getElementById("start2").style.display = "none";


    //show rest

    document.getElementById("goldberg").style.visibility = "visible";
    document.getElementById("goldberg").style.display = "inline-block";

    document.getElementById("info").innerHTML = "WASD for moving the view, scroll in/out for zoom<br>drag the parts on the right into their correct spot<br>start - ball rolling down the ramp<br>end - cradle + basketball shot";

    interactive = true;

    start(true);

}

function showHint() {
    document.getElementById("hintText").innerHTML = "order - see saw, catapult, ramps, dominos, up/rotating elevator"
}

function reset() {

    engine.events = {};

    Matter.Render.stop(render); // this only stop renderer but not destroy canvas
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);


    start(interactive);
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal").style.visibility = "hidden";
    reset();
}

