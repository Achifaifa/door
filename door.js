var c=document.getElementById("door");
c.style.background="#000000";
var ctx=c.getContext("2d");
ctx.canvas.width=800;
ctx.canvas.height=600;
ctx.fillStyle="white"
ctx.font="15px sans-serif";

var statusd={"light":0, "keys":1, "lid":0, "lock_open":0};
var last_click="none";
var current_frame="door";
var processed=0

function menu(){

  ctx.clearRect(0,0,800,600);
  ctx.drawImage(door_001,0,30);
  c.addEventListener("mousedown",lope,false)

}

function lope(ev){

  processed=0;
  updateMousePosition(ev);
  switch(current_frame){
    case "door":
    //265,170 - 325,260: Panel
    //450,230 - 460,240: Eyehole
    //525,330 - 540,360: Keys
    //535,345 - 545,360: Lock
    //580,320 - 605,340: Lights
    if(last_click[0]>265 && last_click[0]<325 && last_click[1]>170 && last_click[1]<260 && processed==0){
      ctx.clearRect(0,0,800,600);
      current_frame="panel";
      var imagename=current_frame+"_"+statusd.light+statusd.lid;
      console.log("Clicked on panel, loading "+imagename);
      ctx.drawImage(eval(imagename),0,30);
      processed=1;
    }
    if(last_click[0]>450 && last_click[0]<460 && last_click[1]>230 && last_click[1]<240 && processed==0){
      ctx.clearRect(0,0,800,600);
      current_frame="hole";
      var imagename=current_frame+"_"+statusd.light;
      console.log("Clicked on hole, loading "+imagename);
      ctx.drawImage(eval(imagename),0,30);
      writemessage("Creepy...")
      processed=1;
    }
    if(last_click[0]>525 && last_click[0]<540 && last_click[1]>330 && last_click[1]<360 && statusd.keys==1 && processed==0){
      ctx.clearRect(0,0,800,600);
      statusd.keys=0;
      var imagename=current_frame+"_"+statusd.light+statusd.lid+statusd.keys;
      console.log("Clicked on keys, loading "+imagename);
      ctx.drawImage(eval(imagename),0,30);
      writemessage("Got keys");
      processed=1;
    }
    if(last_click[0]>535 && last_click[0]<545 && last_click[1]>345 && last_click[1]<360 && processed==0){
      console.log("Clicked on lock")
      ctx.clearRect(0,0,800,600);
      var imagename=current_frame+"_"+statusd.light+statusd.lid+statusd.keys;
      ctx.drawImage(eval(imagename),0,30);
      if (statusd.keys==0 && statusd.lock_open==1){console.log("It's already open"); writemessage("It's unlocked")}
      if (statusd.keys==0 && statusd.lock_open==0){console.log("Lock opened"); writemessage("Used keys on lock");statusd.lock_open=1;};
      if (statusd.keys==1){console.log("You need the keys"); writemessage("It's locked")};
      processed=1;
    }  
    if(last_click[0]>580 && last_click[0]<605 && last_click[1]>320 && last_click[1]<340 && processed==0){ 
      ctx.clearRect(0,0,800,600);
      if (statusd.light==0){statusd.light=1; writemessage("Lights on!")}
      else {statusd.light=0; writemessage("Lights off")};
      var imagename=current_frame+"_"+statusd.light+statusd.lid+statusd.keys;
      console.log("Clicked on light, loading "+imagename);
      ctx.drawImage(eval(imagename),0,30);
      processed=1;
    }
    else if (current_frame=="door" && processed==0) {
      ctx.clearRect(0,0,800,600);
      var imagename=current_frame+"_"+statusd.light+statusd.lid+statusd.keys;
      console.log("Clicked somewhere, loading "+imagename);
      ctx.drawImage(eval(imagename),0,30);
      processed=1;
    }
    break;

    case "panel":
    //265,115 - 715,493: Open/use
    //145,025 - 680,135: Close
    //000,035 - 225,565: back
    if(last_click[0]>265 && last_click[0]<715 && last_click[1]>115 && last_click[1]<493 && processed==0){
      if (statusd.lid==0){
        ctx.clearRect(0,0,800,600);
        statusd.lid=1;
        var imagename=current_frame+"_"+statusd.light+statusd.lid;
        console.log("Clicked on closed panel, loading "+imagename);
        ctx.drawImage(eval(imagename),0,30);
      }
      else{
        console.log("Clicked on open panel. Don't do that!");
        writemessage("I shouldn't touch that");
      };
      processed=1;
    }
    if(statusd.lid==1 && last_click[0]>145 && last_click[0]<680 && last_click[1]>25 && last_click[1]<135 && processed==0){
      ctx.clearRect(0,0,800,600);
      statusd.lid=0;
      var imagename=current_frame+"_"+statusd.light+statusd.lid;
      console.log("Clicked on open panel, loading "+imagename);
      ctx.drawImage(eval(imagename),0,30);
      processed=1;
    }
    if(last_click[0]>0 && last_click[0]<225 && last_click[1]>35 && last_click[1]<565 && processed==0){
      ctx.clearRect(0,0,800,600);
      current_frame="door";
      var imagename=current_frame+"_"+statusd.light+statusd.lid+statusd.keys;
      console.log("Clicked on exit zone, loading"+imagename);
      ctx.drawImage(eval(imagename),0,30);
      processed=1;
    }
    else if (current_frame=="panel" && processed==0){
      ctx.clearRect(0,0,800,600);
      var imagename=current_frame+"_"+statusd.light+statusd.lid;
      console.log("Clicked on image, loading"+imagename);
      ctx.drawImage(eval(imagename),0,30); 
      processed=1;
    }
    break;

    case "hole":
    //000,030 - 800,560: back
    if(last_click[0]>0 && last_click[0]<800 && last_click[1]>30 && last_click[1]<560 && processed==0){ 
      ctx.clearRect(0,0,800,600);
      current_frame="door";
      var imagename=current_frame+"_"+statusd.light+statusd.lid+statusd.keys;
      console.log("Clicked somewhere, loading "+imagename);
      ctx.drawImage(eval(imagename),0,30);
      processed=1;
    }
    break;
  }
  writeinventory();
}

