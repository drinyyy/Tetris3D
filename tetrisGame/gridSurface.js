import * as BABYLON from '@babylonjs/core';

export function createGroundWithGrid(scene, box) {


    const ground = BABYLON.MeshBuilder.CreateGround("ground",{ width: 20, height: 20 },scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, { mass: 0 }, scene);

    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);

// Register a function to be called before each render
scene.registerBeforeRender(function () {
    // Check if the box is colliding with the ground
    if (box.intersectsMesh(ground, true)) {
        // Set the box's position to be exactly on the ground
        box.position.y = ground.position.y + 0.50; // Adjust the value as needed
    }
    });
    
    var material = new BABYLON.StandardMaterial("groundMaterial", scene);
    ground.material = material;

    
    var gridTexture = new BABYLON.Texture("path", scene);
    material.diffuseTexture = gridTexture;
    material.specularColor = new BABYLON.Color3(0, 0, 0);

    ground.position.y = -0.5;

    var collided = true;
    scene.registerBeforeRender(function () {
        if (box.intersectsMesh(ground, false)) {
            box.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
            collided = false;
        } else {
            box.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
            collided = true;
        }
    });

    scene.onKeyboardObservable.add(function (kbInfo) {
        if (collided && kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
            switch (kbInfo.event.key) {
                case "a":
                    box.position.x -= 1;
                    break;
                case "d":
                    box.position.x += 1;
                    break;
                case "w":
                    box.position.z += 1;
                    break;
                case "s":
                    box.position.z -= 1;
                    break;
                case " ":
                    box.position.y -= 1;
                    break;
            }
        }
    });
}
