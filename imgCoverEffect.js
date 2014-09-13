/*! imgCoverEffect (https://github.com/namniak/imgCoverEffect)
 *  Version:  0.2.0
 *
 *  MIT License (http://www.opensource.org/licenses/mit-license.html)
 *  Copyright (c) 2014 Vadim Namniak
 */

function imgCoverEffect(image,opts) {
    'use strict';

    // set default options
    opts.watchResize = (opts.watchResize !== false);
    opts.alignX = opts.alignX || 'left';
    opts.alignY = opts.alignY || 'top';

    if (!(image instanceof HTMLImageElement)) {
        throw new Error('From imgCoverEffect(): Element passed as a parameter is not an instance of HTMLImageElement.');
    }

    if (typeof opts.watchResize !== 'boolean') {
        throw new Error('From imgCoverEffect(): "watchResize" property must be set to a Boolean when the option is specified.');
    }

    if (!image.parentNode) {
        throw new Error('From imgCoverEffect(): passed HTMLImageElement has no parent DOM element.');
    }

    var parent = image.parentNode;
    var lastParentWidth = 0;
    var lastParentHeight = 0;
    var currParentWidth = 0;
    var currParentHeight = 0;
    var parentAspect = 0;
    var imgAspect = 0;
    var isIElt9 = (image.naturalWidth === undefined);  // detect IE<9 where naturalWidth/naturalHeight is unsupported

    // set default styles
    parent.style.overflow = 'hidden';
    parent.style.position = 'relative'; // to apply overflow with absolutely positioned image child element, can be also set to 'absolute' or 'fixed' if needed
    image.style.position = 'absolute';
    image.style.top = 0;
    image.style.left = 0;
    image.style.zIndex = -1;

    // set events
    if ((!isIElt9 && image.naturalWidth && image.naturalHeight) || (isIElt9 && image.width && image.height)) {
        resizeImg();
    } else {
        if (image.addEventListener) {
            image.addEventListener('load',resizeImg,false);
        } else if (image.attachEvent) {
            image.attachEvent('onload',resizeImg);
        }
    }

    function resizeImg() {
        // set DOM resize watcher on the parent element
        if (opts.watchResize === true) {
            requestAnimationFrame(resizeImg);
        }

        if (!imgAspect) {
            imgAspect = (!isIElt9) ? (image.naturalWidth / image.naturalHeight) : (image.width / image.height);
        }

        currParentWidth = parent.clientWidth;
        currParentHeight = parent.clientHeight;
        parentAspect = currParentWidth / currParentHeight;

        // check if parent was resized and the image needs to adjust
        if ((currParentWidth !== lastParentWidth) || (currParentHeight !== lastParentHeight)) {

            // set image size
            if (parentAspect >= imgAspect) {
                image.width = currParentWidth;
                image.height = image.width / imgAspect;
            } else {
                image.width = currParentHeight * imgAspect;
                image.height = currParentHeight;
            }

            lastParentWidth = currParentWidth;
            lastParentHeight = currParentHeight;

            // set horizontal alignment
            if (String(opts.alignX).toLowerCase() === 'left') {
                image.style.left = 0;
            } else if (String(opts.alignX).toLowerCase() === 'center') {
                image.style.left = (currParentWidth - image.width) / 2 + 'px';
            } else if (String(opts.alignX).toLowerCase() === 'right') {
                image.style.left = currParentWidth - image.width + 'px';
            } else {
                throw new Error('From imgCoverEffect(): Unsupported horizontal align value. ' +
                    'Property "alignX" can only be set to one of the following values: "left", "center", or "right".');
            }

            // set vertical alignment
            if (String(opts.alignY).toLowerCase() === 'top') {
                image.style.top = 0;
            } else if (String(opts.alignY).toLowerCase() === 'middle') {
                image.style.top = (currParentHeight - image.height) / 2 + 'px';
            } else if (String(opts.alignY).toLowerCase() === 'bottom') {
                image.style.top = currParentHeight - image.height + 'px';
            } else {
                throw new Error('From imgCoverEffect(): Unsupported vertical align value. ' +
                    'Property "alignY" can only be set to one of the following values: "top", "middle", or "bottom".');
            }
        }
    }
}

/*! requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 *  https://gist.github.com/paulirish/1579671
 *  MIT license
 */

(function() {
    var lastTime = 0;
    var vendors = ['ms','moz','webkit','o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback,element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0,16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());