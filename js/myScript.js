

/* recuperation du canvas */
var canvas = document.getElementById("zoneDessin");
var ctx = canvas.getContext("2d");
/*
ctx.beginPath();
ctx.rect(0, 0, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();    
*/


let balle = new Balle(6,6,3,1,0.75,5);
/* Fonction draw, fonction qui dessinera chaque frame du jeu */
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balle.draw(ctx,canvas)


}



/* frequence du rafraichissement de la fonction*/
setInterval(draw, 10);
draw();