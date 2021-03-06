// /**
//  * @function: getHSLColor(xxx)
//  * @desc: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//  * @param string xxxx: xxxxxxxxxxxxxxxxxxxx
//  */
// window.getHSLColor = function (value) {
//   //value from 0 to 1
//   var hue = ((1 - value) * 120).toString(10);
//   return ["hsl(", hue, ",100%,50%)"].join("");
// }
// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * @function: AFTC.Color({params})
 * @desc: Color allows you to create, convert, lighten or darken colours and more.
 * ```
 * var color1 = new AFTC.Color(); // creates a random color
 * var color2 = new AFTC.Color({r:255,g:100,b:0}); // creates an RGB color
 * var color3 = new AFTC.Color({r:255,g:100,b:0,a:1}); // creates an RGBA color
 * log( color3.getHex() ); // Outputs the hex code of color 3
 * ```
 * @param object params: parameters object
 * @method lighten(percent,spectrum): lighten the color by precent and optional spectrum {r:bool,g;bool,b:bool}
 * @method darken(percent,spectrum): darken the color by precent and optional spectrum {r:bool,g;bool,b:bool}
 * @method randomizeColor: randomises the colour
 * @method getRGBString: returns the RGB value of the color
 * @method getRGBAString: returns the RGBA value of the color
 * @method getHexString: returns the HEX value of the color
 * @method getHex: returns the HEX value of the color
 * @method hex: returns the HEX value of the color
 * @method getRGB: returns the RGB value of the color
 * @method rgb: returns the RGB value of the color
 * @method getRGBA: returns the RGBA value of the color
 * @method rgba: returns the RGBA value of the color
 * @method setRGB: returns the RGB value of the color
 * @method setHex: returns the HEX value of the color
 * @return AFTC.Color
 * @link: https://codepen.io/AllForTheCode/pen/mLZRge
 */