function updateMousePosition(ev) {

  last_click=[ev.clientX-c.offsetLeft+window.scrollX,ev.clientY+window.scrollY-c.offsetTop];
  console.log("Click on "+current_frame+" frame",last_click[0],last_click[1]);
  
}

function writeinventory(){

  if (statusd.keys==0){ctx.fillText("[Keys]",745,585);}

}

function writemessage(string){

  ctx.fillText(string,20,585)

}

function loader(items, allDone) {

  // Return nothing if the item list is empty
  if (!items) {return;}
  // I don't know what this does
  if ("undefined"===items.length) {items=[items];}
  var count=items.length;
  // Action every time a image loads
  var thingToDoCompleted=function (items, i) {
    count--;
    if (count==0) {allDone();}
    else {
      ctx.clearRect(0,0,800,600);
      ctx.fillText("Loading image "+(items.length-count)+" of "+items.length,300,300);
    }};
  // Actual loading loop?
  for (var i=0; i<items.length; i++) {
    loadImage(items, i, thingToDoCompleted);}}

function loadImage(items, n, onComplete) {

  var onLoad=function (e) {
    e.target.removeEventListener("load", onLoad);
    onComplete(items, n);}

  // Defining variable name
  photoname=items[n].replace("./images/","").replace(".png","");
  // Create object and specify source
  eval(photoname+"=new Image()");
  eval(photoname+".addEventListener('load', onLoad, false)");
  eval(photoname+".src=items[n]");
}

items=[
"./images/door_000.png",
"./images/door_001.png",
"./images/door_010.png",
"./images/door_011.png",
"./images/door_100.png",
"./images/door_101.png",
"./images/door_110.png",
"./images/door_111.png",
"./images/panel_00.png",
"./images/panel_01.png",
"./images/panel_10.png",
"./images/panel_11.png",
"./images/hole_0.png",
"./images/hole_1.png"]

loader(items, menu);
console.log("Images loaded"); 