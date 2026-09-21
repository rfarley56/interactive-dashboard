document.getElementById("convert-btn").addEventListener("click", function () {
    var choice = parseInt(document.getElementById("conversionChoice").value);
    var inputValue = parseFloat(document.getElementById("inputValue").value);
    var result = 0;
    var unitLabel = "";

    if (isNaN(inputValue)) {
        document.getElementById("output").textContent = "Please enter a valid number.";
        return;
    }

    if (choice === 1) { result = inputValue * 2.54; unitLabel = "cm"; }
    else if (choice === 2) { result = inputValue * 30.48; unitLabel = "cm"; }
    else if (choice === 3) { result = inputValue * 0.91; unitLabel = "m"; }
    else if (choice === 4) { result = inputValue * 1.61; unitLabel = "km"; }
    else if (choice === 5) { result = inputValue * 0.39; unitLabel = "in"; }
    else if (choice === 6) { result = inputValue * 0.0328; unitLabel = "ft"; }
    else if (choice === 7) { result = inputValue * 1.09; unitLabel = "yd"; }
    else if (choice === 8) { result = inputValue * 0.62; unitLabel = "mi"; }
    else {
        document.getElementById("output").textContent = "Invalid selection.";
        return;
    }

    document.getElementById("output").textContent =
        inputValue + " converted is " + result.toFixed(2) + " " + unitLabel;
});function convert() {
  var choice = parseInt(document.getElementById("conversionChoice").value);
  var inputValue = parseFloat(document.getElementById("inputValue").value);
  var result = 0;
  var unitLabel = "";

  if (isNaN(inputValue)) {
    document.getElementById("output").textContent = "Please enter a valid number.";
    return;
  }

  if (choice === 1) {
    result = inputValue * 2.54;
    unitLabel = "cm";
  } else if (choice === 2) {
    result = inputValue * 30.48;
    unitLabel = "cm";
  } else if (choice === 3) {
    result = inputValue * 0.91;
    unitLabel = "m";
  } else if (choice === 4) {
    result = inputValue * 1.61;
    unitLabel = "km";
  } else if (choice === 5) {
    result = inputValue * 0.39;
    unitLabel = "in";
  } else if (choice === 6) {
    result = inputValue * 0.0328;
    unitLabel = "ft";
  } else if (choice === 7) {
    result = inputValue * 1.09;
    unitLabel = "yd";
  } else if (choice === 8) {
    result = inputValue * 0.62;
    unitLabel = "mi";
  } else {
    document.getElementById("output").textContent = "Invalid selection.";
    return;
  }

  document.getElementById("output").textContent =
    inputValue + " converted is " + result.toFixed(2) + " " + unitLabel;
}
