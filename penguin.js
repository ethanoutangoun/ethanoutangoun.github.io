var xTree = 0;
var treeArray =[];
var treeSize = [];
var treeColor = [];


var charX = 0;
var charY = 200;
var charState = 1;
var ticks = [];
var lightTrigger = true;
var lightCol = 255;
// var snowmanclicked = false
var snowmancounter = 0

//variables for puffle follow
var puffleFollow = false;

//variables for stockings that fall
var stockingClick = false;
var stockingY = 150;
var stockingDy = 1;
var beginsmokeCount = false;

//arrays for snowflake function -Masato
var snowflakeX = [];
var snowflakeY = [];
var snowflakeDy = [];
var snowflakeRadius = [];
var amountSnowflakes = 100;

//arrays for clouds function -Masato
var cloudX = [];
var cloudY = [];
var clouddx = [];
var cloudScal = [];
var amountClouds = 20;




// mouseClicked variable
var click = false;

// timers
var count = 0;
var fireCount = 0;
var smokeCounter = 0;
var puffleCounter = 0;

//sky transparency
var skyTransparency = 0;

var windowFlash = 255;

//counters
var lightColor = [];

//Spawn Location of Penguin
var spawnX;
var spawnY;
var dx = 0;
var dy = 0;
var pass = false;

//Movement Speed of Penguin
var moveSpeed = 5;
var locX;
var locY;

//Create Boolean Between Scenes
var outsideScene = true;
var insideScene = false;
var closetScene = false;

//Boolean for hitting border
var hitBorderBot = false;
var hitBorderTop = false;
var hitBorderRight = false;
var hitBorderLeft = false;


//Booleans for Penguin Color
var c1 = true;
var c2 = false;
var c3 = false;
var c4 = false;
var c5 = false;
var c6 = false;
var pickedHat = false;

//Booleans For showing Prompt
var prompt = false;
var changeScene = false;
var randb;


function setup()
{
   
   createCanvas(800, 400);
   christmasLights();
   for (var i = 0; i < amountSnowflakes; i++) //loop to fill array for snowflake
   {
      snowflakeX.push(random(800));
      snowflakeY.push(random(400));
      snowflakeDy.push(random(3, 5));
      snowflakeRadius.push(random(10));

   }

   for (var i = 0; i < amountClouds; i++)
   {
      cloudX.push(random(800));
      cloudY.push(random(25, 50));
      clouddx.push(random(1, 1.5));
      cloudScal.push(random(0.2, 0.5));
   }


   while(xTree<width)
  {
  	treeArray.push(xTree)
  	xTree+=20;
  }

  for(i=0; i<treeArray.length; i++)
  {
	  treeSize.push(random(0.8,1.2))
  }
  
  for(i=0; i<treeArray.length; i++)
  {
	  treeColor.push(random(190,220))
  }


   spawnX = 120;
   spawnY = 300;
   
}

function draw()
{
   
   backgroundScene();
   // snowmancounter++

   buildsnowman();
   count++
   fireCount++;
   puffleCounter++;
   
}

//need to make conditional statement that switches inside and outside
function backgroundScene(){
   var locX = spawnX+dx;
   var locY = spawnY+dy;
   outsideScene = false;
   insideScene = false;
   closetScene = false;
   

   if (changeScene ==true && prompt == true )
   {
   insideScene = true;
   insidehouseVersion1();
   }
   
   //Problem is that changescene is true when I press enter which makes this whole thing go wrong
   //How to make boolean say false even when enter is pressed but change when scene changes

   if (locX < width && locX >= 0 && changeScene == false)
   {
   outsideScene = true;
   outsidebackgroundVersion1();
   }

   if(locX<0)
   {
   closetScene = true;
   closetVersion1();
   }
  




}

function keyPressed()
{

   var locX = spawnX+dx;
   var locY = spawnY+dy;

   if (keyCode === ENTER && locX>250 && locX<330 && locY<280 && outsideScene == true)
   {
      changeScene = !changeScene;
   }

   if(keyCode === ESCAPE && insideScene == true )
   {
      changeScene = !changeScene;
   }
}

//Borders that the penguin hits
function hitRegOutside()
{
   var locX = spawnX+dx;
   var locY = spawnY+dy;
   hitBorderBot = false;
   hitBorderTop = false;
   hitBorderRight = false;
   hitBorderLeft = false;

   if (locY>height-50)
   {
      hitBorderBot = true;
      locY = height-50;
   }

   if (locY<200)
   {
      hitBorderTop = true;
   
   }

   //Sets Border around house
   if (locX == 150 && locY < 250 || locX>750)
   {
      hitBorderRight = true;
   }

   if (locX == 600 && locY < 250)
   {
      hitBorderLeft = true;
   }

   if (locX >150 && locX< 600 && locY < 250)
   {
      hitBorderTop = true;
   }

   

   
}
function hitRegInside()
{
   var locX = spawnX+dx;
   var locY = spawnY+dy;
   hitBorderBot = false;
   hitBorderTop = false;
   hitBorderRight = false;
   hitBorderLeft = false;

   if (locY>height-50)
   {
      hitBorderBot = true;
     
   }

   if (locY<=200)
   {
      
      hitBorderTop = true;
    
   }

   if(locX>width-100)
   {
      hitBorderRight = true;
      
   }
   if(locX<=50)
   {
      hitBorderLeft = true;
   }

}
function hitRegCloset()
{
   var locX = spawnX+dx;
   var locY = spawnY+dy;
   hitBorderBot = false;
   hitBorderTop = false;
   hitBorderRight = false;
   hitBorderLeft = false;

   if (locY>height-50)
   {
      hitBorderBot = true;
     
   }

   if (locY<=200)
   {
      
      hitBorderTop = true;
    
   }

   if(locX+800<50)
   {
      hitBorderLeft = true;
      
   }
   
}

