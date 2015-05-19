## Folder structure

NativeScript gives you the flexibility to place files pretty much wherever you want, but having a few conventions can aid with maintainability, especially on large apps.

### Folder structure overview

Let's look at the folder structure JustMeme uses from the outside in. Here's what the structure looks like top level:

``` shell
.
├── app
│   └── [[ continued below ]]
├── node_modules
│   └── ...
├── package.json
└── platforms
    └── ...
```

NativeScript enforces the use of `app` and `platform` directories, where `app` contains your development code and `platform` contains the platform-specific code NativeScript needs to build native iOS and Android apps.

> **Note**: If you're using NativeScript as part of Telerik AppBuilder you won't have a `platforms` folder, as AppBuilder performs all iOS and Android builds for you in the cloud, thus removing the need for these files to be locally available on your development machine.

Next let's look inside the `app` directory, where your development code resides. Here's a simplified version of JustMeme's structure:

``` shell
.
├── App_Resources
│   └── ...
├── images
│   ├── background.png
│   └── ...
├── lib
│   └── ...
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

* **App_Resources**: This is a NativeScript-enforced directory. It contains your platform-specific files such as icons, splash screens and configuration files (e.g. Info.plist, AndroidManifest.xml, and so forth).
* **images**: This is where all the images your application uses should live. If you have a lot of images it makes sense to group them into further directories. For instance JustMeme uses `icons` and `templates` directories to group its images.
* **lib**: This is where third-party libraries that aren't available on npm should reside. Grouping all third-party libraries makes it easy to exclude these files from linting tools (e.g. JSHint, JSCS).
* **shared**: This directory contains all code shared between views. As with images, it makes sense to logically group these files into subdirectories.
* **tns_modules**: This is a NativeScript-enforced directory that contains the NativeScript core modules.
* **views**: Each view in your app should have a directory in this folder that contains its CSS, JavaScript, and XML files. If you have a large number of views you may wish to create additional subdirectories to group these views.

The advantage of this approach is that it's really easy to tell where files should go. Building a new view? That goes in `views`. Building a model object for use throughout the app? That goes in `shared`. Want to use a JavaScript library you found on GitHub but isn't in npm? That goes in `lib`.

This approach also means that all your development code lives within the `shared` and `views` directories, which makes these files really easy to target with tooling, which is the topic of chapter 3. The remaining sections in this chapter contain additional tips about using this structure.

### Exclude the `platforms` folder from source control

The `platforms` folder contains NativeScript-generated code for each platform your app runs on. Because this code is generated it doesn't belong in source control. If you're a git user you can exclude this folder by adding `platforms` to your `.gitignore`.

### Exclude the `node_modules` folder from source control

The `node_modules` folder can be generated from your package.json, so it should also should be excluded from source control. If you're a git user you can exclude the folder by adding `node_modules/` to your `.gitignore`.

