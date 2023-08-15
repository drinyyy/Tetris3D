import { TetrominoShapes } from './shapes'; 
import * as BABYLON from '@babylonjs/core';

export const createTetrisBlock = function (scene, shapeIndex) {
  const selectedShape = TetrominoShapes[shapeIndex];

  const parentBlock = new BABYLON.Mesh("parentBlock", scene);

  for (const [x, z] of selectedShape.coordinates) {
    const block = BABYLON.MeshBuilder.CreateBox('block', { size: 1 }, scene);
    block.position.x = x;
    block.position.z = z;
    block.parent = parentBlock;

    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = BABYLON.Color3.FromHexString(selectedShape.color);
    block.material = material;
  }

  // Pika Fillestare Kubeve
  parentBlock.position.y = 20;

  
  const blockPhysicsImpostor = new BABYLON.PhysicsImpostor(parentBlock, BABYLON.PhysicsImpostor.BoxImpostor, {
    mass: 0.1,
    
  }, scene);

  return parentBlock;
};

export const handleBlockMovement = function (scene, cubes) {
    const moveSpeed = 0.1; 
    const fallSpeed = 0.1; 
    const maxMovementRange = 7; 
    
    let framesSinceLastFall = 0;
    const fallFrameInterval = 10; // Renja gjdo 10 frames
  
    let moveDirectionX = 0; // -1 per majtas, 1 per djathtas
    let moveDirectionZ = 0; // -1 for backward, 1 for forward
    
    

    // Register keydown events
    window.addEventListener('keydown', (event) => {
      if (event.key === 'a' && cubes[0].position.x > -maxMovementRange) {
        moveDirectionX = -1;
      } else if (event.key === 'd' && cubes[0].position.x < maxMovementRange) {
        moveDirectionX = 1;
      } else if (event.key === 'w' && cubes[0].position.z < maxMovementRange) {
        moveDirectionZ = 1;
      } else if (event.key === 's' && cubes[0].position.z > -maxMovementRange) {
        moveDirectionZ = -1;
      }
    });
  
    
    window.addEventListener('keyup', (event) => {
      if (event.key === 'a' || event.key === 'd') {
        moveDirectionX = 0;
      }
      if (event.key === 'w' || event.key === 's') {
        moveDirectionZ = 0;
      }
    });
  
    
    scene.registerBeforeRender(() => {
      framesSinceLastFall++;
  
      if (framesSinceLastFall >= fallFrameInterval) {
        cubes.forEach(cube => {
          cube.position.y -= fallSpeed; 
        });
        framesSinceLastFall = 0;
      }
  
      cubes.forEach(cube => {
        const newX = cube.position.x + moveDirectionX * moveSpeed;
        const newZ = cube.position.z + moveDirectionZ * moveSpeed;
  
        
        if (newX <= maxMovementRange && newX >= -maxMovementRange) {
          cube.position.x = newX;
        }
        if (newZ <= maxMovementRange && newZ >= -maxMovementRange) {
          cube.position.z = newZ;
        }
      });
    });
  };
  
  
  
  
  
  
  