function promptBox()
{
   var locX = spawnX+dx;
   var locY = spawnY+dy;

   if(locX>250 && locX<330 && locY<280)
   {
   prompt = true;
   }
   else 
   {
   prompt = false;
   }


}

function dimBackground(){ //change the increment value to make the sky dim slower or faster
   if (skyTransparency < 255){
      skyTransparency += 0.4;
   }
}


//this one is for outside
function outsidebackgroundVersion1()
{
   
   var locX = spawnX+dx;
   var locY = spawnY+dy;
   promptBox();
   //Keep Penguin Within Bounds
   hitRegOutside();
   

   background(120, 220, 232);
   fill(0, 0, 0, skyTransparency);
   rect(0, 0, width, height);

   

   noStroke();
   fill(234, 255, 254);
   rect(0, 250, 800, 400);
   MountainRange();
   for(i=0;i<treeArray.length;i++)
	{
    trees(treeArray[i]+10, 240,treeSize[i],treeColor[i]);
	}

   drawClouds(); //draws clouds
   updateClouds();//moves clouds
   drawSnowflake(); //draws snow -Masato
   updateSnowflake(); //updates and makes the snow fall
   //snowman(700, 315, .7);
   outsideCabin(width/2, height, 1, 0);

   penguin(locX,locY,0.35);
   
   if(puffleFollow) //condition that changes whether puffle follows or not
   {
      drawPuffle((locX - 90), (locY + 45), 1);
   }
   snowman(700, 315, .7);
   
   showPrompt();
   

   
   
   
   dimBackground();
   windowFlicker();

}

function showPrompt()
{
   push();
   

   if (prompt)
   {

      fill(0,0,0,170);
      rect(0,0,width,height);
      fill(255);
      stroke(113,193,250);
      strokeWeight(3);
      rectMode(CENTER);
      rect(width/2, height-60,300,70,30)
      textAlign(CENTER, CENTER);
      noStroke();
      fill(0);
      textSize(17);
      text('Open Door?', width/2, height - 80 );
      textSize(13);
      fill('green');
      text('Press Enter', width/2, height - 50 );
      
   }
   pop();
}


//this is the one for the house
function insidehouseVersion1()
{
   
   var locX = spawnX+dx;
   var locY = spawnY+dy;

   hitRegInside();
   
   

   background(104, 137, 166); //light blue color for the walls
   
   drawPerspective();
   drawWindow();
   drawFireplace(400, 300, 2);
   drawStockings();
   animateFire();
   drawFloor();
   drawChair(600, 250, 1)
   drawChair(200, 250, 1)
   

   present(170,340,0.4,3);
   tree(110,210,0.7);
   present(60,360,0.4,1);
   present(130,370,0.4,2);
   clock(620,160,0.4)
   penguin(locX,locY,0.45);

   if(puffleFollow) //condition that changes whether puffle follows or not
   {
      drawPuffle((locX - 90), (locY + 45), 1);
   }
   else
   {
      drawPuffle(600, 250, 1);
   }
   
   
}

//this one is for changing colors
function closetVersion1()
{
   hitRegCloset();

   

   var locX = spawnX+dx;
   var locY = spawnY+dy;
   background(234, 255, 254);
   noStroke();
   //Display Colors
   fill(210,0,0);
   rect(30,30, 100,100)

   fill('purple');
   rect(160,30,100,100);

   fill(73,185,230);
   rect(290,30,100,100);


   fill(120, 220, 232)
   rect(0, 250, 800, 400);

   fill(240,221,72);
   rect(420,30,100,100);

   fill('green');
   rect(550,30,100,100);

   fill(0);
   rect(680,30,100,100);

   fill(0,0,0,170);

   topHat(60, 200);

   push();
      translate(-200,-10)
      fill(255);
      stroke(113,193,250);
      strokeWeight(3);
      rectMode(CENTER);
      rect(width/2, height-60,300,70,30)
      textAlign(CENTER, CENTER);
      noStroke();
      fill(0);
      textSize(15);
      text('Press \"ENTER\" to open doors', width/2, height - 80 );
      textSize(15);
      fill(0);
      text('Press \"ESCAPE\" to exit room', width/2, height - 50 );

   pop();

   penguin(locX+800,locY,0.35);
   

}

//function that draws perspective lines on the inside -Masato
function drawPerspective()
{
   noFill();
   stroke(0);
   fill(242, 213, 126); //cream color back wall
   rect(100, 100, 600, 200); // back wall
   line(0, 0, 100, 100);
   line(0, 400, 100, 300);
   line(800, 0, 700, 100);
   line(800, 400, 700, 300);
}

function movement()//Controls Movement of Penguin - Ethan
{

   

   if (keyIsDown(LEFT_ARROW)&& !hitBorderLeft)
   {
      dx -=moveSpeed;
   }

   if (keyIsDown(RIGHT_ARROW)&& !hitBorderRight)
   {
      dx +=moveSpeed;
   }

   if (keyIsDown(UP_ARROW)&& !hitBorderTop)
   {
      dy -=moveSpeed;
   }

   if (keyIsDown(DOWN_ARROW) && !hitBorderBot)
   {
      dy +=moveSpeed;
   }
   

}

function trees(x,y,s,col) //Row of Trees Outside - Ethan
{
	push();
	translate(x,y);
	scale(s);
	stroke(0);
	fill(217,177,56);
	rect(-5,0,10,27);
	fill(25,col,43);
	triangle(-15,0,15,0,0,-20)
	triangle(-13,-10,13,-10,0,-40)
	triangle(-11,-20,11,-20,0,-60)
	pop();

}

