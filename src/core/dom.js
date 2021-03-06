/**
 * @function: setHTML(elementOrId,html,mode="set");
 * @desc: Quick shortcut for outputting html to an element
 * ```
 * setHTML("header","Welcome");
 * ```
 * @param elementOrId stringIdOrHtmlElement: the element or the element id you wish to set the html of
 * @param html string: the html string to insert into your element
 * @param mode string: the mode to set the html content of the element, set || append || prepend, defaults to set
 * @alias: html
 * @link: https://codepen.io/AllForTheCode/pen/KRbLER
 */
window.setHTML = function (elementOrId, str, mode) {
        let ele;
        if (typeof (elementOrId) === "string") {
            ele = document.getElementById(elementOrId);
            if (!ele) {
                ele = document.querySelector(elementOrId);
            }
        } else {
            ele = elementOrId;
        }
    
        if (ele) {

            if (mode){
                mode = mode.toLowerCase();
            }
    
            switch (mode) {
                case "append":
                    if (ele.innerHTML == ""){
                        ele.innerHTML += str;
                    } else {
                        ele.innerHTML += "<br>" + str;
                    }
                    
                    break;
                case "prepend":
                    ele.innerHTML = str + "<br>" + ele.innerHTML;
                    break;
                default:
                    ele.innerHTML = str;
                    break;
            }
    
        } else {
            return "setHTML(): Usage error: Unable to retrieve element id or use element [" + elementOrId + "]";
        }
    }
window.html = function (elementOrId, str, mode) { window.setHTML(elementOrId, str, mode); }


/**
 * @function: getElementOffsetTop(elementId)
 * @desc: Gets an elements top offset
 * @param elementId string: the element ID you wish to get the top offset of
 * @link: https://codepen.io/AllForTheCode/pen/GdPaLr
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
 * @function: centerAbsoluteElement(elementId)
 * @desc: Center element that is absolute positioned
 * @param elementId string: element or id of element to center
 * @link: https://codepen.io/AllForTheCode/pen/ZRGabV
 */
window.centerAbsoluteElement = function (elementId) {
	var element = document.getElementById(elementId);
	if (!element) {
		throw ("AFTC.js > centerAbsoluteElement(elementOrElementId): ERROR! elementId supplied was not found on the DOM!");
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









/**
 * @function: scrollToElement(elementId, duration, offset)
 * @desc: Scroll to element on page
 * @param elementId string: ID of element you wish to scroll to
 * @param duration float: Duration in seconds
 * @param offset number: How much to offset scroll by
 * @link: https://codepen.io/AllForTheCode/pen/eKNeVq
 */
window.scrollToElement = function (elementId, arg_duration, offset) {
    var ele = getElementById(elementId);
    var targetY = getElementOffsetTop(elementId);
    if (typeof (offset) != "undefined") {
        targetY += parseFloat(offset);
    }

    // If you dont want scroll just use this next line and return
    //window.scroll(0, targetY);

    var startY = document.documentElement.scrollTop,
        currentY = document.documentElement.scrollTop,
        distance = Math.abs(targetY - startY),
        duration = arg_duration * 1000,
        startTime = null,
        endTime,
        step = 0;

    // Prevent run if at location +/- 3 pixels
    if (startY > (targetY - 3) && startY < (targetY + 3)) {
        return false;
    }

    var direction = "scroll up";
    if (targetY > startY) {
        direction = "scroll down";
    }

    // log("scrollToElement(): startY = " + startY)
    // log("scrollToElement(): targetY = " + targetY)
    // log("scrollToElement(): distance = " + distance)
    // log("scrollToElement(): currentY = " + currentY)
    // log("scrollToElement(): direction = " + direction)



    var animate = function (t) {
        if (!startTime) {
            startTime = t;
            endTime = t + duration;
            step = (distance / duration);
        }

        // 1st run startTime and endTime are undefined and NaN, prevent run
        if (!endTime) {
            // log("prevent run");
            requestAnimationFrame(animate);
            return;
        }

        currentY = document.documentElement.scrollTop;

        if (direction == "scroll down") {
            var nextY = startY + (step * (t - startTime));
            if (nextY > targetY) {
                nextY = targetY;
            }
            // var msg = "";
            // msg += "start = " + startTime.toFixed(2);
            // msg += "   end = " + endTime.toFixed(2);
            // msg += "   startY = " + startY.toFixed(2);
            // msg += "   targetY = " + targetY.toFixed(2);
            // msg += "   currentY = " + currentY.toFixed(2);
            // msg += "   step = " + step.toFixed(2);
            // msg += "   nextY = " + nextY.toFixed(2);
            // log(msg);

            if (nextY >= targetY) {
                delete startTime;
                delete endTime;
                delete duration;
                delete step;
                window.scrollTo(0, targetY);
                // log("scroll down animation done");
                // log("-------------------------------\n\n\n");
            } else {
                window.scrollTo(0, nextY);
                requestAnimationFrame(animate);
            }
        } else {
            var nextY = startY - (step * (t - startTime));
            if (nextY < targetY) {
                nextY = targetY;
            }
            if (nextY <= targetY) {
                delete startTime;
                delete endTime;
                delete duration;
                delete step;
                window.scrollTo(0, targetY);
            } else {
                window.scrollTo(0, nextY);
                requestAnimationFrame(animate);
            }
        }
    }
    animate();
}




/**
 * @function: getElementPos(element)
 * @desc: Will return the left (x) and top (y) position of an element
 * ```
 * let pos = getElementPos(myElement);
 * ```
 * @param element HTMLElement: The element to get the position of
 * @alias: getOffset
 * @link: 
 */
window.getElementPos = function(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { left: x, top: y };
}
window.getOffset = function(el) { window.getElementPos(el); }