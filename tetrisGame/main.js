import './style.css';
import * as BABYLON from '@babylonjs/core';
import { createGroundWithGrid } from './gridSurface.js';


const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  scene.enablePhysics();

var box = BABYLON.MeshBuilder.CreateBox("box", { size: 1.1 }, scene);
var mat = new BABYLON.StandardMaterial("boxMat", scene);
box.material = mat;
box.position = new BABYLON.Vector3(0, 20, 0);

box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);



createGroundWithGrid(scene, box);





var frameCount = 0;


scene.registerBeforeRender(function () {
    
    
    
    if (frameCount % 50 === 0) {
        box.position.y -= 1;
    }
    
    frameCount++;
});


  const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, new BABYLON.Vector3(0, 25, 35), scene);
  camera.inputs.attached["mousewheel"].wheelPrecision = 2;


  const targetPosition = new BABYLON.Vector3(0, 10, 0);
  camera.setTarget(targetPosition);

  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight();
  light.intensity = 0.5;



  return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
  
});

window.addEventListener('resize', function () {
  engine.resize();
});



