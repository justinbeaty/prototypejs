//= require "update_helper"

/* UpdateHelper for Prototype <%= PROTOTYPE_VERSION %> (c) 2008-2009 Tobie Langel
 * 
 * UpdateHelper for Prototype is freely distributable under the same
 * terms as Prototype (MIT-style license).
 * For details, see the Prototype web site: http://www.prototypejs.org/
 * 
 * Include this file right below prototype.js. All messages
 * will be logged to the console.
 * 
 * Note: You can tune the level of warning by redefining
 * prototypeUpdateHelper.logLevel with one of the appropriate constansts
 * (UpdateHelper.Info, UpdateHelper.Warn or UpdateHelper.Error), e.g.:
 * 
 *     prototypeUpdateHelper.logLevel = UpdateHelper.Warn;
 *
 * This, for example, will prevent deprecation messages from being logged.
 * 
 *              THIS SCRIPT DOES NOT WORK IN INTERNET EXPLORER
 *--------------------------------------------------------------------------*/

var prototypeUpdateHelper = new UpdateHelper([
  {
    methodName: 'show',
    namespace: Element.Methods,
    message: 'Passing an arbitrary number of elements to Element.show is no longer supported.\n' +
      'Use [id_1, id_2, ...].each(Element.show) or $(id_1, id_2, ...).invoke("show") instead.',
    type: 'error',
    condition: function() { return arguments.length > 1 && !Object.isNumber(arguments[1]) }
  },
  
  {
    methodName: 'hide',
    namespace: Element.Methods,
    message: 'Passing an arbitrary number of elements to Element.hide is no longer supported.\n' +
      'Use [id_1, id_2, ...].each(Element.hide) or $(id_1, id_2, ...).invoke("hide") instead.',
    type: 'error',
    condition: function() { return arguments.length > 1 && !Object.isNumber(arguments[1]) }
  },
  
  {
    methodName: 'toggle',
    namespace: Element.Methods,
    message: 'Passing an arbitrary number of elements to Element.toggle is no longer supported.\n' +
      'Use [id_1, id_2, ...].each(Element.toggle) or $(id_1, id_2, ...).invoke("toggle") instead.',
    type: 'error',
    condition: function() { return arguments.length > 1 && !Object.isNumber(arguments[1]) }
  },
  
  {
    methodName: 'clear',
    namespace: Form.Element.Methods,
    message: 'Passing an arbitrary number of elements to Field.clear is no longer supported.\n' +
      'Use [id_1, id_2, ...].each(Form.Element.clear) or $(id_1, id_2, ...).invoke("clear") instead.',
    type: 'error',
    condition: function() { return arguments.length > 1 && !Object.isNumber(arguments[1]) }
  },
  
  {
    methodName: 'present',
    namespace: Form.Element.Methods,
    message: 'Passing an arbitrary number of elements to Field.present is no longer supported.\n' +
      'Use [id_1, id_2, ...].each(Form.Element.present) or $(id_1, id_2, ...).invoke("present") instead.',
    type: 'error',
    condition: function() { return arguments.length > 1 && !Object.isNumber(arguments[1]) }
  },

  {
    methodName: 'setStyle',
    namespace: Element.Methods,
    message: 'Use of uncamelized style-property names is no longer supported.\n' + 
      'Use either camelized style-property names or a regular CSS string instead (see online documentation).',
    type: 'error',
    condition: function(element, style) {
      return !Object.isString(style) && Object.keys(style).join('').include('-');
    }
  },
  
  {
    methodName: 'getElementsByClassName',
    namespace: document,
    message: 'document.getElementsByClassName has been deprecated, please use $$ instead.'
  },
  
  {
    methodName: 'getElementsByClassName',
    namespace: Element.Methods,
    message: 'Element#getElementsByClassName has been deprecated, please use Element#select instead.'
  },
  
  {
    methodName: 'immediateDescendants',
    namespace: Element.Methods,
    message: 'Element#immediateDescendants has been deprecated, please use Element#childElements instead.'
  },
  
  {
    methodName: 'getElementsBySelector',
    namespace: Element.Methods,
    message: 'Element#getElementsBySelector has been deprecated, please use Element#select instead.'
  },

  {
    methodName: 'toJSON',
    namespace: Hash,
    message: 'Hash.toJSON has been removed.\n' + 
      'Use the instance method Hash#toJSON or Object.toJSON instead.',
    type: 'error'
  },
  
  {
    methodName: 'remove',
    namespace: Hash.prototype,
    message: 'Hash#remove is no longer supported, use Hash#unset instead.\n' + 
      'Please note that Hash#unset only accepts one argument.',
    type: 'error'
  },
  
  {
    methodName: 'merge',
    namespace: Hash.prototype,
    message: 'Hash#merge is no longer destructive and now operates on a clone of the Hash instance.\n' + 
      'If you need a destructive merge, use Hash#update instead.',
    type: 'warn'
  },
  
  {
    methodName: 'reduce',
    namespace: Array.prototype,
    message: 'Array#reduce is no longer supported.\n' + 
      'This is due to an infortunate naming collision with Mozilla\'s own implementation of Array#reduce which differs completely from Prototype\'s implementation (it\'s in fact similar to Prototype\'s Array#inject).\n' + 
       'Mozilla\'s Array#reduce is already implemented in Firefox 3 (as part of JavaScript 1.8) and is about to be standardized in EcmaScript 3.1.',
    type: 'error'
  },
  
  {
    methodName: 'unloadCache',
    namespace: Event,
    message: 'Event.unloadCache has been deprecated.',
    type: 'error'
  },
  
  {
    methodName: 'create',
    namespace: Class,
    message: 'The class API has been fully revised and now allows for mixins and inheritance.\n' + 
      'You can find more about it here: http://prototypejs.org/learn/class-inheritance',
    condition: function() { return !arguments.length }
  }
]);

