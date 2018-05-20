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
    return Math.random().toString((len*3)).substr(2, len);
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
 * @desc: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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