## Folder structure

The most contentious religious debates in the software world occur when deciding on naming conventions. Here are the folder and file names that have worked for us.

### Folder structure overview

Here is our recommended folder structure:

``` shell
.
├── app
│   ├── app
│   │   ├── app.css
│   │   ├── app.js
│   │   ├── images
│   │   │   └── ...
│   │   ├── lib
│   │   │   └── ...
│   │   ├── shared
│   │   │   ├── css
│   │   │   │   └── ...
│   │   │   ├── models
│   │   │   │   └── ...
│   │   │   ├── utils
│   │   │   │   ├── images.js
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── views
│   │   │   └── ...
│   │   └── ...
│   ├── App_Resources
│   │   ├── android
│   │   └── ios
│   └── tns_modules
│       └── ...
└── platforms
    └── ...
```

The following sections provide more specific advice based on this structure.

### Exclude the `platforms` folder from source control

The `platforms` folder contains NativeScript-generated code for each platform your app runs on. Because this code is generated it doesn't belong in source control. If you're a git user you can exclude this folder by adding `platforms` to your `.gitignore`.

### Exclude the `node_modules` folder from source control

The `node_modules` folder can be generated from your package.json, so it should also should be excluded from source control. If you're a git user you can exclude the folder by adding `node_modules/` to your `.gitignore`.

### Create an `images.js` helper file

To avoid duplicating image paths it's helpful to have a single `images.js` utility file that contains all image paths that your app needs. As an example, given the folder structure shown above, suppose the `images` folder contains a `logo.png` file.

``` shell
.
└── app
    └── app
        ├── app.css
        ├── app.js
        └── images
            └── logo.png
```

You can then write the following `images.js` utility that grabs this image's source:

``` javascript
var imageSource = require( "image-source" );

module.exports = {
    logo: imageSource.fromFile( "~/app/images/logo.png" )
};
```

With this utility in place you can use `images.js` in your views:

``` javascript
var images = require( "../shared/utils/images" );

exports.load = function( args ) {
    var page = args.object;
    page.bindingContext = { logoSource: images.logo };
}
```

And uses it in your XML:

``` markup
<Page loaded="load">
    <Image source="{{ logoSource }}" />
</Page>
```