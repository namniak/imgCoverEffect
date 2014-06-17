imgCoverEffect
==============

A JavaScript framework-independent solution for simulating CSS 'background-size: cover' effect on HTMLImageElement.

Optionally, horizontal and vertical alignments can be set by passing an object **{x: value1, y: value2}** as the second parameter with the following available values:

- x: 'left', 'center', 'right'
- y: 'top', 'middle', 'bottom'

####Version 0.1

==============

##Usage
```
var image = document.createElement('img');
imgCoverEffect(image, {x: 'center', y: 'middle'});
```

##Install
```
bower install imgCoverEffect
```