// Special casing for Hash.

(function() {
  var __properties = Object.keys(Hash.prototype).concat(['_object', '__properties']);
  
  var messages = {
    setting: new Template("Directly setting a property on an instance of Hash is no longer supported.\n" + 
    "Please use Hash#set('#{property}', #{value}) instead."),
    getting: new Template("Directly accessing a property of an instance of Hash is no longer supported.\n" + 
      "Please use Hash#get('#{property}') instead.")
  };
  
  function notify(property, value) {
    var message = messages[arguments.length == 1 ? 'getting' : 'setting'].evaluate({
      property: property,
      value: Object.inspect(value)
    });
    prototypeUpdateHelper.notify(message, 'error');
  }
  
  function defineSetters(obj, prop) {
    storeProperties(obj);
    if (obj.__properties.include(prop)) return;
    obj.__properties.push(prop);
    obj.__defineGetter__(prop, function() {
      checkProperties(this);
      notify(prop);
    });
    obj.__defineSetter__(prop, function(value) {
      checkProperties(this);
      notify(prop, value);
    });
  }
  
  function checkProperties(hash) {
    storeProperties(hash);
    var current = Object.keys(hash);
    if (current.length == hash.__properties.length)
      return;
    current.each(function(prop) {
      if (hash.__properties.include(prop)) return;
      notify(prop, hash[prop]);
      defineSetters(hash, prop);
    });
  }
  
  function storeProperties(h) {
    if (typeof h.__properties === 'undefined')
      h.__properties = __properties.clone();
    return h;
  }
  
  Hash.prototype.set = Hash.prototype.set.wrap(function(proceed, property, value) {
    defineSetters(this, property);
    return proceed(property, value);
  });

  $w('merge update').each(function(name) {
    Hash.prototype[name] = Hash.prototype[name].wrap(function(proceed, object) {
      for (var prop in object) defineSetters(this, prop);
      return proceed(object);
    });
  });

  $H(Hash.prototype).each(function(method) {
    var key = method.key;
    if (!Object.isFunction(method.value) || key == 'initialize') return;
    Hash.prototype[key] = Hash.prototype[key].wrap(function(proceed) {
      checkProperties(this);
      return proceed.apply(proceed, $A(arguments).splice(1));
    });
  });

  Hash.prototype.initialize = Hash.prototype.initialize.wrap(function(proceed, object) {
    storeProperties(this);
    for (var prop in object) defineSetters(this, prop);
    proceed(object);
  });
})();
  