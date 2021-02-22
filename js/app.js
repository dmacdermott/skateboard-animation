const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = (trick) => {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.FromHexString("#00bbf9");

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/skateboard/",
    "scene.gltf"
  ).then(() => {
    const skateboard = scene.getMeshByName("__root__");
    skateboard.position.y = 0.5;
    skateboard.position.x = 3.5;
    skateboard.rotationQuaternion = null;
    const frameRate = 10;

    //Pop Animation
    let posY = new BABYLON.Animation(
      "posY",
      "position.y",
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    let keyFramesPy = [];

    keyFramesPy.push({
      frame: 0,
      value: 0,
    });
    keyFramesPy.push({
      frame: 1,
      value: 2.5,
    });

    keyFramesPy.push({
      frame: 5,
      value: 6,
    });
    keyFramesPy.push({
      frame: 7,
      value: 6,
    });

    keyFramesPy.push({
      frame: frameRate,
      value: 0.5,
    });
    keyFramesPy.push({
      frame: frameRate + 5,
      value: 0.5,
    });

    posY.setKeys(keyFramesPy);

    //Rotation Animation
    let rotX = new BABYLON.Animation(
      "rotX",
      "rotation.x",
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var keyFramesRx = [];

    keyFramesRx.push({
      frame: 0,
      value: 0,
    });

    keyFramesRx.push({
      frame: 2,
      value: 1,
    });

    keyFramesRx.push({
      frame: 5,
      value: -0.4,
    });

    keyFramesRx.push({
      frame: frameRate,
      value: 0,
    });
    keyFramesRx.push({
      frame: frameRate + 5,
      value: 0,
    });

    rotX.setKeys(keyFramesRx);

    const ollieAnimationGroup = new BABYLON.AnimationGroup("Ollie");
    ollieAnimationGroup.addTargetedAnimation(posY, skateboard);
    ollieAnimationGroup.addTargetedAnimation(rotX, skateboard);

    //KICKFLIP

    posY = new BABYLON.Animation(
      "posY",
      "position.y",
      10,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    keyFramesPy = [];

    keyFramesPy.push({
      frame: 0,
      value: 0,
    });
    keyFramesPy.push({
      frame: 1,
      value: 2.5,
    });

    keyFramesPy.push({
      frame: 5,
      value: 6,
    });
    keyFramesPy.push({
      frame: 7,
      value: 6,
    });

    keyFramesPy.push({
      frame: frameRate,
      value: 0.5,
    });
    keyFramesPy.push({
      frame: frameRate + 5,
      value: 0.5,
    });

    posY.setKeys(keyFramesPy);

    //Rotation Animation
    rotX = new BABYLON.Animation(
      "rotX",
      "rotation.x",
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    keyFramesRx = [];

    keyFramesRx.push({
      frame: 0,
      value: 0,
    });

    keyFramesRx.push({
      frame: 2,
      value: 1,
    });

    keyFramesRx.push({
      frame: 5,
      value: -0.4,
    });

    keyFramesRx.push({
      frame: frameRate,
      value: 0,
    });
    keyFramesRx.push({
      frame: frameRate + 5,
      value: 0,
    });

    rotX.setKeys(keyFramesRx);
    //Rotation Animation
    var rotZ = new BABYLON.Animation(
      "rotZ",
      "rotation.z",
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var keyFramesRz = [];

    keyFramesRz.push({
      frame: 0,
      value: 0,
    });
    keyFramesRz.push({
      frame: 1,
      value: 0,
    });

    keyFramesRz.push({
      frame: 3,
      value: 1,
    });

    keyFramesRz.push({
      frame: 6,
      value: 6.3,
    });

    keyFramesRz.push({
      frame: frameRate,
      value: 6.3,
    });
    keyFramesRz.push({
      frame: frameRate + 5,
      value: 6.3,
    });

    rotZ.setKeys(keyFramesRz);

    const kickflipAnimationGroup = new BABYLON.AnimationGroup("Kickflip");
    kickflipAnimationGroup.addTargetedAnimation(rotZ, skateboard);
    kickflipAnimationGroup.addTargetedAnimation(rotX, skateboard);
    kickflipAnimationGroup.addTargetedAnimation(posY, skateboard);

    // WHEEL MOVEMENT
    const wheelRB = scene.getMeshByName("wheel back right_0");
    const wheelLB = scene.getMeshByName("wheel back left_0");
    const wheelRF = scene.getMeshByName("wheel front right_0");
    const wheelLF = scene.getMeshByName("wheel front left_0");
    wheelRB.rotationQuaternion = null;
    wheelRF.rotationQuaternion = null;
    wheelLB.rotationQuaternion = null;
    wheelLF.rotationQuaternion = null;

    const animWheelLeft = new BABYLON.Animation(
      "wheelAnimation",
      "rotation.z",
      50,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const animWheelRight = new BABYLON.Animation(
      "wheelAnimation",
      "rotation.z",
      -50,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const wheelKeys = [];
    wheelKeys.push({
      frame: 0,
      value: 0,
    });
    wheelKeys.push({
      frame: 30,
      value: 2 * Math.PI,
    });

    animWheelLeft.setKeys(wheelKeys);
    animWheelRight.setKeys(wheelKeys);

    wheelRB.animations = [];
    wheelRB.animations.push(animWheelRight);
    wheelLB.animations = [];
    wheelLB.animations.push(animWheelLeft);
    wheelLF.animations = [];
    wheelLF.animations.push(animWheelLeft);
    wheelRF.animations = [];
    wheelRF.animations.push(animWheelRight);
    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);
    ollieAnimationGroup.play(false);

    let currentAnimation = ollieAnimationGroup;

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI"
    );

    var selectBox = new BABYLON.GUI.SelectionPanel("sp");
    selectBox.width = 0.25;
    selectBox.height = 0.48;
    selectBox.background = "#FFF";
    selectBox.headerColor = "#9b5de5";
    selectBox.buttonColor = "#9b5de5";
    selectBox.buttonBackground = "#FFF";

    selectBox.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    advancedTexture.addControl(selectBox);

    var trickGroup = new BABYLON.GUI.RadioGroup("Tricks");
    trickGroup.background = "red";
    trickGroup.addRadio(
      "Ollie",
      function () {
        currentAnimation.reset();
        currentAnimation.stop();
        currentAnimation = ollieAnimationGroup;
        ollieAnimationGroup.play(true);
      },
      true
    );
    trickGroup.addRadio("Kickflip", function () {
      currentAnimation.reset();

      currentAnimation.stop();
      currentAnimation = kickflipAnimationGroup;
      kickflipAnimationGroup.play(true);
    });

    //speed Slider
    // var rotateGroup = new BABYLON.GUI.SliderGroup("Rotation", "S");
    // rotateGroup.addSlider(
    //   "Angle",
    //   orientateY,
    //   "degs",
    //   0,
    //   2 * Math.PI,
    //   0,
    //   displayValue
    // );

    selectBox.addGroup(trickGroup);
    selectBox.addGroup(speedGroup);
  });

  //GROUND
  // const groundMat = new BABYLON.StandardMaterial("groundMat");
  // groundMat.diffuseColor = new BABYLON.Color3.FromHexString("#3d5a80");
  // const ground = BABYLON.MeshBuilder.CreateGround("ground", {
  //   width: 20,
  //   height: 20,
  // });
  // ground.material = groundMat;

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/road/",
    "CUPIC_ROAD.gltf"
  ).then(() => {
    const road = scene.getMeshByName("node-0");
    road.position.y = -1;
    road.scaling = new BABYLON.Vector3(0.1, 0.1, 0.075);
  });

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/trashcan/",
    "TrashCan_517.gltf"
  ).then(() => {
    const trashCan = scene.meshes[19];
    console.log(scene.meshes);
    trashCan.position.y = -1;
    trashCan.position.x = 3.5;
    trashCan.scaling = new BABYLON.Vector3(0.1, 0.14, 0.1);

    const trashAnimation = new BABYLON.Animation(
      "trashCanAnimation",
      "position.z",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const trashKeys = [];
    trashKeys.push({
      frame: 0,
      value: -33,
    });
    trashKeys.push({
      frame: 150,
      value: 33,
    });

    trashAnimation.setKeys(trashKeys);
    trashCan.animations = [];
    trashCan.animations.push(trashAnimation);
    scene.beginAnimation(trashCan, 0, 150, true);
  });

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/stopsign/",
    "1358 Stop Sign.gltf"
  ).then(() => {
    const stopSign = scene.meshes[21];
    console.log(scene.meshes);
    stopSign.rotationQuaternion = null;
    stopSign.position.y = -1;
    stopSign.position.x = 10;
    stopSign.rotation.y = -1.6;
    stopSign.scaling = new BABYLON.Vector3(0.075, 0.075, 0.075);

    scene.registerBeforeRender(function () {
      stopSign.position.z += 0.5;

      if (stopSign.position.z < 33 && stopSign.position.z > -33) {
        stopSign.visibility = 1;
      } else {
        stopSign.visibility = 0;
      }
      if (stopSign.position.z === 300) {
        stopSign.position.z = -40;
      }
    });

    // const stopSignAnimation = new BABYLON.Animation(
    //   "stopSignAnimation",
    //   "position.z",
    //   60,
    //   BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    //   BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
    // );
    const stopSignKeys = [];
    stopSignKeys.push({
      frame: 0,
      value: -33,
    });
    stopSignKeys.push({
      frame: 150,
      value: 33,
    });

    stopSignAnimation.setKeys(stopSignKeys);
    stopSign.animations = [];
    stopSign.animations.push(stopSignAnimation);

    scene.beginAnimation(stopSign, 0, 250, true);
  });

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
