#imgCoverEffect

Pure JavaScript solution for simulating CSS 'background-size: cover' effect on HTMLImageElement with optional alignments and DOM resize watcher.

##Syntax
```
imgCoverEffect(HTMLImageElement [, options]);
```
Here the ```options``` is an extra object with the following available properties and values:
```
    alignX:      'left'(default) | 'center' | 'right'    // horizontal alignment
    alignY:      'top' (default) | 'middle' | 'bottom'   // vertical alignment
    watchResize:  true (default) |  false                // automatic DOM resize watcher
```

```watchResize``` option is turned on by default, which means the image will automatically adapt to fit its parent DOM element whenever its size changes. It's done using ```requestAnimationFrame```.

IMPORTANT: Make sure to disable the watcher when calling ```imgCoverEffect(...)``` from within parent's resize function to avoid multiple extra calls.

##Browsers Support
IE8+ and major browsers.

##Examples
Use with a newly created by Javascript Image element:

```
var img = new Image();         // our future background image
img.src = 'pathToImg';
document.body.appendChild(img);

imgCoverEffect(img, {
  alignX: 'center',
  alignY: 'middle'
});
```

Use with an already existing HTMLImageElement:

```
var img = document.getElementById('imgID');

imgCoverEffect(img, {
  alignX: 'right',
  alignY: 'bottom'
  watchResize: false    // suppose the function explicitly called on parent resize 
});

```

##Installation
```
bower install imgCoverEffect

npm install img-cover-effect
```
