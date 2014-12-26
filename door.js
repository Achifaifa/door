var c=document.getElementById("door");
c.style.background="#000000";
var ctx=c.getContext("2d");
ctx.canvas.width=800;
ctx.canvas.height=600;
ctx.fillStyle="white"
ctx.font="15px sans-serif";

var statusd={"light":0, "keys":1, "lid":0};
var last_click="none";
var current_frame="door";
var processed=0

function menu(){

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
      if (statusd.keys==0){console.log("Lock opened"); writemessage("Used keys on lock")};
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
door_000=new Image();
door_000.src="./images/door_000.png";
door_001=new Image();
door_001.src="./images/door_001.png";
door_010=new Image();
door_010.src="./images/door_010.png";
door_011=new Image();
door_011.src="./images/door_011.png";
door_100=new Image();
door_100.src="./images/door_100.png";
door_101=new Image();
door_101.src="./images/door_101.png";
door_110=new Image();
door_110.src="./images/door_110.png";
door_111=new Image();
door_111.src="./images/door_111.png";
panel_00=new Image();
panel_00.src="./images/panel_00.png";
panel_01=new Image();
panel_01.src="./images/panel_01.png";
panel_10=new Image();
panel_10.src="./images/panel_10.png";
panel_11=new Image();
panel_11.src="./images/panel_11.png";
hole_0=new Image();
hole_0.src="./images/hole_0.png";
hole_1=new Image();
hole_1.src="./images/hole_1.png";

menu();