function penguin(x,y,s)  //Draws Penguin - Ethan
{

   
   let colA = color(73,185,230) ;
   

   
   
   

   push();
   translate(x,y);
   scale(s);
   noStroke();
   push();
   translate(-238,-186);
   push();
   //Feet
   push();
   push();
   fill(250,174,41);
   translate(186,299);
   rotate(PI/13);
   rectMode(CENTER);
   rect(0,0,80,60,24);
   
   pop();

   push();
   translate(-6,0)
   fill(125,86,20);
   beginShape();
   curveVertex(156,281);
   curveVertex(165,285);
   curveVertex(175,296);
   curveVertex(195,313);
   curveVertex(229,322);
   curveVertex(229,322);
   curveVertex(233,305);
   curveVertex(233,305);
   curveVertex(192,270);
   curveVertex(163,268);
   endShape(CLOSE);
   pop();
   pop();

   



   push();
   translate(290,297)
   scale(-1,1)
   push();
   translate(-186,-299);
   push();
   fill(250,174,41);
   translate(186,299);
   
   rotate(PI/13);
   rectMode(CENTER);
   rect(0,0,80,60,24);
   
   pop();

   push();
   translate(-6,0)
   fill(125,86,20);
   beginShape();
   curveVertex(156,281);
   curveVertex(165,285);
   curveVertex(175,296);
   curveVertex(195,313);
   curveVertex(229,322);
   curveVertex(229,322);
   curveVertex(233,305);
   curveVertex(233,305);
   curveVertex(192,270);
   curveVertex(163,268);
   endShape(CLOSE);
   pop();
   pop();
   pop();








   //Body

   //Fill Color


   if (c1)
   {
   fill(colA);
   }

   if(c2)
   {
   fill('red');
   }

   if (c3)
   {
   fill('purple');
   }
   if(c4)
   {
   fill(0);
   }
   if(c5)
   {
   fill('green');
   }
   if(c6)
   {
   fill(240,221,72);
   }

   beginShape();
   curveVertex(239,57);
   curveVertex(198,85);
   curveVertex(170,120);
   curveVertex(125,159);
   curveVertex(109,184);
   curveVertex(93,250);
   curveVertex(96,253);
   curveVertex(126,204);
   curveVertex(137,192);
   curveVertex(135,213);
   curveVertex(144,245);
   curveVertex(175,274);
   curveVertex(175,274);
   curveVertex(202,295);
   curveVertex(249,276);
   
   endShape(CLOSE);

   ellipse(238,254,134,100)
   pop();

   push();
   translate(240,195);
   scale(-1,1);
   push();
   translate(-240,-195);
    if (c1)
   {
   fill(colA);
   }

   if(c2)
   {
   fill('red');
   }

   if (c3)
   {
   fill('purple');
   }
   if(c4)
   {
   fill(0);
   }
   if(c5)
   {
   fill('green');
   }
   if(c6)
   {
   fill(240,221,72);
   }
   
   beginShape();
   curveVertex(242,57);
   curveVertex(198,85);
   curveVertex(170,120);
   curveVertex(125,159);
   curveVertex(109,184);
   curveVertex(93,250);
   curveVertex(96,253);
   curveVertex(126,204);
   curveVertex(137,192);
   curveVertex(135,213);
   curveVertex(144,245);
   curveVertex(175,274);
   curveVertex(175,274);
   curveVertex(202,295);
   curveVertex(249,276);
   
   endShape(CLOSE);

   ellipse(238,254,134,100)
   pop();
   pop();

   fill(255);
   beginShape();
   curveVertex(214,173);
   curveVertex(195,218);
   curveVertex(169,256);
   curveVertex(180,277);
   curveVertex(204,296);
   curveVertex(241,305);
   curveVertex(284,295);
   curveVertex(308,271);
   curveVertex(311,251);
   curveVertex(293,223);
   curveVertex(267,169);
 
   endShape(CLOSE);



   fill(250,174,41);
   beginShape();
   curveVertex(238,135);
   curveVertex(218,138);
   curveVertex(207,155);
   curveVertex(221,189);
   curveVertex(240,194);
   curveVertex(262,188);
   curveVertex(269,174);
   curveVertex(272,150);
   curveVertex(255,135);
   endShape(CLOSE);




   //eyes
   fill(255);
   rectMode(CENTER);
   rect(228,130,24,18,3,8,8,8);
   rect(249,130,24,18,8,3,8,8);
   fill(0);
   ellipse(230,134,8);
   ellipse(249,134,8);
   pop();
   //TopHat
   if(pickedHat)
   {
      topHat(0,-90,2.5);
   }
   pop();
   movement();
   
}

function drawFloor() //draws flooring/carpet -Masato
{
   fill(18, 56, 89); //dark blue
   quad(100, 300, 0, 400, 800, 400, 700, 300) //quad for floor
}

//function that draws Fireplace exterior inside house -Masato
function drawFireplace(x, y, scal)
{
   push();
   translate(x, y);
   scale(scal);
   noStroke();
   fill(115, 2, 2); //dark red color
   rect(-65, -65, 130, 65); //shape of outside of fireplace
   quad(-65, -65, -70, -75, 70, -75, 65, -65);// top of fireplace
   fill(0); // black for the backdrop
   rect(-50, -50, 100, 50); //fire place
   pop();
}

//function that draws fire in the fireplace -Masato
function drawFire(x, y, scal, h)
{
   push();
   translate(x,y);
   scale(scal);
   fill(255, 86, 0);
   noStroke();
   beginShape();
   vertex(-10, 0);
   vertex(-4, h + 14);
   vertex(0, h + 15);
   vertex(5, h + 5);
   vertex(7, h + 7);
   vertex(10, h);
   vertex(13, h + 6);
   vertex(15, h + 5);
   vertex(20, h + 15);
   vertex(26, h + 13);
   vertex(30, 0);
   vertex(-10, 0);
   endShape();
   fill(255, 162, 13);
   arc(10, 0, (-h/2), (-h/2), PI, 0, OPEN);
   pop();

}
//function that animated fireplace
function animateFire()
{
   if (Math.floor(fireCount / 15) % 2 != 0)
   {
      drawFire(350, 300, 5, -25);
   }
   else
   {
      drawFire(350, 300, 5, -20);
   }

}

