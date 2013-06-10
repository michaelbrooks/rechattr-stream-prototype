rechattr-stream-prototype
============

Prototype streaming UI.

Structure
--------

The `js/main.js` file initializes the high level controllers of the application and kicks things off.

The `js/generator.js` file defines how content is randomly generated, through a set of internal timers.
When new content is created within this class, it triggers events which are detected by `js/main.js`.
These events are passed on for rendering.
For example, when a new poll is generated, a `poll` event is triggered on the generator,
resulting in a call to the `renderPoll` method on the rendering class.

The rendering class, in `js/rendering.js`, defines a set of methods for handling different content types.
It uses several [Backbone.js](http://backbonejs.org/) (actually [Backbone.Marionette.js](http://marionettejs.com/)) views
for rendering the different types of content.

The views rely on [Underscore.js](http://underscorejs.org/) templates defined at the bottom of `index.html` to generate markup.
The styles are defined in `css/main.less`, which is to be compiled to `css/main.css`.


Installation
-----------

To install the dependencies needed to build, you need to have [Node.js](http://nodejs.org/) installed.

If you've got that, you next need to install Bower, a front-end package manager, and LESS, for compiling LESS to CSS files:

```bash
$ npm install -g bower less
```

Next, use bower to install the required packages (like jquery, bootstrap, etc.):

```bash
$ bower install
```

Lastly, you should compile the css:

```bash
$ lessc css/main.less css/main.css
```

If you don't want to type this every time you change the CSS, you can
install and set up a file watcher to recompile whenever the less file changes:

```bash
$ npm install lesswatch --global
$ lesswatch css css
```
