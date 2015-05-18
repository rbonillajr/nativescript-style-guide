## Best Practices

The following are a set of best practices to adhere to when building NativeScript apps.

### Use NativeScript's MVVM implementation

NativeScript has a robust MVVM implementation that allows you to bind data in JavaScript objects to native UI elements; use it, as it'll make your code a lot cleaner.

As an example of this MVVM approach in use let's refer to the create meme page in JustMeme. Here's a gif that shows the page in action:

<img src="images/create-meme.gif" style="height: 450px; float: left; margin: 1em;">

And here's a simplified snippet of the XML that builds this UI:

``` markup
<Image imageSource="{{ memeImage }}" />

<TextField hint="Top text" text="{{ topText }}" />
<TextField hint="Bottom text" text="{{ bottomText }}" />

<Label text="Text Size" />
<Slider minValue="10" maxValue="100" value="{{ fontSize }}" />

<Label text="Black Text" />
<Switch checked="{{ isBlackText }}" />
```

The crux of this page's implementation is responding to user actions. As soon as the user types some text, or adjusts the slider, or toggles the switch, you have to update the image the user sees. The hardest implementation detail here is actually detecting when those changes occur—that is, how do you know when the user types in the TextField, or slides the slider?

Because JustMeme uses NativeScript's observables and MVVM implementation, however, the implementation is actually quite easy.

``` javascript
var observable = require("data/observable");
var imageManipulation = require("../../shared/image-manipulation/image-manipulation");

// The Meme object's constructor
function Meme() {
    var that = this;

    // Listen for all property changes and call draw
    this.addEventListener(observable.Observable.propertyChangeEvent, function() {
        that.draw();
    });
};

// Have the Meme object extend the NativeScript Observable object
Meme.prototype = new observable.Observable();

Meme.prototype.draw = function() {
    // The code that actually draws text on the image
    var image = imageManipulation.addText({
        image: this.image,
        topText: this.topText,
        bottomText: this.bottomText,
        fontSize: this.fontSize,
        isBlackText: this.isBlackText
    });
    this.set("image", image);
};
```

Don't worry too much about the details of what this code is doing. The key thing to notice is how this code interacts with the UI, or more specifically, that it doesn't. Notice how there's no need to reference individual UI elements, or to listen for text box changes or switch toggles. Instead this code just listens for property changes:

``` javascript
this.addEventListener(observable.Observable.propertyChangeEvent, function() {
    that.draw();
});
```

Every time any property on the meme object bound to the UI changes, NativeScript fires a property change event, and the meme object's `draw()` function runs and updates the image.

Decoupling a UI from its JavaScript logic is the key principal of the MVVM architecture, and it makes all sorts of things possible. For instance you can easily change things in the UI without worrying about breaking the backing JavaScript code. Because the Meme object is not coupled to any specific UI it's also reusable. You'll find the Meme object used in several different places throughout JustMeme.

### Use npm modules to solve problems

[npm](https://www.npmjs.com/) has over 100,000 modules. If you have a problem there's a decent chance that someone has already written a module to solve that problem for you. Not every npm module is going to work with NativeScript, for example modules that depend on the DOM (e.g. Kendo UI), but a whole lot of them will. Let's look at a few that do.

Remember the create meme page from before? If not I've included a gif of it again below as a reminder.

<img src="images/create-meme.gif" style="height: 250px; float: left; margin: 1em;">

When we were originally developing this app we had a problem with this page, specifically with the Text Size slider. We redraw the image on each property change, and if the user takes the slider and goes nuts with it, NativeScript is going to generate a ton of events.

Which is fine, except drawing an image dozens of times a second is not exactly the most advisable thing to do from a performance perspective. Some high-end devices were up for the challenge, but our low-end Android devices never stood a chance. What we needed was to add some basic rate limiting. We could've rolled our own, but that would be silly because [underscore](http://underscorejs.org/) and [lodash](https://lodash.com/) already have really good implementations. If you look at the Meme object you'll now see the following code:

``` javascript
var _ = require("../../node_modules/lodash/index");

function Meme() {
    var that = this;
    var debouncedRefresh = _.debounce(function() {
        that.refresh();
    }, 50, { leading: true });
    this.addEventListener(observable.Observable.propertyChangeEvent, function() {
        debouncedRefresh();
    });
}
...
```

You can refer lodash's docs for [a full explanation of how `_.debounce()` works](https://lodash.com/docs#debounce), but essentially it ensures a function is not called every n milliseconds, in this case 50. The key here is not the specific implementation, but rather that we were able to solve a tricky people fairly easily by using existing solutions instead of rolling our own.

This same convenience applies to third-party NativeScript modules as well, as they are also stored on npm. For instance, the JustMeme app allows users to share their memes through Facebook, Twitter, SMS, etc, and that functionality is also implemented with an npm module. Here's the code from the same Meme object:

``` javascript
var socialShare = require("../../node_modules/nativescript-social-share/social-share");

function Meme() {
    ...
}
Meme.prototype.share = function() {
    socialShare.shareImage(this.image);
}
...
```

And with that, JustMeme users can share their creations with the world:

![](images/ios-share.png)
![](images/android-share.png)

If you're wondering what other NativeScript modules are out there, do a [search for “nativescript” on npm](https://www.npmjs.com/search?q=nativescript) and look around.