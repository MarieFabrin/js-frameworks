// main.js
import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";

const k = kaplay({
    width: 600, //canvas width + height
    height: 400,
});

k.setBackground(k.rgb(107, 164, 213));


k.loadBean(); // load doesnt show character
k.setGravity(1250); //gravity - higher value -> "stronger" gravity pull
// i did find that w very low gravity , the player will jump off the screen an essentially never come backa again
// n too high - it barely jumps


k.scene("startover", () => {

    const player = k.add([ // what does the player "have" - gives us our player object
        k.sprite("bean"), //becuse loadBean ? then can call string "bean" sprite ?
        k.pos(k.center()), // position - can also u x / y coordinates
        k.area(), // "hitbox" - can be displayed as a square - for collusion - f1 to see:(
        k.body(), // susepteble to collusio
        k.offscreen(),
    ]);
    // smth about f1 kaplay debug ??? but i have danish keyboard so -doesnt seem to work? unsure - also mentioned it can be rebound - will have to investigate  

    player.onKeyPress("space", () => { // on key press space -> run function
        if (player.isGrounded()) { // boolean - only if true: jump
            player.jump() // jumps - can always jump
        }
    }) // kaplay method / function
    // if you want to create function outside ? then u can store it in const or variable
    // const functionName = () => {}
    // can also write function = () {} i think ? usnure

    k.add([ // [] array of elements and the sprit,pos, area n stuff is from kaplay
        k.rect(k.width(), 50), //size - k.width () - width of screen
        k.pos(0, 350),
        k.area(),
        k.color(107, 213, 123),
        k.body({ isStatic: true }), //not affected by gravity - platform for sprite 
    ]);

    let counter = 0;
    const counterUI = k.add([
        k.text("0"),
        k.color(0, 0, 0),
    ]);


    k.loop(1, () => { // first param - how often -

        counter++; // like java 
        counterUI.text = counter;


        const speed = [200, 300, 400]; // array w diff speeds
        const currentSpeed = speed[Math.floor(Math.random() * speed.length)]; //math.random: 0 or 1 - so * by array lenght to get all possibilities
        // floor -> whole number - eg like int vs float in Java 
        k.add([ // component order doesnt rly matter
            k.rect(50, 50),
            k.pos(550, 300),
            k.area(),
            k.body(),
            k.outline(3),
            k.move(k.vec2(-1, 0), currentSpeed) // determine direction + speed basically 
        ]); // -1, 0 is x / y coordinate direction - like x = x + 1 in Java
    });

    player.onExitScreen(() => { 
        k.go("gameover"); 
    });

});

k.scene("gameover", () => { // like a state in Java
    k.add([
        k.text("Game Over"),
        k.color(0, 0, 0),
        k.pos(k.center()),
    ]);

    k.onKeyPress("r", () => {
        k.go("startover");
    });

});

k.go("startover");