//function that adds chair - Masato
function drawChair(x, y, z)
{
   push();
   translate(x, y);
   scale(z);
   noStroke();
   fill(122, 58, 0);
   ellipse(0, 0, 70, 70)
   fill(255, 134, 25);
   rect(-45, 0, 90, 75);
   fill(122, 58, 0);
   rect(-30, 0, 60, 30);
   rect(-30, 45, 60, 30);
   pop();
}
//function that draws one stocking
function drawStocking(x, y, z,)
{
   push();
   translate(x, y);
   scale(z);
   fill(255, 255, 255);
   rect(0, 0, 40, 20);
   fill(204, 0, 0);
   beginShape();
   vertex(0, 20);
   vertex(0, 40);
   bezierVertex(0, 45, 60, 80, 40, 40);
   vertex(40, 20)
   endShape();
   pop();
}


//function that draws snowman for outside -Liam
function buildsnowman()
{
   var locX = spawnX+dx;
   var locY = spawnY+dy;
   if(locX > 670 && locX < 730 && outsideScene == true)
   {
      snowmancounter++
   }
}
function snowman(x, y, scal)
{
   push();
      translate(x, y);
      scale(scal);
      fill(235)
      //body
         ellipse(0, 0, 70)
         if (snowmancounter >= 40)
         {
            ellipse(0, -40, 60)
         }
         if (snowmancounter >= 80)
         {
             ellipse(0, -75, 50)
         }

           
      fill(0)
      //hat
         if (snowmancounter >= 280)
         {
            rect(-25, -100, 50, 5)
            rect(-15, -130, 30, 30)
         }
      //eyes
         if (snowmancounter >= 120)
         {
            ellipse(10, -85, 5)
            ellipse(-10, -85, 5)
         }
      //mouth
         if (snowmancounter >= 160)
         {
            ellipse(-15, -68.5, 2.5)
            ellipse(-10, -66.5, 2.5)
            ellipse(-5, -65.5, 2.5)
            ellipse(0, -65, 2.5)
            ellipse(15, -68.5, 2.5)
            ellipse(10, -66.5, 2.5)
            ellipse(5, -65.5, 2.5)
         }
      //buttons
         if (snowmancounter >= 200)
         {
            ellipse(0, -40, 5)
            ellipse(0, -25, 5)
            ellipse(0, -10, 5)
            ellipse(0, 5, 5)
         }
      fill(255, 165, 0)
      //nose
         if (snowmancounter >= 240)
         {
            triangle(-3, -80, -3, -70, 15, -73)
         }
   pop();
}
//function that draws stockings -Masato
function drawStockings()
{

   for (var i = 300; i < 500 ; i += 50)
   {
      drawStocking(i, stockingY, 1);
   }
   if (stockingClick)
   {
      stockingY += stockingDy;
   }
}
//function that draws window inside - Masato
function drawWindow()
{
   fill(255, 255, 255)
   quad(750, 125, 750, 250, 800, 275, 800, 100);
}

