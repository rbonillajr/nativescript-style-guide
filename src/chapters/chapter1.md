<div class="chapter">
	<hr>

	<h2>Best Practices</h2>
	<p>The following are a set of best practices to adhere to when building NativeScript apps.</p>

	<h3>Use NativeScript's MVVM implementation</h3>
	<p>NativeScript has a robust MVVM implementation that allows you to bind data in JavaScript objects to native UI elements; use it, as it'll make your code a lot cleaner.</p>

	<p>As an example suppose you want to display a list of characters in a ListView control. Here's an implementation that doesn't use MVVM:</p>

<pre class="line-numbers"><code class="language-markup">&lt;!-- page.xml --&gt;
&lt;Page navigatedTo="load"&gt;
    &lt;ListView id="characters" /&gt;
&lt;/Page&gt;</code></pre>

<pre class="line-numbers"><code class="language-javascript">// page.js
var labelModule = require( "ui/label" ),
    viewModule = require( "ui/core/view" );

var characters = [ "Sonic", "Tails", "Knuckles" ];
exports.load = function( args ) {
    var list = viewModule.getViewById( args.object, "characters" );
    list.items = characters;
    list.on( "itemLoading", function( args ) {
        if ( !args.view ) {
            args.view = new labelModule.Label();
        }
        args.view.text = characters[ args.index ];
    });
}</code></pre>

	<p>This code shows a list of characters as you'd expect, and it even updates the ListView as you add or remove items from the <code>characters</code> array.</p>

	<p>However, there are a few things about this implementation that aren't so great. First your JavaScript has to know specific things about your view, for instance the <code>"characters"</code> id attribute of the ListView. Second, your JavaScript is responsible for generating the UI for each item in ListView. This violates the <a href="http://en.wikipedia.org/wiki/Separation_of_concerns">separation of concerns design principle</a>, and it's just ugly—no one wants to type <code>new labelModule.Label()</code>.</p>

	<p>Here's an example that works the same but uses an MVVM implementation:</p>

<pre class="line-numbers"><code class="language-markup">&lt;-- page.xml --&gt;
&lt;Page navigatedTo="load"&gt;
    &lt;ListView items="{{ characters }}"&gt;
        &lt;ListView.itemTemplate&gt;
            &lt;Label text="{{ name }}" /&gt;
        &lt;/ListView.itemTemplate&gt;
    &lt;/ListView&gt;
&lt;/Page&gt;</code></pre>

<pre class="line-numbers"><code class="language-javascript">// page.js
var observableModule = require( "data/observable" ),
    observableArray = require( "data/observable-array" ),
    data = new observableModule.Observable();

data.set( "characters", new observableArray.ObservableArray([
    { name: "Sonic" }, { name: "Tails" }, { name: "Knuckles" }
]));

exports.load = function( args ) {
    args.object.bindingContext = data;
}</code></pre>

	<p>Here, the JavaScript code now knows nothing about the view's XML. JavaScript creates the data structure, and the XML code binds to the data using the <code>{{ }}</code> syntax. The MVVM approach also allows you to move the ListView's item template definition out of JavaScript, and into XML (with the <code>&lt;ListView.itemTemplate&gt;</code> element), which is far more readable.</p>

	<h3>Divide your code into small modular files</h3>
	<p>Like the MVVM pattern, using small modular files makes your code more readable and maintainable. For example, consider the code from the previous example:</p>

<pre class="line-numbers"><code class="language-javascript">// page.js
var observableModule = require( "data/observable" ),
    observableArray = require( "data/observable-array" ),
    data = new observableModule.Observable();

data.set( "characters", new observableArray.ObservableArray([
    { name: "Sonic" }, { name: "Tails" }, { name: "Knuckles" }
]));

exports.load = function( args ) {
    args.object.bindingContext = data;
}</code></pre>

	<p>This application's model data is mixed in with view code. The disadvantage of this approach being, if you want to reuse this character data on other pages in your app, you're going to need to duplicate code. Let's look at how you can refactor this code to make it more modular.</p>

	<p>A good first step is to move the data itself into a separate file:</p>

<pre class="line-numbers"><code class="language-javascript">// characterData.js
var observableModule = require( "data/observable" ),
    observableArray = require( "data/observable-array" ),
    data = new observableModule.Observable();

data.set( "characters", new observableArray.ObservableArray([
    { name: "Sonic" }, { name: "Tails" }, { name: "Knuckles" }
]));

module.exports = data;</code></pre>

<pre class="line-numbers"><code class="language-javascript">// page.js
var characterData = require( "./characterData" );

exports.load = function( args ) {
    args.object.bindingContext = characterData;
}</code></pre>

	<p>This change not only cleans up your view's code, but also moves the character data to a more reusable location.</p>

	<blockquote>These examples assume that all files are in the same folder. In a more realistic example you should have a more complex structure to organize your files. Project folder structure is the topic of <a href="#chapter2">Chapter 2</a>.</blockquote>

	<p>In the example above `characterData.js` acts as a view model, which you can think of as a model object's whose explicit purpose is to interact with a view. As a further enhancement, you may choose to additionally abstract out your model objects into their own files. Here's what that looks like for our character example:</p>

<pre class="line-numbers"><code class="language-javascript">// Character.js
function Character( name ) {
    this.name = name;
}
module.exports = Character;</code></pre>

<pre class="line-numbers"><code class="language-javascript">// characterData.js
var observableModule = require( "data/observable" ),
    observableArray = require( "data/observable-array" ),
    Character = require( "./Character" ),
    data = new observableModule.Observable();

data.set( "characters", new observableArray.ObservableArray([
    new Character( "Sonic" ),
    new Character( "Tails" ),
    new Character( "Knuckles" )
]));

module.exports = data;</code></pre>

<pre class="line-numbers"><code class="language-javascript">// page.js
var characterData = require( "./characterData" );

exports.load = function( args ) {
    args.object.bindingContext = characterData;
}</code></pre>

	<p>Here, you use a <code>Character.js</code> file to contain your character model data, which your view model (<code>characterData.js</code>) uses. The advantage again is in the reusability that this approach offers. Any character-specific code can go in <code>Character.js</code>, and any file in your app that needs that functionality can use it without worrying about dependencies.</p>

	<h3>Use npm modules to solve problems</h3>
	<p><a href="https://www.npmjs.com/">npm</a> has over 100,000 modules. If you have a problem there's a decent chance that someone has already written a module to solve that problem for you. Not every npm module is going to work with NativeScript, for example modules that depend on the DOM (e.g. Kendo UI), but a whole lot of them will. Let's look at a few that do.</p>

	<p>Suppose you want to sort the array of characters from our previous example into alphabetical order.

	<h3>Embrace the platform</h3>
	<p>???</p>
</div>
