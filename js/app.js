const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = (trick) => {
  const scene = new BABYLON.Scene(engine);

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
    skateboard.rotationQuaternion = null;
    const frameRate = 10;
    //   const posY = new BABYLON.Animation(
    //     "posY",
    //     "position.y",
    //     frameRate,
    //     BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    //     BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    //   );
    //   const keyFramesPy = [];

    //   keyFramesPy.push({
    //     frame: 0,
    //     value: 0,
    //   });
    //   keyFramesPy.push({
    //     frame: 1,
    //     value: 2.5,
    //   });

    //   keyFramesPy.push({
    //     frame: 5,
    //     value: 6,
    //   });
    //   keyFramesPy.push({
    //     frame: 7,
    //     value: 6,
    //   });

    //   keyFramesPy.push({
    //     frame: frameRate,
    //     value: 0.5,
    //   });
    //   keyFramesPy.push({
    //     frame: frameRate + 5,
    //     value: 0.5,
    //   });

    //   posY.setKeys(keyFramesPy);

    //   //Rotation Animation
    //   var rotX = new BABYLON.Animation(
    //     "rotX",
    //     "rotation.x",
    //     frameRate,
    //     BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    //     BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    //   );

    //   var keyFramesRx = [];

    //   keyFramesRx.push({
    //     frame: 0,
    //     value: 0,
    //   });

    //   keyFramesRx.push({
    //     frame: 2,
    //     value: 1,
    //   });

    //   keyFramesRx.push({
    //     frame: 5,
    //     value: -0.4,
    //   });

    //   keyFramesRx.push({
    //     frame: frameRate,
    //     value: 0,
    //   });
    //   keyFramesRx.push({
    //     frame: frameRate + 5,
    //     value: 0,
    //   });

    //   rotX.setKeys(keyFramesRx);

    //   skateboard.animations.push(xSlide);

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
    scene.beginDirectAnimation(skateboard, kickflip(), 0, 2 * frameRate, true);
  });

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/road/",
    "CUPIC_ROAD.gltf"
  ).then((mesh) => {
    const road = scene.getMeshByName("node-0");
    road.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
    road.position.y = -1;
  });

  //GROUND
  //   const groundMat = new BABYLON.StandardMaterial("groundMat");
  //   groundMat.diffuseColor = new BABYLON.Color3(0.13, 0.13, 0.13);
  //   const ground = BABYLON.MeshBuilder.CreateGround("ground", {
  //     width: 20,
  //     height: 20,
  //   });
  //   ground.material = groundMat;

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

const ollie = () => {
  const frameRate = 10;
  const posY = new BABYLON.Animation(
    "posY",
    "position.y",
    10,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  const keyFramesPy = [];

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
  var rotX = new BABYLON.Animation(
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

  return [rotX, posY];
};
const kickflip = () => {
  const frameRate = 10;
  const posY = new BABYLON.Animation(
    "posY",
    "position.y",
    10,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  const keyFramesPy = [];

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
  var rotX = new BABYLON.Animation(
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

  return [rotZ, rotX, posY];
};
