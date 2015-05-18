## Folder structure

Intro...

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

