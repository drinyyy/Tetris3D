import './style.css';
import * as BABYLON from '@babylonjs/core';
import { createTetrisBlock, handleBlockMovement } from './tetris';
import { TetrominoShapes } from './shapes'; // Import TetrominoShapes
import { GameBoard } from './gameBoard.js';

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  scene.enablePhysics();

  const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
  scene.getPhysicsEngine().setGravity(gravityVector);

  const ground = BABYLON.MeshBuilder.CreateGround("ground", scene);
  ground.scaling.x=15;
  ground.scaling.z=15;
  ground.position.y = 0;
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, { mass: 0 }, scene);

  const shapeIndex = Math.floor(Math.random() * TetrominoShapes.length);
  const tetrisBlock = createTetrisBlock(scene, shapeIndex);
 
  handleBlockMovement(scene, [tetrisBlock]);

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

// GameBoard
const rows = 20;
const columns = 10;
const gameBoard = new GameBoard(rows, columns);




gameBoard.occupyCell(5, 3); 

gameBoard.clearCell(5, 3); 

