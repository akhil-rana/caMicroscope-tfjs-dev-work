import { run as shapeRun, save as save1 } from "./shape-recog/script.js";
import { run as digitRun, save as save2 } from "./digit-recog/script.js";

var canvas1, rawImage1;
$(document).ready(function() {
  $("#inputShape").val("(60,60,1)");
  $("#modelSelect").val(1);
  $("#optimizer").val(0);
  $("#batchSize").val("512");
  $("#epochs").val("20");
});

$("#resetLayers").click(function() {
  // $("#inputShape").val("(60,60,1)");
  // $("#modelSelect").val(1);
  $("#optimizer").val(0);
  $("#batchSize").val("512");
  $("#epochs").val("20");
  $(".add").each(function() {
    if (
      $(this)
        .next()
        .attr("id") != "outputLayer"
    ) {
      $(this)
        .next()
        .remove();
    }
  });
  $(".add").each(function() {
    if ($(this).attr("id") != "add1") {
      $(this).remove();
    }
  });
});

$("#train").click(function() {
  let selectedValue = $("#modelSelect").val();
  $("#loading").css("display", "flex");
  try {
    if (selectedValue == 1) {
      shapeRun(optimalLayers, optimalParams);
      $(".drawing").css("display", "none");
      $("#canvas").attr("width", "300px");
      $("#canvas").attr("height", "300px");
    } else if (selectedValue == 2) {
      $(".drawing").css("display", "none");
      $("#canvas").attr("width", "280px");
      $("#canvas").attr("height", "280px");
      digitRun(optimalLayers1, optimalParams);
    }
  } catch (error) {
    $("#loading").css("display", "none");
    alert(error);
  }
});
$("#userTrain").click(function() {
  $("#loading").css("display", "flex");
  let selectedValue = $("#modelSelect").val();
  Params.epochs = $("#epochs").val();
  Params.batchSize = $("#batchSize").val();
  // console.log($("#batchSize").val());
  try {
    if (selectedValue == 1) {
      shapeRun(Layers, Params);
      $(".drawing").css("display", "none");
      $("#canvas").attr("width", "300px");
      $("#canvas").attr("height", "300px");
    } else if (selectedValue == 2) {
      $(".drawing").css("display", "none");
      $("#canvas").attr("width", "280px");
      $("#canvas").attr("height", "280px");
      digitRun(Layers1, Params);
    }
  } catch (error) {
    $("#loading").css("display", "none");
    alert(error);
  }
});
$("#modelSelect").change(function() {
  let selectedValue = $("#modelSelect").val();
  if (selectedValue == 2) {
    $("#inputShape").val("(28,28,1)");
    $("#outputLayer")
      .find("#units")
      .first()
      .val("10");
    $("#inputLayer")
      .find("#kernelSize")
      .first()
      .val("3");
  } else if (selectedValue == 1) {
    $("#inputShape").val("(60,60,1)");
    $("#outputLayer")
      .find("#units")
      .first()
      .val("4");
    $("#inputLayer")
      .find("#kernelSize")
      .first()
      .val("4");
  }
});
let layerNumber = 1;