AFTC.Color = function () {
    var me = this;
    var args = {
        r: false, g: false, b: false, a: false,
        hex: false
    };
    var params = {
        r: false,
        g: false,
        b: false,
        a: false,
    };

    argsToObject(arguments, args);


    function init() {
        // log(args);

        if (args.hex) {
            // log("HEX");
            params.hex = args.hex;
            initHex();
        } else if (!args.hex && !isBool(args.r) && !isBool(args.g) && !isBool(args.b) && !args.a) {
            // log("RGB");
            !args.r ? params.r = 0 : params.r = args.r;
            !args.g ? params.g = 0 : params.g = args.g;
            !args.b ? params.b = 0 : params.b = args.b;
            params.a = 1;
        } else if (!args.hex && !isBool(args.r) && !isBool(args.g) && !isBool(args.b) && !isBool(args.a)) {
            // log("RGBA");
            !args.r ? params.r = 0 : params.r = args.r;
            !args.g ? params.g = 0 : params.g = args.g;
            !args.b ? params.b = 0 : params.b = args.b;
            !args.a ? params.a = 0 : params.a = args.a;
        } else {
            // log("RANDOM");
            randomizeColor();
        }
    }


    function initHex() {
        args.hex = args.hex.replace("#", "");
        var HexBits = args.hex.match(/.{1,2}/g)
        params.r = hexToDec(HexBits[0]);
        params.g = hexToDec(HexBits[1]);
        params.b = hexToDec(HexBits[2]);
        params.a = 1;
    }


    function randomizeColor() {
        params.r = Math.round(Math.random() * 255);
        params.g = Math.round(Math.random() * 255);
        params.b = Math.round(Math.random() * 255);
        params.a = 1;
    }


    function alterByPercent(percent, r, g, b) {
        var step = 255 / 100; // step for 255 as a %

        function getValue(color, percent) {
            var currentP = parseInt((100 / 255) * color);
            var targetP = parseInt(currentP + percent);
            if (targetP > 100) {
                targetP = 100;
            }
            if (targetP < -100) {
                targetP = -100;
            }

            var newColor = Math.ceil(step * targetP);
            if (newColor > 255) {
                newColor = 255;
            }
            if (targetP < 0) {
                newColor = 0;
            }

            // log(percent + ": " + color + " = " + currentP + " > " + targetP + " = " + newColor);
            return newColor;
        }

        if (r) {
            params.r = getValue(params.r, percent);
        }
        if (g) {
            params.g = getValue(params.g, percent);
        }
        if (b) {
            params.b = getValue(params.b, percent);
        }
    }


    this.lighten = function (percent, spectrum) {
        if (!spectrum) {
            alterByPercent(percent, true, true, true);
        } else {
            var enableR = true,
                enableG = true,
                enableB = true;
            if (spectrum.r) {
                enableR = spectrum.r;
            }
            if (spectrum.g) {
                enableG = spectrum.g;
            }
            if (spectrum.b) {
                enableB = spectrum.b;
            }
            alterByPercent(percent, spectrum.r, spectrum.g, spectrum.b);
        }

    }

    this.darken = function (percent, spectrum) {
        if (!spectrum) {
            alterByPercent(-percent, true, true, true);
        } else {
            var enableR = true,
                enableG = true,
                enableB = true;
            if (spectrum.r) {
                enableR = spectrum.r;
            }
            if (spectrum.g) {
                enableG = spectrum.g;
            }
            if (spectrum.b) {
                enableB = spectrum.b;
            }
            alterByPercent(-percent, spectrum.r, spectrum.g, spectrum.b);
        }
    }


    // Utility functions
    // Calculates a number between two numbers at a specific increment
    function lerp(a, b, i) {
        return (1 - i) * a + i * b;
    };

    function hexToDec(v) {
        return parseInt(v, 16);
    }

    function decToHex(v) {
        var hex = v.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    // Public function
    this.fadeTo = function(r,g,b,steps){
        let color = this.getRGB();
        return this.fadeFromTo(color.r,color.g,color.b,r,g,b,steps);
    }

    this.fadeFromTo = function(r1,g1,b1,r2,g2,b2,steps){
        let colors = [];
        let colorVo = function(){
            this.r = 0;
            this.g = 0;
            this.b = 0;
        }

        let tick = 1 / (steps);
        let distFrom1 = 0;
        for(let i=0; i <= 1; i+=tick){


            // Ensure i gets to 1
            // distFrom1 = 1-i;
            // if (distFrom1<0.05){
            //     i = 1;
            // }
            // log(i + "    distFrom1:" + distFrom1);

            let color = new colorVo();
            color.r = Math.round(lerp(r1,r2,i));
            color.g = Math.round(lerp(g1,g2,i));
            color.b = Math.round(lerp(b1,b2,i));
            colors.push(color);

            // i = Math.round ((i+tick)*100 );
            // i /= 100;
        }
        return colors;
    }

    this.randomizeColor = function () {
        randomizeColor();
    }

    this.getRGBString = function () {
        var c = "RGB(" + params.r + "," + params.g + "," + params.b + ")";
        return c;
    }
    this.getRGBAString = function () {
        var c = "RGBA(" + params.r + "," + params.g + "," + params.b + "," + params.a + ")";
        return c;
    }
    this.getHexString = function () {
        var c = "#" + decToHex(params.r) + decToHex(params.g) + decToHex(params.b);
        c = c.toUpperCase();
        return c;
    }
    this.getHex = function () {
        return this.getHexString();
    }
    this.hex = function () {
        return this.getHex();
    }
    this.getRGB = function () {
        let v = {
            r:params.r,
            g:params.g,
            b:params.b
        };
        return v;
    }
    this.rgb = function () {
        return this.getRGB();
    }
    this.getRGBA = function () {
        let o = {
            r:params.r,
            g:params.g,
            b:params.b,
            a:params.a
        }
        return o;
    }
    this.rgba = function () {
        return this.getRGBA();
    }
    this.setRGB = function (r, g, b) {
        params.r = r;
        params.g = g;
        params.b = b;
    }
    this.setHex = function (hex) {
        args.hex = hex;
        initHex();
    }
    this.setR = function (v) {
        params.r = v;
    }
    this.r = function (v) {
        params.r = v;
    }
    this.getR = function () {
        return params.r;
    }
    this.setG = function (v) {
        params.g = v;
    }
    this.g = function (v) {
        params.g = v;
    }
    this.getG = function () {
        return params.g;
    }
    this.setB = function (v) {
        params.b = v;
    }
    this.b = function (v) {
        params.b = v;
    }
    this.getB = function () {
        return params.b;
    }
    this.setA = function (v) {
        params.a = v;
    }
    this.a = function (v) {
        params.a = v;
    }
    this.getA = function () {
        return params.a;
    }

    init();
}


/**
 * @function: getRandomColor()
 * @desc: returns a random RGB object o.r, o.g, o.g
 */
window.getRandomColor = function () {
    var c = new AFTC.Color();
    return c;
}
window.getRandomHexColor = function () {
    var c = new AFTC.Color();
    return c.getHex();
}
window.getRandomRGBString = function () {
    var c = new AFTC.Color();
    return c.getRGB();
}
window.getRandomRGBAString = function () {
    var c = new AFTC.Color();
    return c.getRGBA();
}
window.getRandomRGBColor = function () {
    var c = new AFTC.Color();
    return c.getRGB();
}
