/*
 * Author: darcey@aftc.io || darcey.lloyd@gmail.com
 */

// AFTC Core
var AFTC = AFTC || {}


/**
 * @function: argsToObject(fArgs, obj, strict)
 * @desc: Quick and easy args to object
 * @param args object: arguments (from the function structure, typically code will always be 'arguments'
 * @param obj object: object to parse into
 * @param strict boolean: console.warn any args that have been supplied that don't exist in args
 * @return: null
 * @alias: argsTo
 * @link: https://codepen.io/AllForTheCode/pen/PaqbKN
 */
argsToObject = function (fArgs, obj, strict) {
    if (fArgs[0] && typeof (fArgs[0]) == "object") {
        var args = fArgs[0];

        if (strict == undefined){ strict = true; }
        if (args && typeof (args) == "object") {
            for (var key in args) {
                if (strict){
                    if (obj.hasOwnProperty(key)) {
                        obj[key] = args[key];
                    } else {
                        console.warn("AFTC.ArgsToObject(): Argument [" + key + "] is not supported.");
                    }
                } else {
                    obj[key] = args[key];
                }
            }
        }

    }
};
argsTo = function (args, obj, strict){ argsToObject(args,obj,strict); }


AFTC.GetElement = {
    vars: {
        cache: []
    },
    by: function (type, arg) {
        var cached = AFTC.GetElement.vars.cache[arg] || false;
        if (cached) {
            return cached;
        } else {
            switch (type.toLowerCase()) {
                case "id":
                    AFTC.GetElement.vars.cache[arg] = document.getElementById(arg);
                    return AFTC.GetElement.vars.cache[arg];
                    break;
                case "class":
                    AFTC.GetElement.vars.cache[arg] = document.getElementsByClassName(arg);
                    return AFTC.GetElement.vars.cache[arg];
                    break;
                case "query":
                    AFTC.GetElement.vars.cache[arg] = document.querySelector(arg);
                    return AFTC.GetElement.vars.cache[arg];
                    break;
                case "tag":
                    AFTC.GetElement.vars.cache[arg] = document.getElementsByTagName(arg);
                    return AFTC.GetElement.vars.cache[arg];
                    break;
                case "name":
                    AFTC.GetElement.vars.cache[arg] = document.getElementsByName(arg);
                    return AFTC.GetElement.vars.cache[arg];
                    break;
            }
        }
    }
};
window.getElementById = function (id) {
    return AFTC.GetElement.by("id", id);
}
window.getId = function (id) { return window.getElementById(id); }
window.byId = function (id) { return window.getElementById(id); }

window.querySelector = function (query) {
    return AFTC.GetElement.by("query", query);
}
window.query = function (query) { return window.querySelector(query); }

window.getElementsByName = function (name) { return AFTC.GetElement.by("name", name); }
window.getElementByName = function (name) { return AFTC.GetElement.by("name", name)[0]; }

window.getElementsByClassName = function (className) { return AFTC.GetElement.by("class", className); }
window.getElementByClassName = function (className) { return AFTC.GetElement.by("class", className)[0]; }

window.getElementsByTagName = function (tagName) { return AFTC.GetElement.by("tag", tagName); }
window.getElementByTagName = function (tagName) { return AFTC.GetElement.by("tag", tagName)[0]; }

// HTMLElement.getElementByClassName = function (className) { console.log("HERE"); return AFTC.GetElement.by("class", className)[0]; }


/**
 * @function: AFTC.Log
 * @desc: Shortcut for console.log with some formatting capabilities
 * ````
 * log("Hello World");
 * log("a = " + a);
 * log("myVar1 = " + myVar1 + "  myVar2 = " + myVar2);
 * log(MyObject);
 * log(MyClass);
 * ````
 * @param * input: what you want to console.log
 * @alias: trace
 */
AFTC.Log = {
    enabled: true,
    element: false,
    enable: function () {
        enabled = true;
    },
    disable: function () {
        enabled = false;
    },
    to: function (arg) {
        var error = false;
        if (arg == undefined || arg == null || !arg) {
            AFTC.Log.element = false;
            return;
        } else if (typeof (arg) == "string") {
            arg = getElementById(arg);
        }
        if (isElement(arg)) {
            AFTC.Log.element = arg;
        } else {
            console.error("logTo(arg) ERROR: Supplied arg is not an ID or Element! To turn off logTo HTML element, don't supply an argument or use false.");
        }
    },
    out: function (arg) {
        if (console) {
            if (AFTC.Log.enabled) {
                if (typeof (arg) == "undefined") {
                    console.warn("log(arg) ERROR: Your log variable (arg) is \"undefined\"!");
                } else {
                    console.log(arg);
                }
                if (AFTC.Log.element != false) {
                    if (isElement(arg)) {
                        // AFTC.Log.element.innerHTML += ("[HTMLElement]<br>");
                        AFTC.Log.element.innerHTML += (arg+"<br>");
                    } else {
                        if (typeof (arg) == "object") {
                            AFTC.Log.element.innerHTML += "[object||array]<br>";
                            for (var key in arg) {
                                AFTC.Log.element.innerHTML += ("&nbsp;&nbsp;&nbsp;&nbsp;[" + key + "] = " + arg[key] + "<br>");
                            }
                        } else {
                            AFTC.Log.element.innerHTML += (arg + "<br>");
                        }
                    }
                }
            }
        }
    }
};
window.logTo = function (element) { AFTC.Log.to(element); }
window.log = function (arg) { AFTC.Log.out(arg); }
window.trace = function (arg) { AFTC.Log.out(arg); }

/**
 * @function: logEnable() | log.enable()
 * @desc: Enables log()
 */
window.logEnable = function () { AFTC.Log.enabled = true; }
window.log.enable = function () { AFTC.Log.enabled = true; }


/**
 * @function: logDisable() | log.disable()
 * @desc: Disable log()
 */
window.logDisable = function () { AFTC.Log.enabled = false; }
window.log.disable = function () { AFTC.Log.enabled = false; }
window.logToDisable = function () { AFTC.Log.to(false); }
window.disableLogTo = function () { AFTC.Log.to(false); }



window.cls = function(){
    if (console){
        if (console.clear){
            console.clear();
        }
    }
    if (AFTC.Log.element){
        AFTC.Log.element.innerHTML = "";
    }
}
window.clearLog = function(){ cls(); }
//  AFTC.VLog = function(){
//     if (!(this instanceof arguments.callee)) {
//         throw new Error("\nAFTC.DOM.HideShow: USAGE ERROR: Constructor called as a function.\nPlease use new AFTC.DOM.HideHsow({})");
//     }
//     var me = this;
//     var vars = {