$("#add" + 1).click(function() {
  let newLayerCard =
    " <div class='card LayerCard' id='Layer" +
    layerNumber +
    "'><!-- Card header --><div class='card-header' role='tab' id='headingOne" +
    (layerNumber + 1) +
    "'><a  class='collapsed'  data-toggle='collapse'    data-parent='#accordionEx'    href='#collapseOne" +
    (layerNumber + 1) +
    "'    aria-expanded='false'    aria-controls='collapseOne" +
    (layerNumber + 1) +
    "'  >    <h5 class='mb-0'> Layer #" +
    layerNumber +
    "<i        class='fas fa-angle-down rotate-icon'        style='position: absolute; right:0.8em'      ></i>    </h5>  </a></div><!-- Card body --><div  id='collapseOne" +
    (layerNumber + 1) +
    "'  class='collapse'  role='tabpanel'  aria-labelledby='headingOne" +
    (layerNumber + 1) +
    "'  data-parent='#accordionEx'>  <div class='card-body'>" +
    " <div  style='display: flex; flex-wrap:wrap; align-content:center; max-width: 21em'>  <select    class='browser-default custom-select'    id='modelClassSelect'    style='width: 9em; margin:0 auto; margin-bottom: 2em '  >    <option value='1' selected>Dense</option>    <option value='2'>Conv2D </option>    <option value='3'>Flatten</option>    <option value='4'>Dropout</option>    <option value='5'>MaxPooling2D</option> </select  >&nbsp;&nbsp; &nbsp;&nbsp;  <div    class='md-form'    style='margin: 0 auto; width: 9em; display:none'  >    <input      type='text'      id='inputShape'      class='form-control'      disabled          />    <label for='inputShape'>inputShape:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 7em; display:none'  >    <input      type='number'      id='kernelSize'      class='form-control'         />    <label for='kernelSize'>kernelSize:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 5em; display:none'  >    <input      type='number'      id='filters'      class='form-control'          />    <label for='filters'>filters:</label>  </div>  <div class='md-form' style='margin: 0 auto; width: 8em; '>    <input      type='text'      id='activation'      class='form-control'          />    <label for='activation'>activation:</label>  </div>  <div class='md-form' style='margin: 0 auto; width: 6em;'>    <input      type='number'      id='units'      class='form-control'         />    <label for='units'>units:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 6em; display:none'  >    <input      type='number'      id='pool_size'      class='form-control'          />    <label for='pool_size'>pool_size:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 6em; display:none'  >    <input      type='number'      max='1'      min='0'      step='0.01'      id='rate'      class='form-control'    />    <label for='rate'>rate:</label>  </div></div><br /><div  style='display: flex; flex-wrap:wrap; align-content:center; max-width: 21em'>  <button    type='button'    class='btn btn-danger '    style='margin: 0 auto; ' id='deleteLayer' >    Delete  </button>  </div>" +
    "</div></div></div><div class='card add' id='add" +
    (layerNumber + 1) +
    "' style='width: 25em; height: 2em'><h4>+</h4></div>";

  $("#add" + 1).after(newLayerCard);
  $("#headingOne" + (layerNumber + 1)).css("height", "0");
  $("#headingOne" + (layerNumber + 1))
    .after()
    .animate({ height: "3em" }, 400);
  layerNumber++;
  let j = 1;
  $(".layersClass")
    .children(".card")
    .each(function() {
      // console.log($(this).html());
      if (
        $(this).attr("id") != "inputLayer" &&
        $(this).attr("id") != "outputLayer"
      ) {
        $(this)
          .first()
          .children()
          .first()
          .children()
          .first()
          .children()
          .first()
          .each(function() {
            $(this).html(
              "Layer #" +
                j +
                "<i class='fas fa-angle-down rotate-icon' style='position: absolute; right:0.8em'></i>"
            );
            j++;
            // console.log($(this).html());
          });
      }
    });
  addFuncLayers();

  addCardLayer();
});
function addCardLayer() {
  let i = layerNumber;
  $("#add" + layerNumber).click(function() {
    let newLayerCard =
      " <div class='card LayerCard' id='Layer" +
      layerNumber +
      "'><!-- Card header --><div class='card-header' role='tab' id='headingOne" +
      (layerNumber + 1) +
      "'><a    data-toggle='collapse'    data-parent='#accordionEx'    href='#collapseOne" +
      (layerNumber + 1) +
      "'    aria-expanded='false'    aria-controls='collapseOne" +
      (layerNumber + 1) +
      "'  >    <h5 class='mb-0'> Layer #" +
      layerNumber +
      "<i        class='fas fa-angle-down rotate-icon'        style='position: absolute; right:0.8em'      ></i>    </h5>  </a></div><!-- Card body --><div  id='collapseOne" +
      (layerNumber + 1) +
      "'  class='collapse'  role='tabpanel'  aria-labelledby='headingOne" +
      (layerNumber + 1) +
      "'  data-parent='#accordionEx'>  <div class='card-body'>" +
      " <div  style='display: flex; flex-wrap:wrap; align-content:center; max-width: 21em'>  <select    class='browser-default custom-select'    id='modelClassSelect'    style='width: 9em; margin:0 auto; margin-bottom: 2em '  >    <option value='1' selected>Dense</option>    <option value='2'>Conv2D </option>    <option value='3'>Flatten</option>    <option value='4'>Dropout</option>    <option value='5'>MaxPooling2D</option> </select  >&nbsp;&nbsp; &nbsp;&nbsp;  <div    class='md-form'    style='margin: 0 auto; width: 9em; display:none'  >    <input      type='text'      id='inputShape'      class='form-control'      disabled          />    <label for='inputShape'>inputShape:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 7em; display:none'  >    <input      type='number'      id='kernelSize'      class='form-control'         />    <label for='kernelSize'>kernelSize:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 5em; display:none'  >    <input      type='number'      id='filters'      class='form-control'          />    <label for='filters'>filters:</label>  </div>  <div class='md-form' style='margin: 0 auto; width: 8em; '>    <input      type='text'      id='activation'      class='form-control'          />    <label for='activation'>activation:</label>  </div>  <div class='md-form' style='margin: 0 auto; width: 6em;'>    <input      type='number'      id='units'      class='form-control'         />    <label for='units'>units:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 6em; display:none'  >    <input      type='number'      id='pool_size'      class='form-control'          />    <label for='pool_size'>pool_size:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 6em; display:none'  >    <input      type='number'      max='1'      min='0'      step='0.01'      id='rate'      class='form-control'    />    <label for='rate'>rate:</label>  </div></div><br /><div  style='display: flex; flex-wrap:wrap; align-content:center; max-width: 21em'>  <button    type='button'    class='btn btn-danger '    style='margin: 0 auto; ' id='deleteLayer' >    Delete  </button>  </div>" +
      "</div></div></div><div class='card add' id='add" +
      (layerNumber + 1) +
      "' style='width: 25em; height: 2em'><h4>+</h4></div>";

    $("#add" + i).after(newLayerCard);
    $("#headingOne" + (layerNumber + 1)).css("height", "0");
    $("#headingOne" + (layerNumber + 1))
      .after()
      .animate({ height: "3em" }, 400);
    layerNumber++;
    renameCorrectLayers();
    addCardLayer();
  });

  function renameCorrectLayers() {
    let j = 1;
    $(".layersClass")
      .children(".card")
      .each(function() {
        // console.log($(this).html());
        if (
          $(this).attr("id") != "inputLayer" &&
          $(this).attr("id") != "outputLayer"
        ) {
          $(this)
            .first()
            .children()
            .first()
            .children()
            .first()
            .children()
            .first()
            .each(function() {
              $(this).html(
                "Layer #" +
                  j +
                  "<i class='fas fa-angle-down rotate-icon' style='position: absolute; right:0.8em'></i>"
              );
              j++;
              // console.log($(this).html());
            });
        }
      });
    addFuncLayers();
  }
}
function addFuncLayers() {
  $(".LayerCard").each(function() {
    let id = $(this).attr("id");
    // console.log(id);
    $("#" + id)
      .find("#modelClassSelect")
      .first()
      .change(function() {
        // console.log(1);
        if ($(this).val() == 1) {
          $("#" + id)
            .find("#inputShape")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#kernelSize")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#filters")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#activation")
            .parent()
            .css("display", "block");
          $("#" + id)
            .find("#units")
            .parent()
            .css("display", "block");
          $("#" + id)
            .find("#pool_size")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#rate")
            .parent()
            .css("display", "none");
        } else if ($(this).val() == 2) {
          $("#" + id)
            .find("#inputShape")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#kernelSize")
            .parent()
            .css("display", "block");
          $("#" + id)
            .find("#filters")
            .parent()
            .css("display", "block");
          $("#" + id)
            .find("#activation")
            .parent()
            .css("display", "block");
          $("#" + id)
            .find("#units")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#pool_size")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#rate")
            .parent()
            .css("display", "none");
        } else if ($(this).val() == 3) {
          $("#" + id)
            .find("#inputShape")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#kernelSize")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#filters")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#activation")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#units")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#pool_size")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#rate")
            .parent()
            .css("display", "none");
        } else if ($(this).val() == 4) {
          $("#" + id)
            .find("#inputShape")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#kernelSize")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#filters")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#activation")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#units")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#pool_size")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#rate")
            .parent()
            .css("display", "block");
        } else {
          $("#" + id)
            .find("#inputShape")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#kernelSize")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#filters")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#activation")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#units")
            .parent()
            .css("display", "none");
          $("#" + id)
            .find("#pool_size")
            .parent()
            .css("display", "block");
          $("#" + id)
            .find("#rate")
            .parent()
            .css("display", "none");
        }
      });
    $("#" + id)
      .find("#deleteLayer")
      .first()
      .click(function() {
        $("#" + id)
          .next()
          .remove();

        $("#" + id).remove();
        let j = 1;
        $(".layersClass")
          .children(".card")
          .each(function() {
            // console.log($(this).html());
            if (
              $(this).attr("id") != "inputLayer" &&
              $(this).attr("id") != "outputLayer"
            ) {
              $(this)
                .first()
                .children()
                .first()
                .children()
                .first()
                .children()
                .first()
                .each(function() {
                  $(this).html(
                    "Layer #" +
                      j +
                      "<i class='fas fa-angle-down rotate-icon' style='position: absolute; right:0.8em'></i>"
                  );
                  j++;
                  // console.log($(this).html());
                });
            }
          });
      });
  });
}
let optimalLayers = [
  tf.layers.conv2d({
    inputShape: [60, 60, 1],
    kernelSize: 4,
    filters: 8,
    activation: "relu"
  }),
  tf.layers.maxPooling2d({ poolSize: [2, 2] }),
  tf.layers.maxPooling2d({ poolSize: [2, 2] }),
  tf.layers.flatten(),
  tf.layers.dense({ units: 64, activation: "relu" }),
  tf.layers.dense({ units: 4, activation: "softmax" })
];
let Layers = [
  tf.layers.conv2d({
    inputShape: [60, 60, 1],
    kernelSize: 4,
    filters: 8,
    activation: "relu"
  }),
  tf.layers.dense({ units: 4, activation: "softmax" })
];
let Layers1 = [
  tf.layers.conv2d({
    inputShape: [28, 28, 1],
    kernelSize: 3,
    filters: 8,
    activation: "relu"
  }),
  tf.layers.dense({ units: 10, activation: "softmax" })
];
$("#saveLayers").click(function() {
  Layers = [
    tf.layers.conv2d({
      inputShape: [60, 60, 1],
      kernelSize: 4,
      filters: 8,
      activation: "relu"
    }),
    tf.layers.dense({ units: 4, activation: "softmax" })
  ];
  $(".LayerCard").each(function() {
    let id = $(this).attr("id");
    let i = 1;
    let select = $("#" + id)
      .find("select option:selected")
      .first()
      .text();
    // console.log(select);

    if (id != "inputLayer" && id != "outputLayer") {
      if (select == "Dense") {
        let activation = $("#" + id)
          .find("#activation")
          .first()
          .val();
        let units = $("#" + id)
          .find("#units")
          .first()
          .val();
        try {
          Layers.splice(
            Layers.length - 1,
            0,
            tf.layers.dense({ units: Number(units), activation: activation })
          );
          Layers1.splice(
            Layers1.length - 1,
            0,
            tf.layers.dense({ units: Number(units), activation: activation })
          );
        } catch (error) {
          alert(error);
        }
      } else if (select == "Conv2D ") {
        let activation = $("#" + id)
          .find("#activation")
          .first()
          .val();
        let kernelSize = Number(
          $("#" + id)
            .find("#kernelSize")
            .first()
            .val()
        );
        let filters = Number(
          $("#" + id)
            .find("#filters")
            .first()
            .val()
        );
        try {
          Layers.splice(
            Layers.length - 1,
            0,
            tf.layers.conv2d({
              kernelSize: kernelSize,
              filters: filters,
              activation: activation
            })
          );
          Layers1.splice(
            Layers1.length - 1,
            0,
            tf.layers.conv2d({
              kernelSize: kernelSize,
              filters: filters,
              activation: activation
            })
          );
        } catch (error) {
          alert(error);
        }
      } else if (select == "Flatten") {
        Layers.splice(Layers.length - 1, 0, tf.layers.flatten());
        Layers1.splice(Layers1.length - 1, 0, tf.layers.flatten());
      } else if (select == "Dropout") {
        let rate = parseFloat(
          $("#" + id)
            .find("#rate")
            .first()
            .val()
        );
        try {
          Layers.splice(
            Layers.length - 1,
            0,
            tf.layers.dropout({
              rate: rate
            })
          );
          Layers1.splice(
            Layers1.length - 1,
            0,
            tf.layers.dropout({
              rate: rate
            })
          );
        } catch (error) {
          alert(error);
        }
      } else if (select == "MaxPooling2D") {
        let pool_size = Number(
          $("#" + id)
            .find("#pool_size")
            .first()
            .val()
        );

        try {
          Layers.splice(
            Layers.length - 1,
            0,
            tf.layers.maxPooling2d({
              poolSize: [pool_size, pool_size]
            })
          );
          Layers1.splice(
            Layers1.length - 1,
            0,
            tf.layers.maxPooling2d({
              poolSize: [pool_size, pool_size]
            })
          );
        } catch (error) {
          alert(error);
        }
      }
    }
  });
  // console.log($("#layers").html());
});
let optimalLayers1 = [
  tf.layers.conv2d({
    inputShape: [28, 28, 1],
    kernelSize: 3,
    filters: 8,
    activation: "relu"
  }),
  tf.layers.maxPooling2d({ poolSize: [2, 2] }),
  tf.layers.conv2d({ filters: 16, kernelSize: 3, activation: "relu" }),
  tf.layers.maxPooling2d({ poolSize: [2, 2] }),
  tf.layers.flatten(),
  tf.layers.dense({ units: 128, activation: "relu" }),
  tf.layers.dense({ units: 10, activation: "softmax" })
];

