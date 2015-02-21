<div class="chapter">
	<hr>

	<h2>Folder structure</h2>
	<p>The most contentious religious debates in the software world occur when deciding on naming conventions, so to set the tone of this <i>opinionated</i> guide, folder structure seems like a good place to start.</p>

	<h3>Folder structure overview</h3>
	<p>Here is our recommended folder structure:</p>

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

	<p>The following sections provide more specific advice based on this structure.</p>

	<h3>Exclude the <code>platforms</code> folder from source control</h3>
	<p>The <code>platforms</code> folder contains NativeScript-generated code for each platform your app runs on. Because this code is generated it doesn't belong in source control. If you're a git user you can exclude this folder by adding <code>platforms/</code> to your <code>.gitignore</code>.</p>

	<h3>Exclude the <code>node_modules</code> folder from source control</h3>
	<p>The <code>node_modules</code> folder can be generated from your package.json, so it should also should be excluded from source control. If you're a git user you can exclude the folder by adding <code>node_modules/</code> to your <code>.gitignore</code>.</p>
</div>