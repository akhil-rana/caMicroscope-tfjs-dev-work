import { MnistData } from "./data.js";
var canvas, ctx, saveButton;
var pos = { x: 0, y: 0 };
var rawImage;
var model;

function getModel(Layers, Params) {
  try {
    model = tf.sequential({
      layers: Layers
    });
  } catch (error) {
    alert(error);
    $("#loading").css("display", "none");
  }

  try {
    model.compile({
      optimizer: Params.optimizer,
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"]
    });
  } catch (error) {}

  return model;
}

async function train(model, data, Params) {
  let metrics = ["loss", "val_loss", "acc", "val_acc"];
  let container = { name: "Model Training", styles: { height: "1000px" } };
  let fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
  tfvis.visor().setActiveTab("Visor");
  // const BATCH_SIZE = 512;
  const TRAIN_DATA_SIZE = 1300;
  const TEST_DATA_SIZE = 190;

  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [d.xs.reshape([TRAIN_DATA_SIZE, 60, 60, 1]), d.labels];
  });

  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [d.xs.reshape([TEST_DATA_SIZE, 60, 60, 1]), d.labels];
  });

  return model.fit(trainXs, trainYs, {
    batchSize: Number(Params.batchSize),
    validationData: [testXs, testYs],
    epochs: Number(Params.epochs),
    shuffle: Params.shuffle,
    callbacks: fitCallbacks
  });
}

function setPosition(e) {
  var element = document.getElementById("canvas");
  var clientRect = element.getBoundingClientRect();

  pos.x = e.clientX - clientRect.left;
  pos.y = e.clientY - clientRect.top;
}

function draw(e) {
  if (e.buttons != 1) return;
  ctx.beginPath();
  ctx.lineWidth = 24;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";
  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  rawImage.src = canvas.toDataURL("image/png");
}

export function save(rawImage1) {
  // var canvas1 = document.getElementById("canvas");
  // var rawImage1 = document.getElementById("canvasimg");
  // rawImage1.src = canvas.toDataURL("image/png");
  try {
    var raw = tf.browser.fromPixels(rawImage1, 1);
    var resized = tf.image.resizeBilinear(raw, [60, 60]);
    var tensor = resized.expandDims(0);
    var prediction = model.predict(tensor);
    var pIndex = tf.argMax(prediction, 1).dataSync();
    // prediction.print();
    if (pIndex == 0) alert("Triangle");
    if (pIndex == 1) alert("Square");
    if (pIndex == 2) alert("Circle");
    if (pIndex == 3) alert("Star");
  } catch (error) {
    // alert(error);
  }
}

function init() {
  canvas = document.getElementById("canvas");
  rawImage = document.getElementById("canvasimg");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 300, 300);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mousedown", setPosition);
  canvas.addEventListener("mouseenter", setPosition);
  saveButton = document.getElementById("sb");
  // saveButton.addEventListener("click", save);
}

export async function run(Layers, Params) {
  try {
    const data = new MnistData();
    await data.load();
    $("#loadText").text("Training model...");
    const model = getModel(Layers, Params);
    tfvis.show.modelSummary({ name: "Model Architecture" }, model);
    await train(model, data, Params);
    init();
    alert("Training is done, try classifying your drawing!");
    $(".drawing").css("display", "block");
    $("#loading").css("display", "none");
  } catch (error) {
    alert(error);
    $("#loading").css("display", "none");
  }
}

// document.addEventListener("DOMContentLoaded", run);