var imageLoader = document.getElementById("inputGroupFile01");
imageLoader.addEventListener("change", handleImage, false);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function handleImage(e) {
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // rawImage = document.getElementById("canvasimg");
      // rawImage.src = canvas.toDataURL("image/png");
      canvas1 = document.getElementById("canvas");
      rawImage1 = document.getElementById("canvasimg");
      rawImage1.src = canvas.toDataURL("image/png");
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

$("#cb").click(function() {
  let selectedValue = $("#modelSelect").val();

  if (selectedValue == 1) {
    $("#canvas").attr("width", "300px");
    $("#canvas").attr("height", "300px");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 300, 300);
  }
  if (selectedValue == 2) {
    $("#canvas").attr("width", "280px");
    $("#canvas").attr("height", "280px");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 280, 280);
  }
});
$("#sb").click(function() {
  let selectedValue = $("#modelSelect").val();
  canvas1 = document.getElementById("canvas");
  rawImage1 = document.getElementById("canvasimg");
  rawImage1.src = canvas.toDataURL("image/png");
  if (selectedValue == 1) {
    save1(rawImage1);
  }
  if (selectedValue == 2) {
  }
  save2(rawImage1);
});
let optimalParams = {
  optimizer: tf.train.adam(),
  batchSize: 512,
  epochs: 20,
  shuffle: true
};
let optimizer = tf.train.adam();
$("#optimize").change(function() {
  let selected = $(this).val();
  if ((selected = 1)) optimizer = tf.train.adam();
  else if ((selected = 2)) optimizer = tf.train.adadelta();
  else if ((selected = 3)) optimizer = tf.train.adagrade();
  else if ((selected = 4)) optimizer = tf.train.adamax();
  else if ((selected = 5)) optimizer = tf.train.ftrl();
  else if ((selected = 6)) optimizer = tf.train.nadam();
  else if ((selected = 7)) optimizer = tf.train.rmsprop();
  else if ((selected = 8)) optimizer = tf.train.sgd();

  Params.optimizer = optimizer;
});
let shuffle = true;
$("#shuffle").change(function() {
  if ($(this).is(":checked")) {
    shuffle = true;
    Params.shuffle = shuffle;
  } else {
    shuffle = false;
    Params.shuffle = shuffle;
  }
});
let Params = {
  optimizer: optimizer,
  batchSize: 512,
  epochs: 20,
  shuffle: shuffle
};
