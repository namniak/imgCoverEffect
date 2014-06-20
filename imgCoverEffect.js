/*! imgCoverEffect (https://github.com/namniak/imgCoverEffect)
 *  Version:  0.1
 *
 *  MIT License (http://www.opensource.org/licenses/mit-license.html)
 *  Copyright (c) 2014 Vadim Namniak
 */

function imgCoverEffect(image, opts) {
    'use strict';

    if (!(image instanceof HTMLImageElement)) {
        throw new Error('From imgCoverEffect(): Element passed as a parameter is not an instance of HTMLImageElement.');
    }

    if (opts.listenToLoad && typeof opts.listenToLoad !== 'boolean') {
        throw new Error('From imgCoverEffect(): "listenToLoad" property must be set to a Boolean if the option is specified.');
    }

    if (opts.watchResize && typeof opts.watchResize !== 'boolean') {
        throw new Error('From imgCoverEffect(): "watchResize" property must be set to a Boolean if the option is specified.');
    }

    var parent = image.parentNode;
    var lastParentWidth = null;
    var lastParentHeight = null;
    var currParentWidth = null;
    var currParentHeight = null;
    var aspectRatio = null;

    // set default styles
    parent.style.overflow = 'hidden';
    parent.style.position = 'relative'; // to apply overflow with absolutely positioned image child element, can be also set to 'absolute' or 'fixed' if needed
    image.style.position = 'absolute';
    image.style.top = 0;
    image.style.left = 0;
    image.style.zIndex = -1;

    // set events
    if (opts.listenToLoad === false) {
        if (!image.naturalWidth || !image.naturalHeight) {
            throw new Error('From imgCoverEffect(): Unable to detect image sizes because HTMLImageElement has not been loaded yet. Enable "listenToLoad" option or set an explicit "load" event listener on the image when calling this function.');
        }
        resizeImg();
    } else {
        if (image.addEventListener) {
            image.addEventListener('load', resizeImg, false);
        } else if (image.attachEvent) {
            image.attachEvent('onload', resizeImg);
        }
    }

    function resizeImg() {
        // set DOM resize watcher on the parent element
        if (opts.watchResize !== false) {
            requestAnimationFrame(resizeImg);
        }

        if (!currParentWidth && !currParentHeight) {
            // needs to fire once after the image is loaded
            aspectRatio = image.naturalWidth / image.naturalHeight;
        }

        currParentWidth = parent.clientWidth;
        currParentHeight = parent.clientHeight;

        // check if parent was resized and the image needs to adjust
        if (currParentWidth !== lastParentWidth || currParentHeight !== lastParentHeight) {

            if (currParentWidth >= currParentHeight) {
                image.width = currParentWidth;
                image.height = image.width / aspectRatio;

                // check how the new image height fits the parent element
                if (image.height < currParentHeight) {
                    // adjust sizes accordingly when the current image height is too small to cover its parent
                    image.height = currParentHeight;
                    image.width = image.height * aspectRatio;
                }
            } else {
                image.height = currParentHeight;
                image.width = image.height * aspectRatio;

                // check how the new image width fits the parent element
                if (image.width < currParentWidth) {
                    // adjust sizes accordingly when the current image width is too small to cover its parent
                    image.width = currParentWidth;
                    image.height = image.width / aspectRatio;
                }
            }

            lastParentWidth = currParentWidth;
            lastParentHeight = currParentHeight;

            // set horizontal align
            if (opts.alignX === 'left' || !opts.alignX) {
                image.style.left = 0;
            } else if (opts.alignX === 'center') {
                image.style.left = (currParentWidth - image.width) / 2 + 'px';
            } else if (opts.alignX === 'right') {
                image.style.left = currParentWidth - image.width + 'px';
            } else {
                throw new Error('From imgCoverEffect(): Unsupported horizontal align value is used. ' +
                    'Property "alignX" can only be set to one of the following values: "left", "center", or "right".');
            }

            // set vertical align
            if (opts.alignY === 'top' || !opts.alignY) {
                image.style.top = 0;
            } else if (opts.alignY === 'middle') {
                image.style.top = (currParentHeight - image.height) / 2 + 'px';
            } else if (opts.alignY === 'bottom') {
                image.style.top = currParentHeight - image.height + 'px';
            } else {
                throw new Error('From imgCoverEffect(): Unsupported vertical align value is used. ' +
                    'Property "alignY" can only be set to one of the following values: "top", "middle", or "bottom".');
            }

        }
    }
}

/*! requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 https://gist.github.com/paulirish/1579671
 MIT license
 */

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
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