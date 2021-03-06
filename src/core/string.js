/**
 * @function: limitLengthInWords(str, maxWords)
 * @desc: Limit a string in length of words
 * @param str string: the original string to limit
 * @param maxWords number: the number of words you wish to limit to
 * @return object: {output:string,remaining:number}
 * @link: https://codepen.io/AllForTheCode/pen/xjMdye
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
 * @param s string: input string
 * @link: https://codepen.io/AllForTheCode/pen/BxMRER
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
 * @param input string: the string you wish to escape
 * @link: https://codepen.io/AllForTheCode/pen/PerGRJ
 */
//
// function escapeHtml(unsafe) {
//     return unsafe
//          .replace(/&/g, "&amp;")
//          .replace(/</g, "&lt;")
//          .replace(/>/g, "&gt;")
//          .replace(/"/g, "&quot;")
//          .replace(/'/g, "&#039;");
//  }
//
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
 * @function: cutStringTo(input, len)
 * @desc: sets the length of a string from left to right
 * @param input string: what string do you want to set the length of?
 * @param length number: the length you want the string to be
 * @alias: cutStringTo
 * @alias: cutString
 * @alias: cutStringLength
 * @alias: setStrLen
 * @alias: trimStringLength
 * @link: https://codepen.io/AllForTheCode/pen/VxJKEm
 */
window.cutStringTo = function (s, len) {
	return s.substring(0, len);
}
window.cutString = function (s, len) { return cutStringTo(s,len); }
window.cutStringLength = function (s, len) { return cutStringTo(s,len); }
window.setStrLen = function (s, len) { return cutStringTo(s,len); }
window.setStringLength = function (s, len) { return cutStringTo(s,len); }
window.trimStringLength = function (s, len) { return cutStringTo(s,len); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * @function: trimStringBy(input, trimBy)
 * @desc: Trims the length of a string by a value
 * @param input string: The string you want to trim
 * @param trimBy number: How many characters do you want to trim off the end
 * @alias: tTrim
 * @link: https://codepen.io/AllForTheCode/pen/BxgLvr
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
 * @alias: lTrim
 * @link: https://codepen.io/AllForTheCode/pen/wXayva
 */
window.lTrim = function (str, by) {
	return str.substring(by, str.length);
}
window.leftTrim = function (str, by) { return lTrim(str, by); }





/**
 * @function: getFileExtension(input)
 * @desc: Attempts to get the file extension from a file path string
 * @param string str: the file path string
 * @link: https://codepen.io/AllForTheCode/pen/OZeRqv
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
 * @link: https://codepen.io/AllForTheCode/pen/OZeRqv
 */
window.getFileExtension2 = function (input) {
	return input.slice((input.lastIndexOf(".") - 1 >>> 0) + 2);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




/**
 * @function: getLastPartOfUrl(url)
 * @desc: Gets the last part of a URL
 * @param string url: url to process
 * @link: https://codepen.io/AllForTheCode/pen/gzNwNv
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
 * @link: https://codepen.io/AllForTheCode/pen/QrXGWY
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
 * @link: https://codepen.io/AllForTheCode/pen/xxxxxxx
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
 * @link: https://codepen.io/AllForTheCode/pen/xxxxxxx
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
 * @link: https://codepen.io/AllForTheCode/pen/xxxxxxx
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
 * @link: https://codepen.io/AllForTheCode/pen/xxxxxxx
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
 * @link: https://codepen.io/AllForTheCode/pen/xxxxxxx
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


