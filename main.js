sound = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

song1status = "";
song2status = "";

song1 = "";
song2 = "";

rightWristX = "";
rightWristY = "";

leftWristX = "";
leftWristY = "";

function preload() {
    sound1 = loadSound("song1.mp3");
    sound2 = loadSound("song2.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_status = sound1.isPlaying();
    song2_status = sound2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");
    
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        sound2.stop();
        if (song1_status == false) {
            sound1.play();
            document.getElementById("song").innerHTML = "Playing - When You Wish Upon A Star"
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        sound1.stop();
        if (song2_status == false) {
            sound2.play();
            document.getElementById("song").innerHTML = "Playing - Beauty and the Beast"
        }
    }
}

function playButton() {
    sound1.play();
    sound1.setVolume(1);
    sound1.rate(1);
    sound2.play();
    sound2.setVolume(1);
    sound2.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}

function modelLoaded() {
    console.log("Model has loaded!");
}