//     }

//     new AFTC.ArgsToObject(arguments[0], vars);
//  };



/**
 * @function: openDebugWindow(html)
 * @desc: open a popup window with the html you wish to display in it
 * @param dataType html: the html you wish to display in the popup window
 * @return:
 * @alias: stringToWindow
 */
window.openDebugWindow = function (html) {
    var w = window.open('debug', 'debug', 'width=1200,height=400,resizeable,scrollbars');
    w.document.title = "Debug";
    w.document.write("<style>body {width:100%;}</style>");
    w.document.write("<div style='display:block;width:98%;-ms-word-wrap:break-word ;word-wrap:break-word;border:1px solid #000000;'>" + html + "</div>");
    //w.document.write("<div style='width:100%'>" + str + "</div>");
    w.document.close();
}
window.stringToWindow = function (html) {
    openDebugWindow(html);
}
window.htmlToWindow = function (html) {
    openDebugWindow(html);
}

/**
 * @function: addEvent(obj,type,fn,useCapture)
 * @desc: Shortcut for adding events with old browser compatibility
 * @param object obj: The object you wish to attach the event listener to
 * @param string type: The event type (e.type) mousedown, mouseup, click etc
 * @param function fn: The function to call when the event is triggered
 * @param boolean optional useCapture: Whether the event should be executed in the capturing or in the bubbling phase
 */
window.addEvent = function (obj, type, fn, useCapture) {
    if (obj == null || typeof (obj) == 'undefined') return;
    if (obj.addEventListener) {
        //obj.addEventListener(type, fn, false);
        obj.addEventListener(type, fn, useCapture ? true : false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + type, fn);
    } else {
        obj["on" + type] = fn;
    }
};


/**
 * @function: onReady(fn)
 * @desc: Replacement for jQuerys $(document).ready
 * @param function fn: inline function or pass it a function for when your page is loaded and ready to be used
 * @alias: ready
 */
window.onReady = function (fn) {
    // IE9+
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        // Adds a little delay but is a good thing
        setTimeout(fn, 10);
    } else {
        if (document.addEventListener){
            document.addEventListener("DOMContentLoaded", function () {
                // Adds a little delay but is a good thing
                setTimeout(fn, 10);
            });
        }
        
    }
}
window.ready = function (fn) {
    window.onReady(fn);
}
/**
 * @function: arrayRemoveIndex(arr,index)
 * @desc: remove a specified index from an array
 * @param array arr: the array you wish to remove an index on
 * @param number index: the array index you wish to remove
 * @return: array
 */
window.arrayRemoveIndex = function (arr, index) {
    arr.splice(index, 1);
    return arr;
}

/**
 * @function: isStringInArray(needle,haystack)
 * @desc: Check to see if a string is in an array
 * @param string needle: the string your looking for
 * @param array haystack: the array you wish to search
 */
window.isStringInArray = function (needle, haystack) {
    return (new RegExp('(' + haystack.join('|').replace(/\./g, '\\.') + ')$')).test(needle);
}

/**
 * @function: arrayContains(needle,haystack)
 * @desc: Check to see if your array contains something you want to find
 * @param array arr: the array you wish to search
 * @param string needle: what you want to find
 */
window.arrayContains = function (needle, haystack) {
    if (haystack.indexOf(needle) > -1) { return true; } else { return false; }
}
window.isInArray = function (needle, haystack) { return window.arrayContains(needle, haystack); }



/**
 * @function: arrayEmpty(arr)
 * @desc: clears/empties an array for garbage collection
 * @param array arr: the array to clear / empty
 * @alias: arrayClear
 */
window.arrayEmpty = function (arr) {
    while (arr.length > 0) { arr.pop(); }
}
window.arrayClear = function (arr) { window.arrayEmpty(arr); }






/**
 * @function: getMaxFromArray(arr)
 * @desc: returns the maximum value in an array
 * @param array arr: the array you wish to find the maximum value in
 * @alias: arrayGetMax
 * @alias: arrayMax
 */
window.getMaxFromArray = function (arr) {
    return Math.max.apply(Math, arr);
}
window.arrayGetMax = function (arr) { return getMaxFromArray(arr); }
window.arrayMax = function (arr) { return getMaxFromArray(arr); }




/**
 * @function: arrayGetMin
 * @desc: returns the minimum value in an array
 * @param array arr: the array you wish to find the minimum value in
 * @alias: getMinFromArray
 * @alias: arrayMin
 */
window.getMinFromArray = function (arr) {
    return Math.min.apply(Math, arr);
}
window.arrayGetMin = function (arr) { return getMinFromArray(arr); }
window.arrayMin = function (arr) { return getMinFromArray(arr); }




/**
 * @function: arrayShuffle(arr)
 * @desc: shuffles an array (method 1)
 * @param array arr: the array to shuffle
 * @alias: shuffle
 * @alias: arrayShuffle
 */
window.arrayShuffle = function (arr) {
    var currentIndex = arr.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}
window.shuffle = function(arr){ return arrayShuffle(arr); }
window.shuffleArray = function(arr){ return arrayShuffle(arr); }


/**
 * @function: arrayShuffle2(arr)
 * @desc: shuffles an array (method 2)
 * @param array arr: the array to shuffle
 * @alias: shuffle2
 * @alias: arrayShuffle2
 */
window.arrayShuffle2 = function (a) {
    var x, t, r = new Uint32Array(1);
    for (var i = 0, c = a.length - 1, m = a.length; i < c; i++ , m--) {
        crypto.getRandomValues(r);
        x = Math.floor(r / 65536 / 65536 * m) + i;
        t = a[i], a[i] = a[x], a[x] = t;
    }

    return a;
}
window.shuffle2 = function(arr){ return arrayShuffle2(arr); }
window.shuffleArray2 = function(arr){ return arrayShuffle2(arr); }




window.arrayToSingleLineString = function (arr) {
    var html = "[";
    for (i = 0; i < arr.length; i++) {
        switch (typeof (arr[i])) {
            case "number":
                html += arr[i] + ",";
                break;
            case "string":
                html += "'" + arr[i] + "',";
                break;
            default:
                html += "" + typeof (arr[i]) + ",";
                break;
        }
    }
    html = trimStringLength(html, html.length - 1);
    html += "]";
    return html;
}
window.arrayToString = function(arr){ return arrayToSingleLineString(arr); }



