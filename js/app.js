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

  BABYLON.SceneLoader.ImportMeshAsync("", "./assets/", "scene.gltf").then(
    () => {
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
      scene.beginDirectAnimation(skateboard, ollie(), 0, 2 * frameRate, true);
    }
  );
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0.13, 0.13, 0.13);
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 20,
    height: 20,
  });

  ground.material = groundMat;

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
