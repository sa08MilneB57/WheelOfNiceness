function makeLink(web,text){
  let link = createA(web,text);
  outputDOM.html("");
  outputDOM.child(link);
}

function babies(){
  makeLink("https://drive.google.com/drive/folders/1luRy1jZOB8Zf39P-UZOaeiqXlQost2_U?usp=drive_link","Baby Pictures Google Drive");
  }
function wedding(){
  makeLink("https://www.photobox.co.uk/view-online-photo-book?widgetId=bfc0373a-6c52-480e-9a7f-45359b4308fa&securityId=bfbce439-1dbb-4767-ba90-6f2ffc59cc0c&fbclid=IwY2xjawNCXMVleHRuA2FlbQIxMABicmlkETFGRnN1VHczQ0xUelhEc1lsAR5NNfb5QBRcfLVoU7tM4WVLH84evOxo5aUNCatl4bn10QiSTfe5QXEkUffW7A_aem_ZN_lRs2c12BTbk0xrEfQjQ",
    "Wedding Pictures");
}
function funnyVids(){
  makeLink("https://youtube.com/playlist?list=PLJkmPFjpkAXEhM_qgK0ij6U1sXQwZ6NFS&si=GEGGhRQV4e5xzq1F","Funny Videos Playlist :)");
}
function comfortVids(){
  const comfortOptions = [
    "https://www.youtube.com/playlist?list=PL_ZYgX17ckBvm7Fnc-5l4QomlJhTj6I0e",
    "https://www.youtube.com/watch?v=c7Y5LRzupOs&list=PL70Zdw2KBCWPG1NKFSuaJ-Oq8yEJjyVvH",
    "https://www.youtube.com/playlist?list=PLP22qIfK2ZNTejNgKHU_P8dqdibjVyOdQ",
    "https://www.youtube.com/watch?v=YphH7FKzS_0&list=PLUda721G4NE_lDTD24pvVFnXjKQul2gzq",
    "https://www.youtube.com/playlist?list=PLUda721G4NE9Sm1xfRywy_UixWF3_YNFF"
  ];
  const comfortLabels = ["Sooty and Sweep Series 5",
                        "Sooty and Sweep Series 4",
                        "Sooty and Sweep Series 3",
                        "Sooty and Sweep Series 2",
                        "Sooty and Sweep Series 1"];
  let selection = floor(random(comfortOptions.length));
  makeLink(comfortOptions[selection],comfortLabels[selection]);
}
function suggestions(){
  const suggestionOptions = ["Have you used your nightie?",
                            "Have you gone for a walk in the fresh air?", 
                            "Have you called a friend or loved one?",
                            "Have you had something tasty to eat?",
                            "Have you made a plan for a fun day out soon?",
                            "Have you had some water?",
                            "Have you gone for a bike ride?",  
                            "Have you gone for a quiet drive?",  
                            "Have you thought of going to the beach?",  
                            "Have you listened to some happy music?",
                            "Have you had a cuddle of a person or teddy?",  
                            "Have you thought of five people who love you?",  
                            "Have you told three people you love them?",
                            "Have you done a little dance?",
                            "Have you gone for a nice relaxing bath?",  
                            "Have you gone for a nap?"
                            ];
  outputDOM.html(random(suggestionOptions));
};
function storyTime(){
  makeLink("https://drive.google.com/drive/folders/1Glp1UsMtwBeOO2J6dL39yCTNpXtopIn_?usp=drive_link",
    "Story Time Folder");
}


const wheelItems = ["The Babies!", "Wedding Day!", "Funny Videos!", "Comfort Videos!", "Suggestions!", "Story Time!"];

const wheelItemFunctions = [babies, wedding, funnyVids, comfortVids, suggestions, storyTime];

var wheelItemColours = null;

let wheelSize = 1;
let outputDOM = null;
const spinPeriod = 3000;
const spinNumber = 20;
let isSpinning = false;
let wasSpinning = false;
let wheelAngle = 0;
let wheelSpinStartAngle = 0;
let wheelSpinEndAngle = 0;
let wheelSpinStartTime = 0;
let wheelSpinEndTime = 0;

function setup() {
  createCanvas(windowWidth,windowHeight*0.9);
  ellipseMode(CENTER);
  // colorMode(HSB,TAU,100,100,100);
  textAlign(CENTER, CENTER);
  wheelSize = min(width,height)*0.45;
  textSize(wheelSize*0.1);
  outputDOM = select("#wheel_output");
  // outputDOM.html("empty");
  outputDOM.style("font-size:" + round(wheelSize*0.1) + "px")
  wheelItemColours = [color(236,47,47),
                          color(236,130,47),
                          color(137,236,47),
                          color(59,245,220),
                          color(97,119,251),
                          color(178,97,251)];
}

function draw() {
  background(251,233,97);
  stroke(0,0,0);
  fill(0,0,100);
  wasSpinning = isSpinning;
  isSpinning = millis() < wheelSpinEndTime;
  if(isSpinning){
    let t = (wheelSpinEndTime - millis())/(spinPeriod);
    let spinscale = (wheelSpinEndAngle - wheelSpinStartAngle)
    wheelAngle = -spinscale*t*t*t*t + wheelSpinEndAngle;
  } else if (wasSpinning) {
    wheelAngle = wheelAngle % TAU;
    let landedIndex = floor((wheelItems.length)*(1- wheelAngle / TAU));
    wheelItemFunctions[landedIndex]();
  }
  
  circle(width/2,height/2,2*wheelSize);
  for (let i = 0; i < wheelItems.length; i++) {
    drawWheelSegment(i);  
  }
  fill(0);
  noStroke();
  triangle(width/2 - 20,  height/2 - wheelSize - 10 ,
           width/2 + 20,  height/2 - wheelSize - 10,
           width/2,  height/2 - wheelSize + 10)
}

function mouseClicked(){
  relx = mouseX - width/2;
  rely = mouseY - height/2;
  if(relx*relx + rely*rely < wheelSize*wheelSize){
    randomSeed(millis());
    spinWheel();
  }
}

function touchEnded(){
  mouseClicked();
}

function spinWheel(){
  // wheelSpinStartAngle = wheelAngle;
  wheelSpinEndAngle = random(TAU) + TAU*spinNumber;
  wheelSpinStartTime = millis();
  wheelSpinEndTime = wheelSpinStartTime + spinPeriod;
}

function drawWheelSegment(wheelIndex) {
  sweep = TAU/(wheelItems.length);
  segmentColour = wheelItemColours[wheelIndex];
  fill(segmentColour);
  stroke(segmentColour);
  beginShape();
    vertex(width/2,height/2);
    for (let i = 0; i < 100; i++) {
      pointAngle = wheelAngle + wheelIndex*sweep + i* sweep/99 - PI/2;
      vertex(width/2 + wheelSize*cos(pointAngle),
             height/2 + wheelSize*sin(pointAngle));
    } 
    vertex(width/2,height/2);
  endShape();
  fill(0);
  noStroke();
  let textAngle = wheelAngle + wheelIndex*sweep + sweep/2 - PI/2
  translate(width/2 + 0.8*wheelSize*cos(textAngle),
           height/2 + 0.8*wheelSize*sin(textAngle));
  rotate(textAngle + PI/2);
  text(wheelItems[wheelIndex],0,0);
  resetMatrix();
}

