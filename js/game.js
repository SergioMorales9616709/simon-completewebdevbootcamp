const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern =[];
let sonidos = [];
let userClickedPattern = [];
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
}
let asignaAccionesBotones = () => {
    $('div[type=button]').on("click", (event)=>{
        userChosenIndex = buttonColours.indexOf(event.target.id);
        userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        animateBox(userChosenIndex);
        pulsar(userChosenColour);    
    });
};
let init = () => {
    cargarSonidos();
    gamePattern.push(randomChosenColour);
    animateBox(randomNumber);
    asignaAccionesBotones();
};

let randomNumber  = getRandomNumber(0,3);
let randomChosenColour  = buttonColours[randomNumber];
let userChosenColour, userChosenIndex;

$(function(){
    init();
});