//function for tree inside -Ethan
function tree(x,y,s,r)
{
   
	push();
   translate(x,y);
   rotate(r);
	scale(s);
   
   push();
   translate(-203,-260);
   rectMode(CENTER);

   //Tree Stump
   //Dark Brown Fill
   fill(182,60,1);
   strokeWeight(2);
   quad(253,489,239,369,183,374,183,489);
   //Light brown stump
   noStroke();
   fill(226,92,27);
   beginShape();
   curveVertex(206,414);
   curveVertex(206,414);
   curveVertex(219,428)
   curveVertex(225,431);
   curveVertex(233,422);
   curveVertex(233,422);
   curveVertex(243,432);
   curveVertex(244,444);
   curveVertex(217,452);
   curveVertex(189,451);
   curveVertex(191,429);
   curveVertex(206,414);
   endShape();

   fill(85,140,16);
   stroke(0);


   //Tree Leaves Bottom
   beginShape();
   curveVertex(117,268);
   curveVertex(117,268);
   curveVertex(72,332);
   curveVertex(35,368);
   curveVertex(34,381);
   curveVertex(54,392);
   curveVertex(61,379);
   curveVertex(61,379);
   curveVertex(55,402);
   curveVertex(77,410);
   curveVertex(123,391);
   curveVertex(123,391);
   curveVertex(113,398);
   curveVertex(115,409);
   curveVertex(125,412);
   curveVertex(145,398);
   curveVertex(145,398);
   curveVertex(140,388);
   curveVertex(140,388);
   curveVertex(157,410);
   curveVertex(171,419);
   curveVertex(184,417);
   curveVertex(197,408);
   curveVertex(205,385);
   curveVertex(205,385);
   curveVertex(212,397);
   curveVertex(221,401);
   curveVertex(227,401);
   curveVertex(240,386);
   curveVertex(238,380);
   curveVertex(238,380);
   curveVertex(259,399);
   curveVertex(273,403);
   curveVertex(286,394);
   curveVertex(288,369);
   curveVertex(288,369);
   curveVertex(293,386);
   curveVertex(311,397);
   curveVertex(327,389);
   curveVertex(327,389);
   curveVertex(366,386);
   curveVertex(377,378);
   curveVertex(327,323);
   curveVertex(307,291);
   curveVertex(287,288);
   curveVertex(287,288);
   
   curveVertex(117,268);
   curveVertex();
   curveVertex();
   endShape();


   //Tree Leaves Medium
   beginShape();
   curveVertex(213,130);
   curveVertex(213,130);
   curveVertex(143,207);
   curveVertex(79,269);
   curveVertex(79,285);
   curveVertex(111,291);
   curveVertex(139,277);
   curveVertex(122,287);
   curveVertex(119,301);
   curveVertex(164,294);
   curveVertex(162,284);
   curveVertex(177,306);
   curveVertex(184,311);
   curveVertex(198,304);
   curveVertex(207,288);
   curveVertex(211,299)
   curveVertex(218,302);
   curveVertex(226,298);
   curveVertex(228,288);
   curveVertex(247,304);
   curveVertex(255,303);
   curveVertex(258,282);
   curveVertex(258,282);
   curveVertex(276,298);
   curveVertex(293,294);
   curveVertex(293,287);
   curveVertex(307,290);
   curveVertex(325,274);
   curveVertex(275,210);
   curveVertex(213,130);
   curveVertex(213,130);
   endShape();

   //Tree Leaves Top

   beginShape();
   curveVertex(207,56);
   curveVertex(207,56);
   curveVertex(127,200);
   curveVertex(147,193);
   curveVertex(143,208);
   curveVertex(183,186);
   curveVertex(181,191);
   curveVertex(196,204);
   curveVertex(215,193);
   curveVertex(215,193);
   curveVertex(210,185);
   curveVertex(229,202);
   curveVertex(247,186);
   curveVertex(239,176);
   curveVertex(265,196);
   curveVertex(282,195);
   curveVertex(225,87);
   curveVertex(207,56);
   curveVertex(207,56);
   endShape();

   //Lights
   
   if(frameCount%45==0)
   {
      lightTrigger = !lightTrigger;
   }

   if (lightTrigger)
   {
      lightCol = 255;
   }
   else
   {
      lightCol = 40;
   }

   stroke(255,255,47, lightCol);
   strokeWeight(6);
   point(203,106);
   point(153,169);
   point(185,173);
   point(209,161);
   point(176,222);
   point(138,249);
   point(91,276);
   point(195,272);
   point(215,224);
   point(227,259);
   point(243,285);
   point(263,228);
   point(158,321);
   point(145,331);
   point(201,335);
   point(91,353);
   point(54,369);
   point(114,380);
   point(166,370);
   point(222,380);
   point(249,371);
   point(265,340);
   point(294,323);
   point(323,339);
   point(351,365);

   strokeWeight(2);
   stroke(255,255,255);
   point(203,106);
   point(153,169);
   point(185,173);
   point(209,161);
   point(176,222);
   point(138,249);
   point(91,276);
   point(195,272);
   point(215,224);
   point(227,259);
   point(243,285);
   point(263,228);
   point(158,321);
   point(145,331);
   point(201,335);
   point(91,353);
   point(54,369);
   point(114,380);
   point(166,370);
   point(222,380);
   point(249,371);
   point(265,340);
   point(294,323);
   point(323,339);
   point(351,365);



   stroke(0);
   strokeWeight(2);
   //Ornaments
   ornament(173,149,1);
   ornament(262,196,3);
   ornament(165,261,2);
   ornament(281,283,1);
   ornament(224,329,3);
   ornament(67,348,1);
   ornament(359,385,2)
   ornament(329,392,3)


   //Star
   

   
   fill(252,138,0);
   
   push();
   push();
   strokeWeight(3);
   translate(207,48);
   rotate(PI/3.5)
   scale(0.5,0.66);
   star(0, 0, 30, 70, 5);
   pop();
 
   push();
   noStroke();
   fill(252,180,0);
   translate(207,46);
   rotate(PI/3.5)
   scale(0.3,0.4);
   star(0, 0, 30, 70, 5);
   pop();
   pop();
   //Shading
   noStroke();
   fill(100,177,3);
   ellipse(161,183,20);
   push();
   translate(227,178);
   rotate(-PI/6)
   ellipse(0,0,20,30);
   pop();

   push();
   translate(230,130);
   rotate(-PI/6)
   ellipse(0,0,20,60);
   pop();

   ellipse(281,234,15);
   ellipse(186,287,25);
   ellipse(108,261,16);
   ellipse(83,377,35,30);
   ellipse(110,357,15);
   ellipse(173,396,30,25);
   ellipse(266,377,20,20);
   ellipse(312,374,18,18);

   pop();
	pop();
}
//function for ornament -Ethan
function ornament(x,y,col)
{
   
   push();
   translate(x,y);
 
   

   if(col==1)
   {
      fill(200,0,0);
      ellipse(0,0,20);
      fill(150,0,0);
       noStroke();
       ellipse(-1,2,12);
      //Highlights
        push();
      rotate(-PI/4);
       fill(255,255,255,100);
       rect(6,-3,4,2);
      pop();

  
   push();
   translate(3,3)
   rotate(-PI/4);
   fill(255,255,255,100);
   rect(6,-3,4,2);
   pop();
   }

   if(col==2)
   {
      fill(33,154,245);
      ellipse(0,0,20);
   fill(28,132,212);
   noStroke();
   ellipse(-1,2,12);
   //Highlights
   push();
   rotate(-PI/4);
   fill(255,255,255,100);
   rect(6,-3,4,2);
   pop();

  
   push();
   translate(3,3)
   rotate(-PI/4);
   fill(255,255,255,100);
   rect(6,-3,4,2);
   pop();
   }

   if(col==3)
   {
      fill('orange');
      ellipse(0,0,20);
   fill(201,146,6);
   noStroke();
   ellipse(-1,2,12);
   //Highlights
   push();
   rotate(-PI/4);
   fill(255,255,255,100);
   rect(6,-3,4,2);
   pop();

  
   push();
   translate(3,3)
   rotate(-PI/4);
   fill(255,255,255,100);
   rect(6,-3,4,2);
   pop();
   }
   
   
   
   pop();
}
//function for star -Ethan
function star(x, y, radius1, radius2, npoints) {
 
  
   
   let angle = TWO_PI / npoints;
   let halfAngle = angle / 2.0;
   beginShape();
   for (let a = 0; a < TWO_PI; a += angle) {
     let sx = x + cos(a) * radius2;
     let sy = y + sin(a) * radius2;
     vertex(sx, sy);
     sx = x + cos(a + halfAngle) * radius1;
     sy = y + sin(a + halfAngle) * radius1;
     vertex(sx, sy);
   }
   endShape(CLOSE);



 }
