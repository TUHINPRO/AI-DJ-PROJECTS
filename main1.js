song="";
 leftWristX=0;
 leftWristY=0;
rightWristX=0;
righttWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

 function preload() {
 song=loadSound("music.mp3");
 song1=loadSound("music2.mp3");
 }

 function setup() {
     canvas=createCanvas(500,500);
     canvas.center();

     video=createCapture(VIDEO);
     video.hide();
     posenet=ml5.poseNet(video,modelLoaded);
     posenet.on('pose',gotPoses);
 }

 function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
    }}

 function draw() {
     image(video,0,0,500,500);

     fill("#FF0000");
     stroke("#FF0000");
  if(scoreLeftWrist>0.2) {
      circle(leftWristX,leftWristY,20);
      NumberLeftWristX=Number(leftWristY);
      remove_decimals=floor(NumberLeftWristX);
      volume=remove_decimals/500;
      document.getElementById("volume").innerHTML= "Volume = "+ volume;
      song.setVolume(volume);
      song1.setVolume(0);
  }
  if(scoreRightWrist>0.2) {
      circle(rightWristX,rightWristY,20);
      NumberRightWristX=Number(rightWristY);
      remove_decimals=floor(NumberRightWristX);
      volume=remove_decimals/500;
      document.getElementById("volume").innerHTML= "Volume = "+ volume;
      song.setVolume(0);
      song1.setVolume(volume);

  }
     

 }

 function modelLoaded() {
     console.log("Posenet is loaded etc");
 }

 

 
function playsong() {
     song.play();
     song1.play();
     song1.setVolume(0);
    song.setVolume(1);
    song.rate(1);
    song1.rate(1);
 }