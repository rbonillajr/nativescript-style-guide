## Folder structure

NativeScript gives you the flexibility to place files pretty much wherever you want, but having a few conventions can aid with maintainability, especially on large apps.

### Folder structure overview

Here is our recommended folder structure, showing a few of the files from the JustMeme app:

``` shell
.
├── app
│   └── [[ continued below ]]
├── node_modules
│   ├── gulp
│   ├── gulp-jshint
│   └── ...
├── package.json
└── platforms
    └── ...
```

NativeScript enforces the use of a `app` and `platform` directories, where `app` contains your development code and `platform` contains the platform-specific code NativeScript needs to build native iOS and Android apps.

> **Note**: If you're using NativeScript as part of Telerik AppBuilder you won't have a `platforms` folder, as AppBuilder performs all iOS and Android builds for you in the cloud, thus removing the need for these files to be locally available on your development machine.

Thus the only thing to note is the `package.json` file and its associated `node_modules` directory. 

``` shell
.
├── App_Resources
│   └── ...
├── images
│   ├── background.png
│   └── ...
├── lib
│   └── ...
├── node_modules
│   ├── lodash
│   ├── nativescript-social-share
│   └── ...
├── shared
│   ├── analytics.js
│   ├── navigation.js
│   ├── utilities.js
│   └── ...
├── tns_modules
│   └── ...
├── views
│   ├── create-meme
│   │   ├── create-meme.css
│   │   ├── create-meme.js
│   │   └── create-meme.xml
│   ├── home
│   │   ├── home.css
│   │   ├── home.js
│   │   └── home.xml
│   └── ...
├── app.css
├── app.js
└── package.json
```

Here's the intention of each of these directories:

### Exclude the `platforms` folder from source control

The `platforms` folder contains NativeScript-generated code for each platform your app runs on. Because this code is generated it doesn't belong in source control. If you're a git user you can exclude this folder by adding `platforms` to your `.gitignore`.

### Exclude the `node_modules` folder from source control

The `node_modules` folder can be generated from your package.json, so it should also should be excluded from source control. If you're a git user you can exclude the folder by adding `node_modules/` to your `.gitignore`.

