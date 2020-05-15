import ml5 from 'ml5';

let canvas;
let video;
let poseNetModel;
let pose;
let skeleton;

function modelLoaded() {
  console.log('poseNet ready');
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

export default function poseSketch(p) {
  p.setup = () => {
    canvas = p.createCanvas(640, 480);
    video = p.createCapture(p.VIDEO);
    video.hide();
    poseNetModel = ml5.poseNet(video, modelLoaded);
    poseNetModel.on('pose', gotPoses);
  };

  p.draw = () => {
    if (canvas) {
      p.image(video, 0, 0);
      if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        p.fill(255, 0, 0);
        p.ellipse(pose.nose.x, pose.nose.y, d);
        p.fill(0, 0, 255);
        p.ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
        p.ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

        for (let i = 0; i < pose.keypoints.length; i++) {
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          p.fill(0, 255, 0);
          p.ellipse(x, y, 16, 16);
        }

        for (let i = 0; i < skeleton.length; i++) {
          let a = skeleton[i][0];
          let b = skeleton[i][1];
          p.strokeWeight(2);
          p.stroke(255);
          p.line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
      }
    }
  };
}