//function for clock -Ethan
function clock(x,y,s)
{

   
   var getSec = (second()*(PI/30));
   var getHour = (hour()*(PI/6));
   var getMin = (minute()*(PI/30));
   var t = 0;
   //Outer Ticks
   for(i = 0 ; i<60;i++)
   {
      ticks.push(t);
      t = t+(PI/30);
   }

   push();
   translate(x,y);
   scale(s);
   noStroke();
   fill(70);
   ellipse(0,0,200,200);
   //Clock Inner
   fill(245);
   ellipse(0,0,185,185);
   noFill();
   stroke(100);
   ellipse(0,0,170,170);

   for (i=0;i<60;i++)
   {
      push();
      rotate(ticks[i]);
      
      if(i % 5 ==0)
      {
         //Big Lines
         stroke(0);
         line(0,-75,0,-85);
      }
      line(0,-80,0,-85);
      pop();
   }


   fill(0);
   ellipse(0,0,8,8);

   
   //Second Hand
   push();
   rotate(getSec);
   stroke(255,0,0)
   line(0,10,0,-70)
   pop();

   //Minute Hand
   push();
   rotate(getMin);
   strokeWeight(2);
   stroke(0);
   line(0,10,0,-60)
   pop();

   //Hour Hand
   push();
   rotate(getHour);
   strokeWeight(3);
   stroke(0);
   line(0,10,0,-40)
   pop();

   


   pop();
   
}



//function for Present -Ethan
function present(x,y,s,c)
{
  
   push();
   translate(x,y);

   scale(0.3);
   scale(s);

   push();

   translate(-436,-444);
   
   if(c==1)
   {
      fill(170,0,0);
   }

   if(c==2)
   {
      fill(7,140,198);
   }
   if(c==3)
   {
      fill(80,140,5);
   }

   strokeWeight(5);
   rectMode(CENTER);

   //Bottom Box
   beginShape();
   vertex(78,621);
   vertex(78,222);
   vertex(819,222);
   vertex(819,558);
   vertex(495,774);
   endShape(CLOSE);

   //Gift Wrap
   /*
   push();
   strokeWeight(10);
   fill(220);
   quad(199,666,260,688,260,323,199,312)
   quad(656,665,715,627,715,309,665,338)
   pop();
   */


   //Edge Shading
   stroke(255,255,255,100);
   strokeWeight(10);
   line(493,757,493,388);
   stroke(255,255,255,130);
   strokeWeight(5);
   line(493,757,493,388);
   

   //Top Box
   strokeWeight(5);
   stroke(0);
   beginShape();
   vertex(73,220);
   vertex(73,334);
   vertex(496,466);
   vertex(827,299);
   vertex(827,186);
   vertex(400,120);
   endShape(CLOSE);

   //Edge Lines on Top
   fill(255);
   noStroke();
   beginShape();
   vertex(78,223);
   vertex(78,233);
   vertex(487,342);
   vertex(487,457);
   vertex(497,457);
   vertex(497,342);
   vertex(822,199);
   vertex(822,192);
   vertex(494,334);
   endShape(CLOSE);


   //Ribbon
   
   push();
   fill(220);
   beginShape();
   curveVertex(428,154);
   curveVertex(369,30);
   curveVertex(312,0);
   curveVertex(246,25);
   curveVertex(219,55);
   curveVertex(226,107);
   curveVertex(245,135);
   curveVertex(287,170);
   curveVertex(341,188);
   curveVertex(375,190);
   curveVertex(400,195);
   endShape(CLOSE);

   fill(120);
   beginShape();
   curveVertex(399,195);
   curveVertex(355,189);
   curveVertex(301,168);
   curveVertex(246,124);
   curveVertex(230,76);
   curveVertex(229,59);
   curveVertex(241,42);
   curveVertex(264,32);
   curveVertex(285,38);
   curveVertex(306,58);
   curveVertex(364,137);
   curveVertex(398,187);
   endShape(CLOSE);

   fill(220);
   beginShape();
   curveVertex(180,209);
   curveVertex(180,209);
   curveVertex(223,222);
   curveVertex(223,222);
   curveVertex(200,250);
   curveVertex(209,250);
   curveVertex(296,247);
   curveVertex(310,245);
   curveVertex(335,233);
   curveVertex(363,219);
   curveVertex(371,216);
   curveVertex(424,212);
   curveVertex(414,196);
   curveVertex(400,194);
   curveVertex(332,188);
   curveVertex(281,210);
   curveVertex(180,209);
   endShape(CLOSE);
   pop();

   fill(140);
   beginShape();
   curveVertex(429,155);
   curveVertex(405,172);
   curveVertex(399,193);
   curveVertex(430,215);
   curveVertex(472,224);
   curveVertex(492,215);
   curveVertex(500,183);
   curveVertex(429,155);
   endShape(CLOSE)

   push();
   translate(846,30);
 
   scale(-0.9,0.9)
   fill(220);
   beginShape();
   curveVertex(428,154);
   curveVertex(369,30);
   curveVertex(312,0);
   curveVertex(246,25);
   curveVertex(219,55);
   curveVertex(226,107);
   curveVertex(245,135);
   curveVertex(287,170);
   curveVertex(341,188);
   curveVertex(375,190);
   curveVertex(400,195);
   endShape(CLOSE);

   fill(120);
   beginShape();
   curveVertex(399,195);
   curveVertex(355,189);
   curveVertex(301,168);
   curveVertex(246,124);
   curveVertex(230,76);
   curveVertex(229,59);
   curveVertex(241,42);
   curveVertex(264,32);
   curveVertex(285,38);
   curveVertex(306,58);
   curveVertex(364,137);
   curveVertex(398,187);
   endShape(CLOSE);

   fill(220);
   beginShape();
   curveVertex(180,209);
   curveVertex(180,209);
   curveVertex(223,222);
   curveVertex(223,222);
   curveVertex(200,250);
   curveVertex(209,250);
   curveVertex(296,247);
   curveVertex(310,245);
   curveVertex(335,233);
   curveVertex(363,219);
   curveVertex(371,216);
   curveVertex(424,212);
   curveVertex(414,196);
   curveVertex(400,194);
   curveVertex(332,188);
   curveVertex(281,210);
   curveVertex(180,209);
   endShape(CLOSE);
   pop();


   pop();
   pop();
}
function drawSnowflake() //function that draws snowflakes -Masato
{
   for (var i = 0; i < amountSnowflakes; i++)
   {
      fill(255, 255, 255);
      ellipse(snowflakeX[i], snowflakeY[i], snowflakeRadius[i]);
   }
}
function updateSnowflake() // function that makes snowflakes fall -Masato
{
   for (var i = 0 ; i < amountSnowflakes; i++)
   {
      snowflakeY[i] += snowflakeDy[i];

      if(snowflakeY[i] > 400)
      {
         snowflakeY[i] = 35;
      }
   }
   
}
//mouse clicked function for stockings -Masato
function mouseClicked()
{
   //makes stockings fall
   if (mouseX > 300 && mouseX < 500 && mouseY > 100 && mouseY < 200 && insideScene == true)
   {
      stockingClick = true;
   }

   //makes puffle follow
   if (mouseX > 550 && mouseX < 650 && mouseY > 200 && mouseY < 250 && insideScene == true)
   {
      puffleFollow = true;
   }

   //Purple
   if( mouseX>160 && closetScene == true && mouseX<260 && mouseY<130 && mouseY>30 )
   {
      c1 = false;
      c2 = false;
      c3 = true;
      c4 = false;
      c5 = false;
      c6 = false;
   }
   //Blue
   if( mouseX>290 && closetScene == true && mouseX<390&& mouseY<130 && mouseY>30  )
   {
      c1 = true;
      c2 = false;
      c3 = false;
      c4 = false;
      c5 = false;
      c6 = false;
   }

   //Red
   if( mouseX>30 && closetScene == true && mouseX < 130 && mouseY<130 && mouseY>30 )
   {
      c1 = false;
      c2 = true;
      c3 = false;
      c4 = false;
      c5 = false;
      c6 = false;
   }

   //Black
   if( mouseX>680 && closetScene == true && mouseX < 780 && mouseY<130 && mouseY>30 )
   {
      c1 = false;
      c2 = false;
      c3 = false;
      c4 = true;
      c5 = false;
      c6 = false
   }

   //Yellow
   if( mouseX>420 && closetScene == true && mouseX<520 && mouseY<130 && mouseY>30 )
   {
      c1 = false;
      c2 = false;
      c3 = false;
      c4 = false;
      c5 = false;
      c6 = true;
   }

   //Green
   if( mouseX>550 && closetScene == true && mouseX<650 && mouseY<130 && mouseY>30  )
   {
      c1 = false;
      c2 = false;
      c3 = false;
      c4 = false;
      c5 = true;
      c6 = false;
   }
  

   if(closetScene==true && mouseX>30 && mouseX<75 && mouseY>160 && mouseY<200)
   {
      pickedHat = !pickedHat;
   }
}

