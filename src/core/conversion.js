/**
 * @function: radToDeg(input)
 * @desc: converts radians to degrees
 * @param input number: the radians you wish converted to degrees
 * @alias: rad2deg
 * @link: https://codepen.io/AllForTheCode/pen/wjRpBZ
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
 * @link: https://codepen.io/AllForTheCode/pen/jxXYbE
 */
window.degToRad = function (input) {
    return input * (Math.PI / 180);
}
window.deg2rad = function (arg) { return degToRad(arg); }



/**
 * @function: toHex(num)
 * @desc: Converts a number to hex
 * @param num number: decimal base 10
 * @return string: hexidecimal value
 * @link: https://codepen.io/AllForTheCode/pen/ELGoKX
 */
window.toHex = function (num) {
    return num.toString(16);
}
window.decToHex = function(num) { return toHex(num); }
window.decimalToHex = function(num) { return toHex(num); }
window.numberToHex = function(num) { return toHex(num); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




/**
 * @function: boolToString(bool)
 * @desc: converts boolean to a string of true or false
 * @param bool boolean: the boolean you wish to convert
 * @link: https://codepen.io/AllForTheCode/pen/PeXEbg
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
window.booleanToString = function(bool) { return boolToString(bool); }




/**
 * @function: boolToYesNo(bool)
 * @desc: converts a boolean to yes or no
 * @param bool boolean: the boolean you wish to convert
 * @link: https://codepen.io/AllForTheCode/pen/zjypZz
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
window.booleanToYesNo = function(bool) { return boolToYesNo(bool); }


/**
 * @function: stringToBool(str)
 * @desc: Converts a string to a boolean (y,yes,"1",no etc)
 * @param str string: the string you wish to convert
 * @link: https://codepen.io/AllForTheCode/pen/vjvpmQ
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
        default:
            return false;
            break;
    }
}
window.stringToBoolean = function(str) { return stringToBool(str); }



/**
 * @function: getBooleanFrom(input)
 * @desc: converts an input to a boolean
 * @param * input: the variable you wish to convert to a boolean
 * @link: https://codepen.io/AllForTheCode/pen/XqoVea
 */
window.toBoolean = function (input) {
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

    return true;
}
window.getBooleanFrom = function(input) { return toBoolean(input); }



/**
 * @function: parseArrayToFloat(arr)
 * @desc: parses all values in array to float
 * @param array arr: array to process
 * @alias: arrayToFloat
 * @link: https://codepen.io/AllForTheCode/pen/erbyVR
 */
window.parseArrayToFloat = function (arr) {
    var converted;
    for (var i = 0; i < arr.length; i++) {
        converted = parseFloat(arr[i]);
        if (isNaN(converted)){
            arr[i] = 0;
        } else {
            arr[i] = converted;
        }
    }
    return arr;
}
window.arrayToFloat = function (arr) { return parseArrayToFloat(arr); }

/**
 * @function:parseArrayToInt(arr)
 * @desc: parses all values in array to float
 * @param array arr: array to process
 * @alias: arrayToInt
 * @link: https://codepen.io/AllForTheCode/pen/yjGpqM
 */
window.parseArrayToInt = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        converted = parseInt(arr[i]);
        if (isNaN(converted)){
            arr[i] = 0;
        } else {
            arr[i] = converted;
        }
    }
    return arr;
}
window.arrayToInt = function (arr) { return parseArrayToInt(arr); }



/**
 * @function: toArray(v)
 * @desc: takes an input and returns it as index[0] of an array
 * @param * arg: value to insert into array
 * @alias: convertToArray
 * @alias: valueToArray
 * @link: https://codepen.io/AllForTheCode/pen/QrzazK
 */
window.toArray = function (arg) {
    var a = [];
    switch (typeof(arg)){
        case "object":
            if (isArray(arg)){
                return arg;
            } else {
                for (var prop in arg){
                    a.push(arg[prop]);
                }
                return a;
            }
            return [arg];
        break;
        default:
            return [arg];
        break;
    }
}
window.convertToArray = function (v) { return toArray(v); }






/**
 * @function: rgb2Hex(r,g,b)
 * @desc: rgb to hex
 * @param number r: red
 * @param number g: green
 * @param number b: blue
 * @return hex color
 */
window.rgb2Hex = function (r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  
  /**
   * @function: rgbToHex(r,g,b)
   * @desc: rgb to hex
   * @param number r: red
   * @param number g: green
   * @param number b: blue
   * @return hex color
   */
  window.rgbToHex = function (r, g, b) {
    function getHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    var hex = "#" + getHex(r) + getHex(g) + getHex(b);
    hex = hex.toUpperCase();
    return hex;
  }
  
  
  
  /**
   * @function: hexToRgb(hex)
   * @desc: hexToRgb
   * @param string hex: hex color
   * @return rgb color
   */
  window.hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  window.hex2Rgb = function (hex) { return window.hexToRgb(hex); }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  