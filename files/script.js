import { run as shapeRun } from "./shape-recog/script.js";

$("#train").click(function() {
  let selectedValue = $("#modelSelect").val();
  try {
    if (selectedValue == 1) shapeRun(optimalLayers);
  } catch (error) {
    alert(error);
  }
});
$("#userTrain").click(function() {
  let selectedValue = $("#modelSelect").val();
  try {
    if (selectedValue == 1) shapeRun(Layers);
  } catch (error) {
    alert(error);
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
        } catch (error) {
          alert(error);
        }
      } else if (select == "Flatten") {
        Layers.splice(Layers.length - 1, 0, tf.layers.flatten());
      } else if (select == "Dropout") {
        let rate = parseFloat(
          $("#" + id)
            .find("#rate")
            .first()
            .val()
        );

        Layers.splice(
          Layers.length - 1,
          0,
          tf.layers.dropout({
            rate: rate
          })
        );
      } else if (select == "MaxPooling2D ") {
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
            tf.layers.MaxPooling2D({
              poolSize: [pool_size, pool_size]
            })
          );
        } catch (error) {
          alert(error);
        }
      }
    }
  });
  // console.log(Layers);
});
