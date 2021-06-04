var song="";
 leftWristX=0;
 leftWristY=0;
rightWristX=0;
righttWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

 function preload() {
     song=loadSound("music.mp3");
 }

 function setup() {
     canvas=createCanvas(500,500);
     canvas.center();

     video=createCapture(VIDEO);
     video.hide();
     posenet=ml5.poseNet(video,modelLoaded);
     posenet.on('pose',gotPoses);
 }

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
  }
  if(scoreRightWrist>0.2) {
      circle(rightWristX,rightWristY,20);

      if(rightWristY>0 && rightWristY<=100){
          song.rate(0.5);
          document.getElementById("speed").innerHTML="Speed = 0.5";
      }
      
      else if(rightWristY>100 && rightWristY<=200){
        song.rate(1);
        document.getElementById("speed").innerHTML="Speed = 1";
        
    }
    else if(rightWristY>200 && rightWristY<=300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML="Speed = 1.5";
    }
    else if(rightWristY>300 && rightWristY<=400){
        song.rate(2);
        document.getElementById("speed").innerHTML="Speed = 2";
    }

    else if(rightWristY>400 && rightWristY<=500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML="Speed = 2.5";
    }

  }
     

 }

 function modelLoaded() {
     console.log("Posenet is loaded etc");
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
 }

 }
function playsong() {
     song.play();
    song.setVolume(1);
    song.rate(1);
 }