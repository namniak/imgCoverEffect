#imgCoverEffect

Pure JavaScript (framework-independent) solution for simulating CSS 'background-size: cover' effect on HTMLImageElement.

##Syntax:
```
imgCoverEffect(HTMLImageElement [, options]);
```
Here the **options** is an extra object with the following available properties and values:
```
    alignX:      'left'(default) || 'center' || 'right'    // horizontal align             (String)
    alignY:      'top' (default) || 'middle' || 'bottom'   // vertical align               (String)
    listenToLoad: true (default) ||  false                 // load event listener          (Boolean)
    watchResize:  true (default) ||  false                 // automatic DOM resize watcher (Boolean)
```
The function includes a 'load' event listener by default, used for automatic aspect ratio detection.
You can disable the **listenToLoad** option if it interferes with other 'load' events bound with the HTMLImageElement.

Also, **watchResize** option is turned on by default, which means the image will automatically adapt to fit its parent DOM element whenever its size changes. However, if you intend to call *imgCoverEffect(...)* from within some rendering function, say, on 'resize' event bound with the parent, you need to disable this option to avoid multiple extra calls.

If no **options** object is passed, default values will apply.

####Version: 0.1

==============

##Examples:
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

Use with already existing HTMLImageElement:

```
var img = document.getElementById('imgID');

imgCoverEffect(img, {
  alignX: 'right',
  alignY: 'bottom'
  listenToLoad: false,  // suppose the image element has an explicit 'load' event listener and our function is called on that event
  watchResize: false    // suppose the function is called from within parent's size update function
});

```

##Installation
```
bower install imgCoverEffect
```
