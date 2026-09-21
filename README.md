# Interactive Productivity Dashboard

This project is a web-based dashboard built for WEB-115 to demonstrate interactive JavaScript features.

WEB - 115 Interactive dashboard repo

## TODO: Future Enhancements

- [ ] Add a metric conversion tool.
- [ ] Integrate a task list with array storage.
- [X] Add a weekly task goal calculator

## Weekly Task Goals

This feature lets a user enter their name, a daily task goal, and any weekly bonus tasks. The dashboard multiplies the daily goal by five workdays to calculate a weekly goal, then adds the bonus tasks to produce a total weekly target. The result is displayed dynamically on the page without a reload, using JavaScript's `innerHTML`.

## Imperial/Metric Converter

The Imperial/Metric Converter is an interactive tool on this dashboard that converts values between US customary (Imperial) and metric units of length. It supports inches, feet, yards, and miles on the Imperial side, and centimeters, meters, and kilometers on the metric side. Users select a conversion type from a dropdown, enter a numeric value, and the tool calculates and displays the converted result.

### Logic and Pseudocode

\`\`\`
BEGIN
    DISPLAY "Metric Converter"
    DISPLAY "1. Inch to Centimeter"
    DISPLAY "2. Foot to Centimeter"
    DISPLAY "3. Yard to Meter"
    DISPLAY "4. Mile to Kilometer"
    DISPLAY "5. Centimeter to Inch"
    DISPLAY "6. Centimeter to Foot"
    DISPLAY "7. Meter to Yard"
    DISPLAY "8. Kilometer to Mile"
    INPUT conversionChoice
    INPUT inputValue

    SET result TO 0

    IF conversionChoice EQUALS 1 THEN
        SET result TO inputValue * 2.54
        SET unitLabel TO "cm"
    ELSE IF conversionChoice EQUALS 2 THEN
        SET result TO inputValue * 30.48
        SET unitLabel TO "cm"
    ELSE IF conversionChoice EQUALS 3 THEN
        SET result TO inputValue * 0.91
        SET unitLabel TO "m"
    ELSE IF conversionChoice EQUALS 4 THEN
        SET result TO inputValue * 1.61
        SET unitLabel TO "km"
    ELSE IF conversionChoice EQUALS 5 THEN
        SET result TO inputValue * 0.39
        SET unitLabel TO "in"
    ELSE IF conversionChoice EQUALS 6 THEN
        SET result TO inputValue * 0.0328
        SET unitLabel TO "ft"
    ELSE IF conversionChoice EQUALS 7 THEN
        SET result TO inputValue * 1.09
        SET unitLabel TO "yd"
    ELSE IF conversionChoice EQUALS 8 THEN
        SET result TO inputValue * 0.62
        SET unitLabel TO "mi"
    ELSE
        WRITE "Invalid selection. Please choose a number between 1 and 8."
    END IF

    IF conversionChoice is between 1 AND 8 THEN
        OUTPUT inputValue, " converted is ", result, " ", unitLabel
    END IF
END
\`\`\`
