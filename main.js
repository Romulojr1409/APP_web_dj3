song="";
LeftWristX= 0
LeftWristY = 0
RightWristX = 0
RightWristY = 0
scoreRightWrist = 0
scoreLeftWrist = 0
function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLooad);
    poseNet.on('pose', gotPoses);
}

function modelLooad(){
    console.log('Pose Net foi inicializado')
}

function gotPoses(results){
    if(results.length>0){
        scoreRightWrist=results[0].pose.Keypoints[10].score;
        scoreLeftWrist=results[0].pose.Keypoints[9].score;
        console.log(results);
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("")

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        
        
    }
}

function draw() {
    image(video,0,0,600,500);
    fill("#FF0000");
    strocke("#FF0000");
    
    if(scoreRightWrist > 0.2){
        circle(RightWristX,RightWristY,20);

        if(RightWristX >0  &&  RightWristY <=100){
        document.getElementById("speed").innerHTML = " veloccidade igual a 0.5";
        song.rate(0.5);
                        }

        else if(RightWristX >100  &&  RightWristY <=200){
            document.getElementById("speed").innerHTML = " veloccidade igual a 1x";
            song.rate(1);
        }

        else if(RightWristX >200  &&  RightWristY <=300){
            document.getElementById("speed").innerHTML = " veloccidade igual a 1.5x";
            song.rate(1.5);
        }
        else if(RightWristX >300  &&  RightWristY <=900){
            document.getElementById("speed").innerHTML = " veloccidade igual a 2x";
            song.rate(2);
        }
        else if(RightWristY >400){
            document.getElementById("speed").innerHTML = " veloccidade igual a 2.5x";
            song.rate(2.5);
        }

        }
       // if(scoreLeftWrist>0.2){

       // }
    }



function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}


 
