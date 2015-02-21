## Folder structure

The most contentious religious debates in the software world occur when deciding on naming conventions, so to set the tone of this *opinionated* guide, folder structure seems like a good place to start.

### Folder structure overview

Here is our recommended folder structure:

<pre><code class="language-shell">.
├── app
│   ├── App_Resources
│   │   ├── android
│   │   └── ios
│   ├── app.css
│   ├── app.js
│   ├── css
│   │   └── ...
│   ├── lib
│   │   └── ...
│   ├── models
│   │   └── ...
│   ├── node_modules
│   │   └── ...
│   ├── package.json
│   ├── tns_modules
│   │   └── ...
│   └── utilities
│   │   └── ...
│   └── views
│   │   └── ...
│   └── view-models
│   │   └── ...
└── platforms
├── android
└── ios
</code></pre>

The following sections provide more specific advice based on this structure.

### Exclude the `platforms` folder from source control

The `platforms` folder contains NativeScript-generated code for each platform your app runs on. Because this code is generated it doesn't belong in source control. If you're a git user you can exclude this folder by adding `platforms` to your `.gitignore`.

### Exclude the `node_modules` folder from source control

The `node_modules` folder can be generated from your package.json, so it should also should be excluded from source control. If you're a git user you can exclude the folder by adding `node_modules/` to your `.gitignore`.