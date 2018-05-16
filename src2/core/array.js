/*
 * Author: Darcey.Lloyd@gmail.com
 */


/**
 * @function: arrayRemoveIndex(arr,index)
 * @desc: remove a specified index from an array
 * @param array arr: the array you wish to remove an index on
 * @param number index: the array index you wish to remove
 * @return: array
 */
window.arrayRemoveIndex = function (array, index) {
    return array.splice(index);
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
 * @function: arrayContains(haystack,needle)
 * @desc: Check to see if your array contains something you want to find
 * @param array arr: the array you wish to search
 * @param string needle: what you want to find
 */
window.arrayContains = function (haystack, needle) {
    if (haystack.indexOf(needle) > -1) { return true; } else { return false; }
}

/**
 * @function: arrayRemove(arr,item)
 * @desc: removes an item from an array
 * @param array arr: the array you wish to search and remove from
 * @param string item:  index at which a given element can be found
 * @alias: arrayRemoveItem
 */
window.arrayRemove = function (arr, item) {
    if (!window.arrayContains(item)) { return this; }
    return arr.splice(arr.indexOf(item), 1);
}
window.arrayRemoveItem = function (arr, item) { return arrayRemove(arr, item); }

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
window.arrayGetMin = function (arr) {
    return Math.min.apply(Math, arr);
}
window.getMinFromArray = function (arr) { return arrayGetMin(arr); }
window.arrayMin = function (arr) { return arrayGetMin(arr); }

/**
 * @function: arrayShuffle(arr)
 * @desc: shuffles an array using a random method out of a choice of 2
 * @param array arr: the array to shuffle
 * @alias: shuffleArray2
 * @alias: shuffleArray3
 */
window.arrayShuffle = function (arr) {
    var methodNo = getRandom(2, 3);
    log(methodNo);
    return window["arrayShuffle" + methodNo](arr);
    var fn = "arrayShuffle" + methodNo;
}
window.shuffleArray = function (arr) { return arrayShuffle(arr); }


/**
 * @function: arrayShuffle2(arr)
 * @desc: shuffles an array (method 2)
 * @param array arr: the array to shuffle
 */
window.arrayShuffle2 = function (arr) {
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

/**
 * @function: arrayShuffle3(a)
 * @desc: shuffles an array (method 2)
 * @param array a: the array to shuffle
 */
window.arrayShuffle3 = function (a) {
    var x, t, r = new Uint32Array(1);
    for (var i = 0, c = a.length - 1, m = a.length; i < c; i++ , m--) {
        crypto.getRandomValues(r);
        x = Math.floor(r / 65536 / 65536 * m) + i;
        t = a[i], a[i] = a[x], a[x] = t;
    }

    return a;
}