function christmasLights(){
   for(i = 0; i < 150; i ++){
      var c = random(100)
      if (c < 33){
         lightColor.push(color(255, 0, 0));
      }
      else if(33 <= c && c < 66){
         lightColor.push(color(0, 255, 0));
      }
      else{
         lightColor.push(color(0, 0, 255));
      }

   }

   //Red
   if( mouseX>30 && closetScene == true && mouseX < 130)
   {
      c1 = false;
      c2 = true;
      c3 = false;
      c4 = false;
      c5 = false;
   }

}

function smokeCount() //for counter that determines when the smoke rises - Masato
{
   if(beginsmokeCount)
   {
      smokeCounter++;
   }
}
function windowFlicker(){
   windowFlash = 50;
   darknessChance = random(1000)
   var flash = false;
   if (darknessChance > 300 && darknessChance < 350){
      flash = !flash;
   }

   if(!flash){
      for(i=0; i<10; i++){
         windowFlash = 0; 
      }
   }
}

function outsideCabin(xPosition, yPosition, scl, rot){
   push();
       translate(xPosition, yPosition);
       rotate(rot);
       scale(scl);
       fill(243,225,186);
       rect(-200, -200, 400, 100); //main body of house
      stroke(1);
      fill(85,54,42);      
       quad(-220, -200, -190, -300, 190, -300, 220, -200); //roof
       fill(80);
       rect(120, -350, 40, 50); //chimney
       //LIGHTS
        var lightPos = -220;
        var n = 0; 
           for(i=-220; i<220; i+=15){
               stroke(1);
               circle(lightPos,-200, 5);
               lightPos += 15;
               n++;
               fill(lightColor[n]);
           }


       
       
       //LIGHTS
       var lightPos = -190;
           for(i=-190; i<190; i+=15){
               stroke(1);
               circle(lightPos, -300, 5);
               lightPos += 15;
               n++;
               fill(lightColor[n]);
           }
       



       fill(243,225,186);
       rect(-200, -200, 200, 120); //front of house
       noStroke();
       triangle(-200, -190, -100, -300, 0, -190); //triangle front of house
       stroke(1);

       push(); //Angled front roof logs
       
           angleMode(DEGREES);

           translate(-100, -300);
           rotate(130);
           fill(85,54,42);
           rect(0, 0, 160, 10);
           //LIGHTS
           var lightPos = 0;
           for(i=0; i<160; i+=15){
               circle(lightPos, 10, 5);
               lightPos += 15;
               n++;
               fill(lightColor[n]);
           }

   
           rotate(275);
           fill(85,54,42);
           rect(0, 0, 160, 10);

           //LIGHTS 
           var lightPos = 0;
           for(i=0; i<160; i+=15){
               circle(lightPos, 0, 5);
               lightPos += 15;
               n++;
               fill(lightColor[n]);
           }
       pop();
   
 

       rect(-125, -180, 50, 100); //door


      fill("yellow"); //firelight for windows
       

       
       //WINDOWS
       rect(-175, -175, 25, 50); //left window
       
       
       line(-175, -150, -150, -150);//left front horizontal line
       line(-162.5, -175, -162.5, -125);//left front vertical line

       rect(-50, -175, 25, 50); //right window
       
       line(-50, -150, -25, -150); //right front h l
       line(-36.5, -175, -36.5, -125);//right front v l

       rect(150, -180, 25, 50); //right back window
       
       line(150, -155, 175, -155);//right back h l
       line(161.5, -180, 161.5, -130);//right back v l

       rect(50, -180, 25, 50); //left back window
       
       line(50, -155, 75, -155);//left back h l
       line(61.5, -180, 61.5, -130);//left back v l

       fill("yellow");
       circle(-80, -130, 5);//doorknob
           //DARK WINDOWS 
         push();
         fill(0, 0, 0, windowFlash);
         rect(-175, -175, 25, 50); //left window dark
         rect(-50, -175, 25, 50); //right window dark
         rect(150, -180, 25, 50); //right back window dark
         rect(50, -180, 25, 50); //left back window dark
         pop();

      
   pop()
   angleMode(RADIANS);
}