/**
 * @function:convertToArray(v)
 * @desc: takes an input and returns it as index[0] of an array
 * @param & v: value to insert into array
 * @alias: valueToArray
 */
window.convertToArray = function(v){
    var a = [];
    a[0] = v;
    return a;
}
window.toArray = function(v){ return convertToArray(v); }
window.valueToArray = function(v){ return convertToArray(v); }
/**
 * @function: getFunctionName(fn)
 * @desc: tries to get the function name of a suppled function
 * @param function fn: the function wish to get the name of
 */
function getFunctionName(fn) {
    var name = fn.toString();
    var reg = /function ([^\(]*)/;
    return reg.exec(name)[1];
};
/**
 * @function: isInString(find,source)
 * @desc: check for string in string
 * @param string find: The string to look for
 * @param string source: The string to look in
 */
window.isInString = function (find,source) {
    return source.indexOf(find) !== -1;
}
window.inString = function (find,source) { return isInString(find,source); }


/**
 * @function: isEven(n)
 * @desc: check if input is even
 * @param number n: variable / value you wish to test
 */
window.isEven = function (n) {
    return n % 2 == 0;
}

/**
* @function: isOdd(n)
* @desc: check if input is odd
* @param number n: variable / value you wish to test
*/
window.isOdd = function (n) {
    return Math.abs(n % 2) == 1;
}


/**
 * @function: isAlphaNumeric(input)
 * @desc: check if an input is an alpha numerical value ([a-z],[A-Z],[0-9] only)
 * @param string||number input: variable / value you wish to check
 */
window.isAlphaNumeric = function (input) {
    return !(/\W/.test(input));
}


/**
 * @function: isElement(o)
 * @desc: checks if your variable is an element or not
 * @param * o: variable you wish to check
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
 * @param * element: the variable you wish to check
 */
window.isElement2 = function (element) {
    // works on major browsers back to IE7
    return element instanceof Element;
}
/**
 * @function: isDOM(obj)
 * @desc: checks to see if your variable is a DOM object
 * @param object obj: variable to check
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
 * @param * input: variable to check
 * @alias: isBool
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
 * @param * n: variable to check
 * @alias: isNumber
 */
window.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
window.isNumber = function (n) { return isNumeric(n); }




/**
 * @function: isArray(input)
 * @desc: check if variable is an array
 * @param * arr: variable to check
 */
window.isArray = function (input) {
    return !!input && input.constructor === Array;
    //return arr.constructor == Array;
}

/**
 * @function: getRandomInt(min,max)
 * @desc: returns a random number / int betwen your specified min and max values
 * @param number min: the minimum your random number is allowed to go
 * @param number max: the maximum your random number is allowed to go
 * @alias: getRandom
 */
window.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
window.randomInt = function (min, max) { return getRandomInt(min, max); }
window.getRandom = function (min, max) { return getRandomInt(min, max); }
window.random = function (min, max) { return getRandomInt(min, max); }



/**
 * @function: getRandomThatsNot(min,max,not)
 * @desc: returns a random int betwen your specified min and max values but never the not value
 * @param number min: the minimum your random number is allowed to go
 * @param number max: the maximum your random number is allowed to go
 * @alias: getRandom
 */
window.getRandomThatsNot = function(min,max,not){
    var r = not; var lim = 100; var runs = 0;
    while (r==not && runs < lim){
        runs++;
        r = getRandomInt(min,max);
    }
    if (runs>=lim){
        return false;
    } else {
        return r;
    }
}


/**
 * @function: getRandomFloat(min,max)
 * @desc: returns a random floating point number betwen your specified min and max values
 * @param number min: min value
 * @param number max: max value
 */
window.getRandomFloat = function (min, max) {
    return (Math.random() * (max - min) + min);
};
window.randomFloat = function (min, max) { return getRandomFloat(min, max); }


/**
 * @function: randomString(length)
 * @desc: get a random string of a specified length
 * @param number length: the length of the string you wish to generate
 * @alias: getRandomString
 */
window.randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
window.getRandomString = function (len) { return randomString(len); }


/**
 * @function: getUID(length)
 * @desc: Generates a random id
 * @param number length: length of the unique id to generate
 * @alias: getUID
 * @alias: generateUID
 */
window.getUID = function (len) {
    if (len > 34){
        console.error("getUID(length): Limit error: Length must be 34 or lower");
    } else {
        return Math.random().toString(36).substr(2, len);
    }
}
window.getUniqueId = function (len) { return getUID(len); }
window.generateUID = function (len) { return getUID(len); }


/**
 * @function: getArrayOfRandomNumbers(arraySize,min,max)
 * @desc: generate an array of random number between your max and min values
 * @param number arraySize: the number of random numbers to generate also the array size that will be returned
 * @param number min: the minimum your random number is allowed to be
 * @param number max: the maximum your random number is allowed to be
 */
window.getArrayOfRandomNumbers = function (arraySize, min, max) {
    var arr = [];
    for (var i = 0; i < arraySize; i++) {
        arr[i] = getRandomInt(min, max);
    }
    return arr;
}


/**
 * @function: getArrayOfRandomStrings(arraySize,strLength)
 * @desc: generate an array of random string of a specified length
 * @param number arraySize: the number of random strings to generate also the array size that will be returned
 * @param number strLength: the length of the strings to be generated
 */
window.getArrayOfRandomStrings = function (arraySize, strLength) {
    var arr = [];
    for (var i = 0; i < arraySize; i++) {
        arr[i] = getRandomString(strLength);
    }
    return arr;
}



/**
 * @function: guid()
 * @desc: generates a guid
 * @alias: getGUID
 */
window.guid = function () {
    function Amiga() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return Amiga() + Amiga() + '-' + Amiga() + '-' + Amiga() + '-' +
        Amiga() + '-' + Amiga() + Amiga() + Amiga();
}
window.getGUID = function () { return guid(); }











/**
 * @function: getWeightedRandom(odds, iterations)
 * @desc: Get a weighted random based on odds and iterations
 * @param string odds: xxxxxxxxxxxxxxxxxxxx
 * @param string iterations: xxxxxxxxxxxxxxxxxxxx
 */
window.getWeightedRandom = function (odds, iterations) {
    if (!odds) {
        odds = [
            0.68, // 0
            0.69, // 1
            0.698, // 2
            0.6909, // 3
            0.68, // 4
            0.58, // 5
            0.57, // 6
            0.56, // 7
            0.4, // 8
            0.3, // 9
        ];
    }
    var weights = [];
    var r = 0;
    var iMax = 0;
    var wMax = 0;

    for (var i in odds) {
        if (!weights[i]) {
            weights[i] = 0;
        }

        for (var x = 0; x < iterations; x++) {
            r = Math.random();
            //log(r.toFixed(3) + "   " + odds[i].toFixed(3));
            if (r <= odds[i]) {
                weights[i] += odds[i];
            }
        }

        if (weights[i] > wMax) {
            wMax = weights[i];
            iMax = i;
        }
    }

    //log(weights);
    //log("wMax = " + wMax + "   iMax = " + iMax);
    return iMax;
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * @function: limitLengthInWords(str, maxWords)
 * @desc: Limit a string in length of words
 * @param string str: the original string to limit
 * @param number maxWords: the number of words you wish to limit to
 * @return object: {output:string,remaining:number}
 */
window.limitLengthInWords = function (str, maxWords) {
	var wordCount = str.split(/\S+/).length - 1;
	var re = new RegExp("^\\s*\\S+(?:\\s+\\S+){0," + (maxWords - 1) + "}");
	var output = "";
	if (wordCount >= maxWords) {
		output = str.match(re);
	} else {
		output = str;
	}
	return { output: output, remaining: (maxWords - wordCount) };
}
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -





/**
 * @function: cleanJSONString(s)
 * @desc: Attempts to clean a json string
 * @param string s: input string
 */
window.cleanJSONString = function (s) {
	// preserve newlines, etc - use valid JSON
	s = s.replace(/\\n/g, "\\n")
		.replace(/\\'/g, "\\'")
		.replace(/\\"/g, '\\"')
		.replace(/\\&/g, "\\&")
		.replace(/\\r/g, "\\r")
		.replace(/\\t/g, "\\t")
		.replace(/\\b/g, "\\b")
		.replace(/\\f/g, "\\f");
	// remove non-printable and other non-valid JSON chars
	s = s.replace(/[\u0000-\u0019]+/g, "");
	return s;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * @function: escapeHTML(input)
 * @desc: Attempts to escape a html string
 * @param string xxxx: xxxxxxxxxxxxxxxxxxxx
 */
/*
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
*/
window.escapeHTML = function (input) {
	if (typeof (input) != "string") { console.error("escape(arg): usage error: arg needs to be a string!"); return false; }

	var replacements = {
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
		"\"": "&quot;",
		"`": "&#039;"
	};
	return input.replace(/[<>&"]/g, function (character) {
		return replacements[character];
	});
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



/**
 * @function: setStringLength(input, len)
 * @desc: sets the length of a string from left to right
 * @param string input: what string do you want to set the length of?
 * @param number length: the length you want the string to be
 * @alias cutStringTo
 * @alias cutString
 * @alias cutStringLength
 * @alias setStrLen
 */
window.cutStringTo = function (s, len) {
	return s.substring(0, len);
}
window.cutString = function (s, len) { return cutStringTo(s,len); }
window.cutStringLength = function (s, len) { return cutStringTo(s,len); }
window.setStrLen = function (s, len) { return cutStringTo(s,len); }
window.setStringLength = function (s, len) { return cutStringTo(s,len); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * @function: trimStringBy(input, trimBy)
 * @desc: Trims the length of a string by a value
 * @param string input: The string you want to trim
 * @param number trimBy: How many characters do you want to trim off the end
 */
window.trimStringBy = function (str, trimBy) {
	return (str.substring(0, str.length - trimBy));
}
window.rTrim = function (str, trimBy) { return trimStringBy(str, trimBy); }


/**
 * @function: leftTrim(str, by)
 * @desc: Trims the left of a string by a specified amount
 * @param string str: The string you want to trim
 * @param number by: How many characters do you want to trim off the end
 */
window.lTrim = function (str, by) {
	return str.substring(by, str.length);
}
window.leftTrim = function (str, by) { return lTrim(str, by); }





/**
 * @function: getFileExtension(input)
 * @desc: Attempts to get the file extension from a file path string
 * @param string str: the file path string
 */
window.getFileExtension = function (input) {
	var ext = input.split('.').pop();
	return ext;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



/**
 * @function: getFileExtension2(input)
 * @desc: Attempts to get the file extension from a file path string
 * @param string str: the file path string
 */
window.getFileExtension2 = function (input) {
	return input.slice((input.lastIndexOf(".") - 1 >>> 0) + 2);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




/**
 * @function: getLastPartOfUrl(url)
 * @desc: Gets the last part of a URL
 * @param string url: url to process
 */
window.getLastPartOfUrl = function (url) {
	if (!url) {
		url = window.location.href;
	}
	var part = url.substring(url.lastIndexOf('/') + 1);
	return part;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



/**
 * @function: removeFileFromPath(path)
 * @desc: Attempts to remove the file from a file path string
 * @param string path: path
 */
window.removeFileFromPath = function (path) {
	//var pa = '/this/is/a/folder/aFile.txt';
	var r = /[^\/]*$/;
	path = path.replace(r, '');
	return path;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * @function: getAnchor(url)
 * @desc: Get anchor from url
 * @param string url: The url to get the anchor from
 */
window.getAnchor = function (url) {
	if (!url) { url = window.location.href; }
	var anchorAvailable = isInString("#", url);
	if (anchorAvailable) {
		return url.slice(url.lastIndexOf('#') + 1);
	} else {
		return false;
	}
}
window.getAnchorFromUrl = function (url) { return window.getAnchor(url); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -





/**
 * @function: String.prototype.startsWith(str)
 * @desc: ES6 supports the startsWith(), this is for pre ES6 support
 * @param string str: string to check
 */
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str) {
		return this.match(new RegExp("^" + str));
	};
}

/**
 * @function: String.prototype.endsWith(str)
 * @desc: ES6 supports endsWith(), this is for pre ES6 support
 * @param string str: string to check
 */
//
if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function (str) {
		return this.match(new RegExp(str + "$"));
	};
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * @function: getStringBetween(input,start,end)
 * @desc: Gets a string between two other strings
 * @param string input: input string to check
 * @param string start: start string marker
 * @param string end: end string marker
 */
window.getStringBetween = function (str, start, end) {
	return str.split(start).pop().split(end).shift().trim();
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



/**
 * @function: getAllStringsBetween(str,start,end)
 * @desc: Gets all strings between two other strings (multi match)
 * @param string str: input string to check
 * @param string start: start string marker
 * @param string end: end string marker
 */
window.getAllStringsBetween = function (str, start, end) {
	var orig = str;
	var results = [];
	// log(orig);
	// log("--------");

	function getBetween() {
		// log("CHECKING: " + str);
		var startMatchIndex = str.indexOf(start); // Find start match
		// log("startMatchIndex: " + startMatchIndex);
		if (startMatchIndex == -1) { return false; }

		var startCutIndex = start.length + startMatchIndex; // calc start cut index
		// log("startCutIndex: " + startCutIndex);

		str = str.substring(startCutIndex, str.length); // LTrim to start cut index
		// log("CUT: " + str);

		var endMatchIndex = str.indexOf(end); // find end match index
		// log("endMatchIndex: " + endMatchIndex);
		if (endMatchIndex == -1) { return false; }

		var between = str.substring(0, endMatchIndex); // get string between
		// log("between: " + between);
		var endCutIndex = end.length + endMatchIndex;
		//log("endCutIndex: " + endCutIndex);
		str = str.substring(endCutIndex, str.length); // cut off end string
		//log("FINAL: " + str);
		return between;
	}
	var lim = 500; // Want to loop forever? 500 seems like areasonable limit
	var pos = 0;
	var result = true;
	while (pos <= lim && result != false) {
		pos++;
		result = getBetween();
		if (result) {
			//log("between["+i+"] = " + result);
			results.push(result);
			//log("");
		}
	}
	return results;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



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
 * @function: toHex(num)
 * @desc: Converts a number to hex
 * @param number num: decimal base 10
 * @return string: hexidecimal value
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
window.booleanToString = function(bool) { return boolToString(bool); }




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
window.booleanToYesNo = function(bool) { return boolToYesNo(bool); }


/**
 * @function: stringToBool(str)
 * @desc: Converts a string to a boolean (y,yes,"1",no etc)
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
 * @function:toArray(v)
 * @desc: takes an input and returns it as index[0] of an array
 * @param * arg: value to insert into array
 * @alias: convertToArray
 * @alias: valueToArray
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
 * @function: getDaysBetween(startDateTime, endDateTime)
 * @desc: Gets the number of whole days between a start and end date
 * @param DateTime startDateTime: start date
 * @param DateTime endDateTime: end date
 * @alias: getNoOfDaysBetween
 * @alias: getDaysBetweenDates
 */
window.getDaysBetween = function(startDateTime, endDateTime) {
	var msPerDay = 8.64e7;
	// Copy dates so don't mess them up
	var sd = new Date(startDateTime);
	var ed = new Date(endDateTime);
	// Set to noon - avoid DST errors
	sd.setHours(12, 0, 0);
	ed.setHours(12, 0, 0);
	// Round to remove daylight saving errors
	return Math.round((ed - sd) / msPerDay);
}
window.getNoOfDaysBetween = function(start, end){ return getDaysBetween(start, end); }
window.getDaysBetweenDates = function(start, end){ return getDaysBetween(start, end); }



/**
 * @function: getUKDateFromDate(date)
 * @desc: Formats a date in the UK format
 * @param Date date
 */
window.getUKDateFromDate = function(dte){
	var output = dte.getDay() + "-" + (dte.getMonth()+1) + "-" + dte.getFullYear();
	return output;
}


/**
 * @function: getUSDateFromDate(date)
 * @desc: Formats a date in the US format
 * @param Date date
 */
window.getUSDateFromDate = function(dte){
	var output = dte.getFullYear() + "-" + (dte.getMonth()+1) + "-" + (dte.getDay()+1)
	return output;
}



/**
 * @function: getUkDateFromDbDateTime(input)
 * @desc: get a uk date from a mysql db date value
 * @param MySQLDateTimeString input: MySQL DB DateTime
 */
window.getUkDateFromDbDateTime = function (input) {
	// "2016-04-08 21:11:59" to UK date
	if (input == "" || input == null) {
		return "no input";
	}
	var DateTime = input.split(" ");
	var DateParts = DateTime[0].split("-");
	var UKDate = DateParts[2] + "/" + DateParts[1] + "/" + DateParts[0];
	return UKDate;
}

/**
 * @function: getUkDateTimeFromDbDateTime(input)
 * @desc: get a uk date from a mysql db date time value
 * @param MySQLDateTimeString input: MySQL DB DateTime
 */
window.getUkDateTimeFromDbDateTime = function (input) {
	// "2016-04-08 21:11:59" to UK date time
	var DateTime = input.split(" ");
	var DateParts = DateTime[0].split("-");
	var TimeParts = DateTime[1].split(":");
	var UKDate = DateParts[2] + "/" + DateParts[1] + "/" + DateParts[0];
	var Time = TimeParts[0] + ":" + TimeParts[1];
	return (UKDate + " " + Time);
}

/**
 * @function: getSQLDateTime()
 * @desc: gets the date time now for sql insert
 */
window.getSQLDateTime = function () {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	if (month.toString().length == 1) {
		var month = '0' + month;
	}
	if (day.toString().length == 1) {
		var day = '0' + day;
	}
	if (hour.toString().length == 1) {
		var hour = '0' + hour;
	}
	if (minute.toString().length == 1) {
		var minute = '0' + minute;
	}
	if (second.toString().length == 1) {
		var second = '0' + second;
	}
	var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
	return dateTime;
}



/**
 * @function: getDateTime(local)
 * @desc: gets the date time at a specified local
 * @param string optional local: options are us or do not supply for en-gb
 */
window.getDateTime = function (local) {
	// NOTE: MySQL DB DateTime format: "2016-04-08 21:11:59"
	var currentdate = new Date(),
		datetime = "";

	if (!local) {
		local = "en-GB";
	}

	switch (local.toLowerCase()) {
		case "db":
			datetime = getSQLDateTime();
			break;
		case "en-GB":
			datetime = currentdate.toLocaleString('en-US', {
				hour12: false,
				month: "numeric",
				day: "numeric",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
				second: "numeric"
			});
			datetime = datetime.replace(",", "");
			break;
		default:
			datetime = currentdate.toLocaleString('en-GB');
			datetime = datetime.replace(",", "");
			break;
	}

	return datetime;
}


/**
 * @function: validateEmail(email)
 * @desc: Validats an email address
 * @param string email: email address
 * @returns boolean
 */
window.isEmail = function (email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
window.validateEmail = function (email) { return isEmail(email); }
window.isValidEmail = function (email) { return isEmail(email); }

/**
 * @function: isMobile()
 * @desc: isMobile
 * @return boolean
 */
window.isMobile = function(){
	// Windows Phone must come first because its UA also contains "Android"!
	var ua = navigator.userAgent.toLowerCase();
	if (/windows phone/i.test(ua)) {
		return true;
	} else {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			return true;
		} else {
			return false;
		}
	}
}

window.isAndroid = function(){
	var ua = navigator.userAgent.toLowerCase();
	if (/windows phone/i.test(ua)) {
		return false;
	} else {
		var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
		return isAndroid;
	}
}

window.iOS = function() {
	var iDevices = [
	  'iPad Simulator',
	  'iPhone Simulator',
	  'iPod Simulator',
	  'iPad',
	  'iPhone',
	  'iPod'
	];

	if (!!navigator.platform) {
	  while (iDevices.length) {
		if (navigator.platform === iDevices.pop()){ return true; }
	  }
	}

	return false;
  }

/**
 * @function: isFireFox()
 * @desc: Detects FireFox
 * @return boolean
 */
window.isFireFox = function () {
	// var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	// return is_firefox;
	return (typeof InstallTrigger !== 'undefined');
}

/**
 * @function: isChrome()
 * @desc: Detects Chrome
 * @return boolean
 */
window.isChrome = function () {
	// var chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var chrome = !!window.chrome && !!window.chrome.webstore;
	return chrome;
}


/**
 * @function: isEdge()
 * @desc: Detects Edge
 * @return boolean
 */
window.isEdge = function () {
	//var isEdge = !isIE && !!window.StyleMedia; // Edge 20+
	var edge = false;
	if (/Edge\/\d./i.test(navigator.userAgent)) {
		edge = true;
	}
	return edge;
}


/**
 * @function: isSafari()
 * @desc: Detects Safari
 * @return boolean
 */
window.isSafari = function () {
	// var is_safari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
	// return is_safari;
	return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
}

/**
 * @function: isIE()
 * @desc: Detects IE
 * @return boolean
 */
window.isIE = function () {
	// var is_ie = navigator.userAgent.toLowerCase().indexOf('MSIE') > -1;
	// return is_ie;
	// params.isIE = navigator.userAgent.match(/MSIE|Trident/);
	// params.isIE = document.documentMode; // IS9 and above
	return /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
}


/**
 * @function: isOpera()
 * @desc: Detects Opera
 * @return boolean
 */
window.isOpera = function() {
	// var isChromium = window.chrome;
	// var isOpera = window.navigator.userAgent.indexOf("OPR") > -1 || window.navigator.userAgent.indexOf("Opera") > -1;
	// var isOpera = (navigator.userAgent.match(/Opera|OPR\//) ? true : false);
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	return isOpera;
}

/**
 * @function: getIEVersion()
 * @desc: Gets version of IE
 * @return float
 */
window.getIEVersion = function () {
	var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
	return match ? parseInt(match[1]) : undefined;
}

/**
 * @function: getBrowser()
 * @desc: Detects browser
 * @return string
 */
window.getBrowser = function () {
	var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE';
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/);
		if (tem != null) {
			return 'Opera';
		}
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		M.splice(1, 1, tem[1]);
	}
	return M[0];
}
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -



/**
 * @function: getOS(testUserAgent)
 * @desc: Attempts to get the os from the user agent or the test user agent
 * @param string testUserAgent: test user agent string
 */
window.getOS = function (testAgent) {
	var userAgent;

	if (!testAgent){
		userAgent = navigator.userAgent || navigator.vendor || window.opera;
	} else {
		userAgent = testAgent;
	}

	userAgent = userAgent.toLowerCase();




	// Windows Phone must come first because its UA also contains "Android"!
	if (/windows phone/i.test(userAgent)) {
		return {
			os:"windows phone",
			userAgent:userAgent
		}
	}

	// Samsung Browser detection S8
	if (/samsungbrowser/i.test(userAgent)) {
		return {
			os:"android",
			userAgent:userAgent
		}
	}



	if (/android/i.test(userAgent)) {
		return {
			os:"android",
			userAgent:userAgent
		}
	}

	if (/ipad|iphone|ipod/i.test(userAgent)) {
		return {
			os:"ios",
			userAgent:userAgent
		}
	}



	// Windows Phone must come first because its UA also contains "Android"
	if (/win64|win32|win16|win95|win98|windows 2000|windows xp|msie|windows nt 6.3; trident|windows nt|windows/i.test(userAgent)) {
		return {
			os:"windows",
			userAgent:userAgent
		}
	}


	if (/os x/i.test(userAgent)) {
		return {
			os:"osx",
			userAgent:userAgent
		}
	}

	if (/macintosh|osx/i.test(userAgent)) {
		return {
			os:"osx",
			userAgent:userAgent
		}
	}

	if (/openbsd/i.test(userAgent)) {
		return {
			os:"open bsd",
			userAgent:userAgent
		}
	}


	if (/sunos/i.test(userAgent)) {
		return {
			os:"sunos",
			userAgent:userAgent
		}
	}






	if (/crkey/i.test(userAgent)) {
		return {
			os:"chromecast",
			userAgent:userAgent
		}
	}

	if (/appletv/i.test(userAgent)) {
		return {
			os:"apple tv",
			userAgent:userAgent
		}
	}

	if (/wiiu/i.test(userAgent)) {
		return {
			os:"nintendo wiiu",
			userAgent:userAgent
		}
	}

	if (/nintendo 3ds/i.test(userAgent)) {
		return {
			os:"nintendo 3ds",
			userAgent:userAgent
		}
	}

	if (/playstation/i.test(userAgent)) {
		return {
			os:"playstation",
			userAgent:userAgent
		}
	}

	if (/kindle/i.test(userAgent)) {
		return {
			os:"amazon kindle",
			userAgent:userAgent
		}
	}

	if (/ cros /i.test(userAgent)) {
		return {
			os:"chrome os",
			userAgent:userAgent
		}
	}



	if (/ubuntu/i.test(userAgent)) {
		return {
			os:"ubuntu",
			userAgent:userAgent
		}
	}


	if (/googlebot/i.test(userAgent)) {
		return {
			os:"google bot",
			userAgent:userAgent
		}
	}

	if (/bingbot/i.test(userAgent)) {
		return {
			os:"bing bot",
			userAgent:userAgent
		}
	}

	if (/yahoo! slurp/i.test(userAgent)) {
		return {
			os:"yahoo bot",
			userAgent:userAgent
		}
	}



	return {
		os: false,
		userAgent:userAgent
	};
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




/**
 * @function: setHTML(elementOrId,html);
 * @desc: quick shortcut for outputting html to an element
 * ````
 * setHTML("header","Welcome");
 * // or
 * var myElement = getElementById("header");
 * setHTML(myElement,"Welcome!");
 * ````
 * @param dataType elementOrId: the element or the element id you wish to set the html of
 * @param dataType html: the html string to insert into your element
 * @return:
 * @alias: html
 */
window.setHTML = function (elementOrId, str) {
    var element;
    if (typeof (elementOrId) == "string") {
        element = getElementById(elementOrId);
    }
    if (isElement(element)) {
        element.innerHTML = str;
    } else {
        return "unable to retrieve element from [" + elementOrId + "]";
    }
}
window.html = function (element, str) { window.setHTML(element, str); }


/**
 * @function: getElementOffsetTop(elementId)
 * @desc: Gets an elements top offset
 * @param string elementId: the element ID you wish to get the top offset of
 */
window.getElementOffsetTop = function (elementId) {
    var element = getElementById(elementId);
    var curtop = 0;
    if (isElement(element)) {
        if (element.offsetParent) {
            do {
                curtop += element.offsetTop;
            } while (element = element.offsetParent);
            return parseFloat([curtop]);
        }
    }
}
window.getElementTopOffset = function (elementId) { getElementOffsetTop(elementId); }








/**
 * @function: centerAbsoluteElement(eleOrEleId)
 * @desc: Center element that is absolute positioned
 * @param element || string eleOrEleId: element or id of element to center
 */
window.centerAbsoluteElement = function (eleOrEleId) {
	var element;

	if (typeof (eleOrEleId) === "string") {
		element = document.getElementById(eleOrEleId);
		if (!element) {
			throw ("AFTC.js > centerAbsoluteElement(elementOrElementId): ERROR! elementId supplied was not found on the DOM!");
		}
	}

	// var marginL = parseInt( getComputedStyle(element,null).marginLeft );
	// var marginR = parseInt( getComputedStyle(element,null).marginRight );
	// var marginT = parseInt( getComputedStyle(element,null).marginTop );
	// var marginB = parseInt( getComputedStyle(element,null).marginBottom );

	// var paddingL = parseInt( getComputedStyle(element,null).paddingLeft );
	// var paddingR = parseInt( getComputedStyle(element,null).paddingRight );
	// var paddingT = parseInt( getComputedStyle(element,null).paddingTop );
	// var paddingB = parseInt( getComputedStyle(element,null).paddingBottom );

	// var borderLeftW = parseInt( getComputedStyle(element,null).borderLeftWidth );
	// var borderRighttW = parseInt( getComputedStyle(element,null).borderRighttWidth );
	// var borderTopW = parseInt( getComputedStyle(element,null).borderTopWidth );
	// var borderBottomW = parseInt( getComputedStyle(element,null).borderBottomWidth );

	var offsetWidth = parseInt(element.offsetWidth);
	var offsetHeight = parseInt(element.offsetHeight);

	var tx = (window.innerWidth / 2) - (offsetWidth / 2);
	var ty = (window.innerHeight / 2) - (offsetHeight / 2);

	element.style.left = tx + "px";
	element.style.top = ty + "px";
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// Styling shortcuts
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
/**
 * @function: addClass(elementOrId,classname)
 * @desc: shortcut to add a css class to a html element
 * @param elementORstring elementOrId: The elemnt or id of the html element to add a css class to
 * @param string className: the class name to add
 */
window.addClass = function (elementOrId, classNames) {
    var element;
    if (typeof(elementOrId) == "string"){
        element = getElementById(elementOrId);
    }

    if (isArray(classNames)){
        for (var i=0; i < classNames.length; i++){
            element.classList.add(classNames[i]);
        }
    } else {
        element.classList.add(classNames);
    }
}
window.addClassTo = function(elementOrId, classNames){ addClass(elementOrId, classNames); }

/**
 * @func: removeClass(elementOrId,className)
 * @desc: shortcut to remove a class from a html element
 * @param elementORstring elementOrId: The elemnt or id of the html element to add a css class to
 * @param string className: the class name to remove
 */
window.removeClass = function (elementOrId, className) {
    var element;
    if (typeof(elementOrId) == "string"){
        element = getElementById(elementOrId);
    }

    if (isArray(className)){
        for (var i=0; i < className.length; i++){
            element.classList.remove(className[i]);
        }
    } else {
        element.classList.remove(className);
    }
}
window.removeClassFrom = function(elementOrId, classNames){ removeClass(elementOrId, classNames); }


/**
 * @function: hasClass(elementOrId, cls)
 * @desc: Check to see if an element has a class attached to it
 * @param string elementOrId: The elemnt or id of the html element
 * @param string cls: class to look for
 */
window.hasClass = function (elementOrId, cls) {
    if (isElement(elementOrId)) {
        return elementOrId.classList.contains(cls);
    } else {
        return getElementById(elementOrId).classList.contains(cls);
    }
}
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #





/**
 * @function: redirect(url)
 * @desc: no more typing self.location.href, just use redirect(url)
 * @param string url: the url you wish to redirect to
 */
window.redirect = function (url) {
    self.location.href = url;
};


window.goFullScreen = function (element) {
    var target = document.body;
    if (element != undefined){
        if (isElement(element)) {
            target = element;
        }
    }
    
    if (target.requestFullscreen) {
        target.requestFullscreen();
    } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
    } else if (target.mozRequestFullScreen) {
        target.mozRequestFullScreen();
    } else if (target.msRequestFullscreen) {
        target.msRequestFullscreen();
    } else {
        console.error('Fullscreen API is not supported.');
    }
}

window.exitFullScreen = function () {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else {
		console.error('Fullscreen API is not supported.');
	}
}
/**
 * @function: setCookie(name, value)
 * @desc: Sets a cookie by name with a value
 * @param string name: name of the cookie
 * @param * value: value of the cookie
 */
window.setCookie = function (name, value) {
	//document.cookie = name + "=" + value + "; expires=Thu, 18 Dec 2013 12:00:00 GMT";
	//.cookie(name, value, {expires:365,path:'/cookies'});
	var expires = new Date();
	expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
	document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -


/**
 * @function: getCookie(name)
 * @desc: Gets the value of a cookie by name
 * @param string name: name of the cookie
 */
window.getCookie = function (name) {
	//return .cookie(name);
	var keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|)');
	return keyValue ? keyValue[2] : null;
}
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -


/**
 * @function: isChecked(elementId)
 * @desc: Checks to if checkbox is checked or not
 * @param string elementId: element id of the form element to check
 */
window.isChecked = function (id) {
	return document.getElementById(id).checked;
}
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -




/**
 * @function: isNumberKey(event)
 * @desc: Checks if evt supplied (use on form input events via onkeyup or onkeydown)
 * @param event evt: html onkeyup(event) or onkeydown(event)
 */
window.isNumberKey = function (evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

	return true;
}
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -







/**
 * @function: removeAllSelectOptions(elementOrId)
 * @desc: Removes all the options in a select
 * @param element || string: element or id string
 */
window.removeAllSelectOptions = function (elementOrId) {
    var element;
	if (typeof(elementOrId) == "string"){
		element = document.getElementById(elementOrId);
		if (!element){
			throw("AFTC.js > parseJSONToSelect() Usage ERROR, Unable to find anything on the DOM with an ID of [" + elementOrId + "]");
		}
	}

	if (element) {
		for (var i = element.options.length - 1; i >= 0; i--) {
			element.remove(i);
		}
	}

}
window.clearSelect = function(elementOrId) { removeAllSelectOptions(elementOrId); }
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -









/**
 * @function: parseJSONToSelect(j, selectElementIdOrElement, label, value)
 * @desc: parses a json object of key value pairs to a form select element
 * @param string j: the json data
 * @param multi selectElementIdOrElement: the json data
 * @param string label: of key value pair this is the key
 * @param string value: of key value pair this is the value
 */
window.parseJSONToSelect = function (j, elementOrId, labelKey, valueKey) {
	var element;

	if (typeof(elementOrId) == "string"){
		element = document.getElementById(elementOrId);
		if (!element){
			throw("AFTC.js > parseJSONToSelect() Usage ERROR, Unable to find anything on the DOM with an ID of [" + elementOrId + "]");
		}
	}

	if( typeof(elementOrId) == "object"){
		element = elementOrId;
	}

	if (typeof(j) == "string"){
		j = JSON.parse(j);
	}

	for (var i = 0; i < j.length; i++) {
		var label = j[i][labelKey];
		var data = j[i][valueKey];

		var option = document.createElement("option");
		option.text = label;
		option.value = data;
		//log(option);
		element.add(option);
	}
}
// AFTC.Point = function (x, y) {
//     !x ? this.x = 0 : this.x = x;
//     !y ? this.y = 0 : this.y = y;
// }

AFTC.Point = function (x, y) {

    !x ? this.x = 0 : this.x = x;
    !y ? this.y = 0 : this.y = y;

    this.position = function () {
        return [this.x, this.y];
    }

    this.clone = function () {
        return new AFTC.Point(this.x, this.y);
    }

    this.delta = function (point) {
        return [this.x - point.x, this.y - point.y];
    }

    this.distance = function (point) {
        var dx = point.x - this.x;
        var dy = point.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    this.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    this.moveAtAngle = function (angle, distance) {
        this.x += Math.cos(angle) * distance;
        this.y += Math.sin(angle) * distance;
        return this;
    }

    this.applyVelocity = function (velocity) {
        this.x += velocity.vx;
        this.y += velocity.vy;
        return this;
    }

    this.angleRadians = function (point) {
        // radians = atan2(deltaY, deltaX)
        var y = point.y - this.y;
        var x = point.x - this.x;
        return Math.atan2(y, x);
    }

    this.angleDeg = function (point) {
        // degrees = atan2(deltaY, deltaX) * (180 / PI)
        var y = point.y - this.y;
        var x = point.x - this.x;
        return Math.atan2(y, x) * (180 / Math.PI);
    }

    this.rotate = function (origin, radians) {
        // rotate the point around a given origin point
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        this.x =
            cos * (this.x - origin.x) + sin * (this.y - origin.y) + origin.x;
        this.y =
            cos * (this.y - origin.y) - sin * (this.x - origin.x) + origin.y;
        return this;
    }
}


AFTC.Rectangle = function (x, y, w, h) {
    !x ? this.x = 0 : this.x = x;
    !y ? this.y = 0 : this.y = y;
    !w ? this.w = 0 : this.w = w;
    !h ? this.h = 0 : this.h = h;
    this.center = new AFTC.Point();

    function init() {
        this.center = setCenterPoint();
    }

    function setCenterPoint() {
        this.center = new AFTC.Point();
        this.center.x = Math.abs(this.w - this.x) / 2;
        this.center.y = Math.abs(this.h - this.y) / 2;
    }

    this.offsetOuter = function (offset) {
        var rect = new AFTC.Rectangle();
        rect.x = this.x - offset;
        rect.y = this.y - offset;
        rect.w = this.w + offset * 2;
        rect.h = this.h + offset * 2;
    }

    this.offsetInner = function (offset) {
        var rect = new AFTC.Rectangle();
        rect.x = this.x + offset;
        rect.y = this.y + offset;
        rect.w = this.w - offset * 2;
        rect.h = this.h - offset * 2;
    }

    this.setX = function (v) { this.x = v; init(); }
    this.setY = function (v) { this.y = v; init(); }
    this.setW = function (v) { this.w = v; init(); }
    this.setH = function (v) { this.h = v; init(); }

    init();
}
AFTC.Rect = AFTC.Rectangle;




AFTC.Velocity = function (vx, vy) {

    !vx ? this.vx = 0 : this.vx = vx;
    !vy ? this.vy = 0 : this.vy = vy;

    this.flip = function () {
        // reflection on both axis
        this.vx *= -1;
        this.vy *= -1;
        return this;
    }

    this.flipX = function () {
        // reflection on x axis
        this.vx *= -1;
        return this;
    }

    this.flipY = function () {
        // reflection on y axis
        this.vy *= -1;
        return this;
    }

    this.multiply = function (scalar) {
        this.vx *= scalar;
        this.vy *= scalar;
        return this;
    }

    this.divide = function (scalar) {
        this.vx /= scalar;
        this.vy /= scalar;
        return this;
    }
}

/**
 * @function: cycle(pos, max)
 * @desc: cycles from 0 to max based on pos, will cycle back to 0 if over max
 * @param number pos: position of max
 * @param number max: max number to cycle to
 */
function cycle(pos, max) {
    return (pos % max + max) % max;
}