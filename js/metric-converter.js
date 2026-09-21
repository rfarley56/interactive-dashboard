document.getElementById("convert-btn").addEventListener("click", function (event) {
    event.preventDefault(); // stop the form from submitting/reloading the page

    // Get the numeric value from the input field
    let input_value = document.getElementById("input-value").value;
    input_value = parseFloat(input_value);

    // Get the selected conversion type using getElementsByTagName,
    // scoped to the converter's own div so it doesn't grab an unrelated
    // <select> elsewhere on the dashboard
    let selectElement = document.getElementById("metric-converter").getElementsByTagName("select")[0];
    let selectedIndex = selectElement.selectedIndex;
    let choice = parseInt(selectElement.options[selectedIndex].value);

    let result = 0;
    let unitLabel = "";
    let fromLabel = "";

    if (isNaN(input_value)) {
        document.getElementById("conversion-result").innerHTML = "Please enter a valid number.";
        return;
    }

    if (choice === 1) {
        result = input_value * 2.54;
        fromLabel = "inches";
        unitLabel = "centimeters";
    } else if (choice === 2) {
        result = input_value * 30.48;
        fromLabel = "feet";
        unitLabel = "centimeters";
    } else if (choice === 3) {
        result = input_value * 0.91;
        fromLabel = "yards";
        unitLabel = "meters";
    } else if (choice === 4) {
        result = input_value * 1.61;
        fromLabel = "miles";
        unitLabel = "kilometers";
    } else if (choice === 5) {
        result = input_value * 0.39;
        fromLabel = "centimeters";
        unitLabel = "inches";
    } else if (choice === 6) {
        result = input_value * 0.0328;
        fromLabel = "centimeters";
        unitLabel = "feet";
    } else if (choice === 7) {
        result = input_value * 1.09;
        fromLabel = "meters";
        unitLabel = "yards";
    } else if (choice === 8) {
        result = input_value * 0.62;
        fromLabel = "kilometers";
        unitLabel = "miles";
    } else {
        document.getElementById("conversion-result").innerHTML = "Invalid selection.";
        return;
    }

    document.getElementById("conversion-result").innerHTML =
        input_value + " " + fromLabel + " is " + result.toFixed(2) + " " + unitLabel;
});
