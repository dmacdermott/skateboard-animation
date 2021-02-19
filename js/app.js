const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
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

  //   const skateboard = BABYLON.SceneLoader.Append(
  //     "./assets/",
  //     "scene.gltf",
  //     scene,
  //     function (scene) {
  //       scene.createDefaultCameraOrLight(true, true, true);
  //     }
  //   );

  //   scene.registerBeforeRender(function () {
  //     let mesh = scene.getMeshByName("__root__");
  //     if (mesh) {
  //       mesh.rotationQuaternion = null;
  //       //   mesh.rotation.z += 0.005;
  //       mesh.position.y = 0.5;
  //     }
  //   });

  BABYLON.SceneLoader.ImportMeshAsync("", "./assets/", "scene.gltf").then(
    () => {
      const skateboard = scene.getMeshByName("__root__");
      skateboard.position.y = 0.5;
      skateboard.rotationQuaternion = null;
      const frameRate = 10;
      const posY = new BABYLON.Animation(
        "posY",
        "position.y",
        frameRate,
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

      //   skateboard.animations.push(xSlide);
      scene.beginDirectAnimation(
        skateboard,
        [posY, rotX],
        0,
        2 * frameRate,
        true
      );

      //   const animSkateboard = new BABYLON.Animation(
      //     "skateboardAnimation",
      //     "position.z",
      //     30,
      //     BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      //     BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      //   );
      //   const skateboardKeys = [];

      //   skateboardKeys.push({
      //     frame: 0,
      //     value: -8,
      //   });

      //   skateboardKeys.push({
      //     frame: 1000,
      //     value: 8,
      //   });

      //   animSkateboard.setKeys(skateboardKeys);

      //   skateboard.animations = [];
      //   skateboard.animations.push(animSkateboard);
      //   scene.beginAnimation(skateboard, 0, 1000, true);
    }
  );

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 20,
    height: 20,
  });

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
