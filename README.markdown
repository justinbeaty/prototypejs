Prototype 2
===========

***This is a fork of the original Prototype framework, trimmed down to remove a lot
of legacy code. Beware of legacy documentation still lingering around.***

#### An object-oriented JavaScript framework ####

Prototype is a JavaScript framework that aims to ease development of dynamic 
web applications.  It offers a familiar class-style OO framework, extensive
Ajax support, higher-order programming constructs, and easy DOM manipulation.

### Targeted platforms ###

Prototype 2.x targets modern, standard-compliant ES6 browsers.

Using Prototype
---------------

To use this version of Prototype in your application, at the moment you need
to build it from source and copy `dist/prototype.js` to a suitable location.
Then include it in your HTML like so:

    <script type="text/javascript" src="/path/to/prototype.js"></script>

### Building Prototype from source ###

`prototype.js` is a composite file generated from many source files in 
the `src/` directory. To build Prototype, you'll need:

* a copy of the Prototype source tree, either from a distribution tarball or
  from the Git repository (see below)
* Ruby 1.8.2 or higher (<http://www.ruby-lang.org/>)
* Rake--Ruby Make (<http://rake.rubyforge.org/>)
* RDoc, if your Ruby distribution does not include it

From the root Prototype directory:

* `rake dist` will preprocess the Prototype source using Sprockets and 
  generate the composite `dist/prototype.js`
* `rake package` will create a distribution tarball in the 
  `pkg/` directory

Contributing to Prototype
-------------------------

Fork https://github.com/wiz78/prototype.git, write your patches, test them, create a PR... :)

Documentation
-------------

Please see the online Prototype API: <http://api.prototypejs.org>.
