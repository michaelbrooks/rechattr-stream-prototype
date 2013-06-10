rechattr-stream-prototype
============

Prototype streaming UI.

Installation
-----------

To install the dependencies needed to build, you need to have [Node.js](http://nodejs.org/) installed.

If you've got that, you next need to install bower, a front-end package manager, and less, for compiling less to css files:

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
