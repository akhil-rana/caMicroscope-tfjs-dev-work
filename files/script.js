import { run as shapeRun } from "./shape-recog/script.js";

$("#train").click(function() {
  let selectedValue = $("#modelSelect").val();
  if (selectedValue == 1) shapeRun();
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
    " <div  style='display: flex; flex-wrap:wrap; align-content:center; max-width: 21em'>  <select    class='browser-default custom-select'    id='modelClassSelect'    style='width: 9em; margin:0 auto; margin-bottom: 2em '  >    <option value='1' selected>Dense</option>    <option value='2'>Conv2D </option>    <option value='3'>Flatten</option>    <option value='4'>Dropout</option>    <option value='5'>MaxPooling2D</option> </select  >&nbsp;&nbsp; &nbsp;&nbsp;  <div    class='md-form'    style='margin: 0 auto; width: 9em; display:none'  >    <input      type='text'      id='inputShape'      class='form-control'      disabled          />    <label for='inputShape'>inputShape:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 7em; display:none'  >    <input      type='number'      id='kernelSize'      class='form-control'         />    <label for='kernelSize'>kernelSize:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 5em; display:none'  >    <input      type='number'      id='filters'      class='form-control'          />    <label for='filters'>filters:</label>  </div>  <div class='md-form' style='margin: 0 auto; width: 8em; '>    <input      type='text'      id='activation'      class='form-control'          />    <label for='activation'>activation:</label>  </div>  <div class='md-form' style='margin: 0 auto; width: 6em;'>    <input      type='number'      id='units'      class='form-control'         />    <label for='units'>units:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 6em; display:none'  >    <input      type='text'      id='pool_size'      class='form-control'          />    <label for='pool_size'>pool_size:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 6em; display:none'  >    <input      type='number'      max='1'      min='0'      step='0.01'      id='rate'      class='form-control'    />    <label for='rate'>rate:</label>  </div></div><br /><div  style='display: flex; flex-wrap:wrap; align-content:center; max-width: 21em'>  <button    type='button'    class='btn btn-danger '    style='margin: 0 auto; ' id='deleteLayer' >    Delete  </button>  </div>" +
    "</div></div></div><div class='card LayerCard' id='add" +
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
      " <div  style='display: flex; flex-wrap:wrap; align-content:center; max-width: 21em'>  <select    class='browser-default custom-select'    id='modelClassSelect'    style='width: 9em; margin:0 auto; margin-bottom: 2em '  >    <option value='1' selected>Dense</option>    <option value='2'>Conv2D </option>    <option value='3'>Flatten</option>    <option value='4'>Dropout</option>    <option value='5'>MaxPooling2D</option> </select  >&nbsp;&nbsp; &nbsp;&nbsp;  <div    class='md-form'    style='margin: 0 auto; width: 9em; display:none'  >    <input      type='text'      id='inputShape'      class='form-control'      disabled          />    <label for='inputShape'>inputShape:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 7em; display:none'  >    <input      type='number'      id='kernelSize'      class='form-control'         />    <label for='kernelSize'>kernelSize:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 5em; display:none'  >    <input      type='number'      id='filters'      class='form-control'          />    <label for='filters'>filters:</label>  </div>  <div class='md-form' style='margin: 0 auto; width: 8em; '>    <input      type='text'      id='activation'      class='form-control'          />    <label for='activation'>activation:</label>  </div>  <div class='md-form' style='margin: 0 auto; width: 6em;'>    <input      type='number'      id='units'      class='form-control'         />    <label for='units'>units:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 6em; display:none'  >    <input      type='text'      id='pool_size'      class='form-control'          />    <label for='pool_size'>pool_size:</label>  </div>  <div    class='md-form'    style='margin: 0 auto; width: 6em; display:none'  >    <input      type='number'      max='1'      min='0'      step='0.01'      id='rate'      class='form-control'    />    <label for='rate'>rate:</label>  </div></div><br /><div  style='display: flex; flex-wrap:wrap; align-content:center; max-width: 21em'>  <button    type='button'    class='btn btn-danger '    style='margin: 0 auto; ' id='deleteLayer' >    Delete  </button>  </div>" +
      "</div></div></div><div class='card' id='add" +
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
// $("#inputLayer")
//   .find("#modelClassSelect")
//   .first()
//   .change(function() {
//     if ($(this).val() == 1) {
//       $("#inputLayer")
//         .find("#inputShape")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#kernelSize")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#filters")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#activation")
//         .parent()
//         .css("display", "block");
//       $("#inputLayer")
//         .find("#units")
//         .parent()
//         .css("display", "block");
//       $("#inputLayer")
//         .find("#pool_size")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#rate")
//         .parent()
//         .css("display", "none");
//     } else if ($(this).val() == 2) {
//       $("#inputLayer")
//         .find("#inputShape")
//         .parent()
//         .css("display", "block");
//       $("#inputLayer")
//         .find("#kernelSize")
//         .parent()
//         .css("display", "block");
//       $("#inputLayer")
//         .find("#filters")
//         .parent()
//         .css("display", "block");
//       $("#inputLayer")
//         .find("#activation")
//         .parent()
//         .css("display", "block");
//       $("#inputLayer")
//         .find("#units")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#pool_size")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#rate")
//         .parent()
//         .css("display", "none");
//     } else if ($(this).val() == 3) {
//       $("#inputLayer")
//         .find("#inputShape")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#kernelSize")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#filters")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#activation")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#units")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#pool_size")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#rate")
//         .parent()
//         .css("display", "none");
//     } else if ($(this).val() == 4) {
//       $("#inputLayer")
//         .find("#inputShape")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#kernelSize")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#filters")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#activation")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#units")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#pool_size")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#rate")
//         .parent()
//         .css("display", "block");
//     } else {
//       $("#inputLayer")
//         .find("#inputShape")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#kernelSize")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#filters")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#activation")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#units")
//         .parent()
//         .css("display", "none");
//       $("#inputLayer")
//         .find("#pool_size")
//         .parent()
//         .css("display", "block");
//       $("#inputLayer")
//         .find("#rate")
//         .parent()
//         .css("display", "none");
//     }
//   });
