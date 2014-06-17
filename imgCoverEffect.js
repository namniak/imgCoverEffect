/**
 * imgCoverEffect is a JavaScript framework-independent solution 
 * for simulating CSS 'background-size: cover' effect on HTMLImageElement (<img>).
 *
 * Optionally, horizontal and vertical alignments can be set
 * by passing an object as the second parameter with the following available properties and values:
 *      x: 'left', 'center', 'right'
 *      y: 'top', 'middle', 'bottom'
 *
 * USAGE:
 *      var image = document.createElement('img');
 *      imgCoverEffect(image, {x:'center', y:'middle'});
 *
 * @version 0.1
 * @author Vadim Namniak
 */

var imgCoverEffect = function(image, align) {
	'use strict';

    if (!(image instanceof HTMLImageElement)) {
        throw new Error('From imgCoverEffect(): Element passed as a parameter is not an instance of HTMLImageElement.');
    }

    var aspectRatio = image.naturalWidth / image.naturalHeight;
    var screenW = window.innerWidth;
    var screenH = window.innerHeight;

    // set default styles
    image.style.position = 'absolute';
    image.style.top = 0;
    image.style.left = 0;
    image.style.margin = 0;

    if (screenW >= screenH) {
        // set image sizes for landscape screen orientation
        image.width = screenW;
        image.height = image.width / aspectRatio;

        // check how the new image height fits the window
        if (image.height < screenH) {
            // adjust the sizes accordingly when the current image height
            // is too small to cover the screen
            image.height = screenH;
            image.width = image.height * aspectRatio;
        }
    } else {
        // set image sizes for portrait screen orientation
        image.height = screenH;
        image.width = image.height * aspectRatio;

        // check how the new image width fits the window
        if (image.width < screenW) {
            // adjust the sizes accordingly when the current image width
            // is too small to cover the screen
            image.width = screenW;
            image.height = image.width / aspectRatio;
        }
    }

    if (align) {
        // horizontal align
        if (align.x === 'left' || !align.x) {
            image.style.left = 0;
        } else if (align.x === 'center') {
            image.style.left = (screenW - image.width) / 2 + 'px';
        } else if (align.x === 'right') {
            image.style.left = screenW - image.width + 'px';
        } else {
            throw new Error('From imgCoverEffect(): Unknown horizontal align value is used. ' +
                'Property "x" can only be set to one of the following values: "left", "center", or "right".')
        }

        // vertical align
        if (align.y === 'top' || !align.y) {
            image.style.top = 0;
        } else if (align.y === 'middle') {
            image.style.top = (screenH - image.height) / 2 + 'px';
        } else if (align.y === 'bottom') {
            image.style.top = screenH - image.height + 'px';
        } else {
            throw new Error('From imgCoverEffect(): Unknown vertical align value is used. ' +
                'Property "y" can only be set to one of the following values: "top", "middle", or "bottom".')
        }
    }

};