function drawCloud(x, y, z) //model for clouds -Masato
{
   push();
   translate(x, y);
   scale(z);
   noStroke();
   fill(255, 255, 255);
   ellipse(0, 5, 50);
   ellipse(-30, 5, 50);
   ellipse(30, 5, 50);
   ellipse(0, -25, 40);
   ellipse(20, -20, 40)
   ellipse(-20, -20, 40);
   pop();
}

function drawClouds() //actually draws the clouds on the outside - Masato
{
   for (var i = 0; i < amountClouds; i++)
   {
      drawCloud(cloudX[i], cloudY[i], cloudScal[i]);

   }
   
}

function updateClouds() //moves the clouds across the screen - Masato
{
   for (var i = 0; i < amountClouds; i++)
   {
      cloudX[i] += clouddx[i]
   if (cloudX[i] > 800)
   {
      cloudX[i] = -100;
   }
}
}
function Mountain(mountainX, mountainY)
{
   
   push();
      translate(mountainX, mountainY);
      fill(200)
      triangle(0, 250, 200, 250, 100, 0);
      fill(255);
      triangle(80, 50, 100, 0, 120, 50);
      triangle(80, 50, 90, 80, 100, 50);
      triangle(100, 50, 110, 80, 120, 50);
   pop();
}


function MountainRange()
{
   Mountain(0, 0);
   Mountain(200, 0);
   Mountain(400, 0);
   Mountain(600, 0);
}


function topHat(x, y,s){
   push();
      translate(x, y);
      scale(s);
      fill(0);
      ellipse(0, 0, 60, 10);
      rect(-15, -38, 30, 40, 10, 10);
   pop();
}

function drawPuffle(x, y, z) //puffle function -Masato
{
   push();
   translate(x, y);
   scale(z);
   
   //closet function also changes color of puffle
   if (c1)
   {
   fill(73,185,230);
   }

   if(c2)
   {
   fill('red');
   }

   if (c3)
   {
   fill('purple');
   }
   if(c4)
   {
   fill(0);
   }
   if(c5)
   {
   fill('green');
   }
   if(c6)
   {
   fill(240,221,72);
   }

   strokeWeight(0.5);
   
   beginShape(); //head spikes of puffle
   curveVertex(-20, 0);
   curveVertex(-20, -5);
   curveVertex(-30, -12);
   curveVertex(-20, -15);
   curveVertex(-28, -22);
   curveVertex(-10, -20);
   curveVertex(-25, -30);
   curveVertex(0, -25);
   curveVertex(25, -30);
   curveVertex(10, -20);
   curveVertex(28, -22);
   curveVertex(20, -15);
   curveVertex(30, -12);
   curveVertex(20, -5);
   curveVertex(20, 0);
   curveVertex(-20, 0);
   endShape();
   
   beginShape(); //top head of puffle
   curveVertex(-2, -25);
   curveVertex(-2, -25);
   curveVertex(0, -30);
   curveVertex(2, -25);
   curveVertex(2, -25);
   endShape();

   ellipse(0, 0, 50,); //body of puffle


   if (Math.floor(puffleCounter / 60) % 2 != 0)
   {
   fill(255, 255, 255); //eyes of puffle
   noStroke();
   ellipse(-8, -5, 20);
   ellipse(8, -5, 20);
   
   fill(0); //pupils of puffle
   ellipse(-5, -5, 5, 10);
   ellipse(5, -5, 5, 10);
   }
   else
   {
      strokeWeight(2);
      stroke(0);
      line(-15, -5, -2, -5);
      line(2, -5, 15, -5);
   }

   stroke(0); //mouuth of puffle
   strokeWeight(1);
   line(-10, 10, 10, 10);

   
   pop();
}



