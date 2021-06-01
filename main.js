var song="";
 leftWristX=0;
 leftWristY=0;
rightWristX=0;
righttWristY=0;
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
}

}
function playsong() {
    song.play();
   song.setVolume(1);
   song.rate(1);
}
