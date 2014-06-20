imgCoverEffect
==============

A JavaScript framework-independent solution for simulating CSS 'background-size: cover' effect on HTMLImageElement.

##Syntax
```
imgCoverEffect(HTMLImageElement [, options]);
```
where options is an objects with the following available properties and values:
```
- alignX: 'left' (default) || 'center' || 'right'   // horizontal align
    
- alignY: 'top'  (default) || 'middle' || 'bottom'  // vertical align
    
- listenToLoad: true (default) || false             // load event listener
    
- watchResize: true (default) || false              // 
```

If no options object is passed, default values will apply.

####Version: 0.1

==============

##Usage:
```
1. With a newly created Image element

var img = new Image();
img.src = 'pathToImg';
document.body.appendChild(img);

imgCoverEffect(img, {
  alignX: 'center',
  alignY: 'middle'
});

The above code will automatically listen to 'load' event and adapt image on DOM resize

2. With existing image

img = document.getElementById('imgID');
imgCoverEffect(img, {
  alignX: 'center',
  alignY: 'middle'
  listenToLoad: false,  // suppose the function is called on 'load' event explicitly
  watchResize: true
});

```

##Install
```
bower install imgCoverEffect
```
