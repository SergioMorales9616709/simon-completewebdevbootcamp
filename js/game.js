


$(function(){
    
    const buttonColours = ["red", "blue", "green", "yellow"];
    let gamePattern =[];
    let sonidos = [];
    let userClickedPattern = [];
    let clicks = 0;
    let randomNumber  = 0;
    let randomChosenColour  = "";
    let userChosenColour, userChosenIndex;
    let level = 0;
    let playing = false;
    ///////////////////////////////////////////////////////////////
    let getRandomNumber = (min, max) => {
        let [minval, maxval] = [parseInt(min), parseInt(max)];
        return Math.floor(Math.random() * (maxval - minval + 1))  + minval;
    };
    let displayRandom = () => {
        for(let i = 0; i<1000; i++){
            console.log(getRandomNumber(0,3));
        }
    };
    let flashBox = (color) => {
        $("#" + color).fadeOut(100).fadeIn(100);
    };
    let soundBox = (index) => {
        sonidos[index].play();
    };
    let pulsar = (color) => {
        let boton = $("#"+color)
        boton.toggleClass("pressed");
        setTimeout(() => {
            boton.toggleClass("pressed");
        }, 300);
    };
    let animateBox = (index) => {
        flashBox(buttonColours[index]);
        soundBox(index);
    };
    let cargarSonidos = () => {
        sonidos = [...buttonColours].map((val)=>{
            return new Audio("../sounds/" + val + ".mp3");
        });
        sonidos.push(new Audio("../sounds/wrong.mp3"))
    };
    let gameOver = () => {
        sonidos[sonidos.length - 1].play();
        playing = false;
        level = 0;
        showLevel(level);
        $("body").toggleClass("game-over");
        setTimeout(() => {
            $("body").toggleClass("game-over");
        }, 200);
    };
    let nextMove = () => {
        let mllisecons = level == 0 ? 300: 1000;
        level++;
        clicks=-1;
        setTimeout(() => {
            showLevel(level);
            userClickedPattern = [];
            randomNumber  = getRandomNumber(0,3);
            randomChosenColour  = buttonColours[randomNumber];
            gamePattern.push(randomChosenColour);
            animateBox(randomNumber);
        }, mllisecons);
    
    };
    let validaMovimiento = () => {
        if(playing && gamePattern[clicks] === userClickedPattern[clicks] ){
            if(gamePattern.length == userClickedPattern.length){
                nextMove();
            }
        }else{
            gameOver();
        }
    };
    
    let asignaAccionesBotones = () => {
        $('div[type=button]').on("click", (event)=>{
            userChosenIndex = buttonColours.indexOf(event.target.id);
            userChosenColour = event.target.id;
            userClickedPattern.push(userChosenColour);
            animateBox(userChosenIndex);
            pulsar(userChosenColour);
            clicks++;
            validaMovimiento();
        });
        
        $(document).keypress(() => {
            if(!playing){
                startGame();
                nextMove();
            }
        });
    };
    let showLevel = (lvl) => {
        if(lvl > 0 ){
            $("#level-title").text("Level "+level);
        }else{
            $("#level-title").text("Game Over, Press any Key to Restart");
        }
    };
    
    let startGame = () => {
        playing = true;
        gamePattern = [];
        userClickedPattern = [];    
    };
    
    let init = () => {
        cargarSonidos();
        asignaAccionesBotones();
    };
    init();
});