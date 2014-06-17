imgCoverEffect
==============

JavaScript framework-independent solution for simulating CSS 'background-size: cover' effect on HTMLImageElement.

Optionally, horizontal and vertical alignments can be set by passing an object as the second parameter with the following available properties and values:
      x: 'left', 'center', 'right'
      y: 'top', 'middle', 'bottom'

USAGE:
      var image = document.createElement('img');
      imgCoverEffect(image, {x:'center', y:'middle'});
