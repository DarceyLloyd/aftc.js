/**
 * @function: isInString(find,source)
 * @desc: check for string in string
 * @param string find: The string to look for
 * @param string source: The string to look in
 * @link: https://codepen.io/AllForTheCode/pen/jxdONK
 */
window.isInString = function (find,source) {
    return source.indexOf(find) !== -1;
}
window.inString = function (find,source) { return isInString(find,source); }


/**
 * @function: isEven(n)
 * @desc: check if input is even
 * @param n number: variable / value you wish to test
 * @link: https://codepen.io/AllForTheCode/pen/rvPNBR
 */
window.isEven = function (n) {
    return n % 2 == 0;
}

/**
* @function: isOdd(n)
* @desc: check if input is odd
* @param n number: variable value you wish to test
* @link: https://codepen.io/AllForTheCode/pen/gzqOOW
*/
window.isOdd = function (n) {
    return Math.abs(n % 2) == 1;
}


/**
 * @function: isAlphaNumeric(input)
 * @desc: check if an input is an alpha numerical value ([a-z],[A-Z],[0-9] only)
 * @param string||number input: variable / value you wish to check
 * @link: https://codepen.io/AllForTheCode/pen/pVGooO
 */
window.isAlphaNumeric = function (input) {
    return !(/\W/.test(input));
}


/**
 * @function: isElement(o)
 * @desc: checks if your variable is an element or not
 * @param o *: variable you wish to check
 * @link: https://codepen.io/AllForTheCode/pen/RyvwPK
 */
window.isElement = function (o) {
    var answer = (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    );

    if (answer != true) {
        return false;
    } else {
        return true;
    }
}


/**
 * @function: isElement2(element)
 * @desc: checks to see if your vairable is an element or not
 * @param element *: the variable you wish to check
 * @link: https://codepen.io/AllForTheCode/pen/RyvwPK
 */
window.isElement2 = function (element) {
    // works on major browsers back to IE7
    return element instanceof Element;
}


/**
 * @function: isDOM(obj)
 * @desc: checks to see if your variable is a DOM object
 * @param obj object: variable to check
 * @link: https://codepen.io/AllForTheCode/pen/JvxjYo
 */
window.isDOM = function (obj) {
    // this works for newer browsers
    try { return obj instanceof HTMLElement; }

    // this works for older browsers
    catch (e) {
        return (typeof obj === "object") &&
            (obj.nodeType === 1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument === "object");
    }
};


/**
 * @function: isBoolean(input)
 * @desc: checks if a variable is a boolean
 * @param input *: variable to check
 * @alias: isBool
 * @link: https://codepen.io/AllForTheCode/pen/JvxjGo
 */
window.isBoolean = function (input) {
    if (typeof (input) == "boolean") {
        return true;
    } else {
        return false;
    }
}
window.isBool = function (input) { return isBoolean(input); }



/**
 * @function: isNumeric(n)
 * @desc: check if variable is numeric
 * @param n *: variable to check
 * @alias: isNumber
 * @link: https://codepen.io/AllForTheCode/pen/bMzGEL
 */
window.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
window.isNumber = function (n) { return isNumeric(n); }




/**
 * @function: isArray(input)
 * @desc: check if variable is an array
 * @param input *: variable to check
 * @link: https://codepen.io/AllForTheCode/pen/rvPNeg
 */
window.isArray = function (input) {
    return !!input && input.constructor === Array;
    //return arr.constructor == Array;
}
