/*
 * Author: Darcey.Lloyd@gmail.com
 */



/**
 * @function: radToDeg(input)
 * @desc: converts radians to degrees
 * @param number input: the radians you wish converted to degrees
 * @alias: rad2deg
 */
window.radToDeg = function (input) {
    return input * (180 / Math.PI);
}
window.rad2deg = function (arg) { return radToDeg(arg); }


/**
 * @function: degToRad(input)
 * @desc: converts degrees to radians
 * @param number input: the value you wish converted to radians
 * @alias: deg2rad
 */
window.degToRad = function (input) {
    return input * (Math.PI / 180);
}
window.deg2rad = function (arg) { return degToRad(arg); }



/**
 * @function: numberToHex(num)
 * @desc: numberToHex
 * @param number num: decimal base 10
 * @return string: hexidecimal value
 */
window.numberToHex = function (num) {
    return num.toString(16);
}
window.decToHex = function(num) { return numberToHex(num); }
window.decimalToHex = function(num) { return numberToHex(num); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




/**
 * @function: boolToString(bool)
 * @desc: converts boolean to a string of true or false
 * @param boolean bool: the boolean you wish to convert
 */
window.boolToString = function (bool) {

    if (!bool || bool == undefined || typeof (bool) != "boolean") {
        console.log("AFTC.js: Conversion.js: boolToString(str): Error - input is not a boolean!");
        return "error";
    }

    if (bool) {
        return "true";
    } else {
        return "false";
    }
}




/**
 * @function: boolToYesNo(bool)
 * @desc: converts a boolean to yes or no
 * @param boolean bool: the boolean you wish to convert
 */
window.boolToYesNo = function (bool) {

    if (!bool || bool == undefined || typeof (bool) != "boolean") {
        console.log("AFTC.js: Conversion.js: boolToString(str): Error - input is not a boolean!");
        return "error";
    }

    if (bool) {
        return "yes";
    } else {
        return "no";
    }
}


/**
 * @function: stringToBool(str)
 * @desc: converts a string to a boolean (y,yes,"1",no etc)
 * @param string str: the string you wish to convert
 */
window.stringToBool = function (str) {

    if (!str || str == undefined || typeof (str) != "string") {
        console.log("AFTC.js: Conversion.js: stringToBoolean(str): Error - input str is not valid!");
        return false;
    }

    switch (str.toLowerCase()) {
        case "y":
            return true;
            break;
        case "yes":
            return true;
            break;
        case "1":
            return true;
            break;
        case "true":
            return true;
            break;
        case "y":
            return true;
            break;
        default:
            return false;
            break;
    }
}



/**
 * @function: getBooleanFrom(input)
 * @desc: converts an input to a boolean
 * @param * input: the variable you wish to convert to a boolean
 */
window.getBooleanFrom = function (input) {
    if (input == null || input == "" || !input) {
        return false;
    }

    if (typeof (input) == "string") {
        return stringToBool(input);
    }

    if (typeof (input) == "number") {
        if (input <= 0) {
            return false;
        } else {
            return true;
        }
    }
}



/**
 * @function: parseArrayToFloat(arr)
 * @desc: parses all values in array to float
 * @param array arr: array to process
 * @alias: arrayToFloat
 */
window.parseArrayToFloat = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = parseFloat(arr[i]);
    }
    return arr;
}
window.arrayToFloat = function (arr) { return parseArrayToFloat(arr); }

/**
 * @function:parseArrayToInt(arr)
 * @desc: parses all values in array to float
 * @param array arr: array to process
 * @alias: arrayToInt
 */
window.parseArrayToInt = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }
    return arr;
}
window.arrayToInt = function (arr) { return parseArrayToInt(arr); }



/**
 * @function:convertToArray(v)
 * @desc: takes an input and returns it as index[0] of an array
 * @param & v: value to insert into array
 * @alias: valueToArray
 */
window.convertToArray = function (v) {
    var a = [];
    a[0] = v;
    return a;
}
window.valueToArray = function (v) { return convertToArray(v); }