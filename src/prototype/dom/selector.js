/** section: DOM, related to: Prototype.Selector
 *  $$(cssRule...) -> [Element...]
 *
 *  Takes an arbitrary number of CSS selectors (strings) and returns a document-order
 *  array of extended DOM elements that match any of them.
 *
 *  Sometimes the usual tools from your DOM arsenal -- `document.getElementById` encapsulated
 *  by [[$]], `getElementsByTagName` and even Prototype's very own `getElementsByClassName`
 *  extensions -- just aren't enough to quickly find elements or collections of elements.
 *  If you know the DOM tree structure, you can simply resort to CSS selectors to get
 *  the job done.
 *
 *  ##### Quick examples
 *
 *      $$('div');
 *      // -> all DIVs in the document. Same as document.getElementsByTagName('div').
 *      // Nice addition, the elements you're getting back are already extended!
 *
 *      $$('#contents');
 *      // -> same as $('contents'), only it returns an array anyway (even though IDs must
 *      // be unique within a document).
 *
 *      $$('li.faux');
 *      // -> all LI elements with class 'faux'
 *
 *  The [[$$]] function searches the entire document. For selector queries on more specific
 *  sections of a document, use [[Element.select]].
 *
 *  ##### Supported CSS syntax
 *
 *  The [[$$]] function is just a shorthand for the standard querySelectorAll().
**/
var $$ = function() {
  return Array.from(document.querySelectorAll(Array.from(arguments).join(', ')));
};

/**
 * Prototype.Selector
**/
Prototype.Selector = (function() {

  /**
   *  Prototype.Selector.select(expression[, root = document]) -> [Element...]
   *  - expression (String): A CSS selector.
   *  - root (Element | document): A "scope" to search within. All results will
   *    be descendants of this node.
   *
   *  Searches `root` for elements that match the provided CSS selector and returns an
   *  array of extended [[Element]] objects.
  **/
  function select(selector, scope) {
    return $A((scope || document).querySelectorAll(selector));
  }

  /**
   *  Prototype.Selector.match(element, expression) -> Boolean
   *  - element (Element): a DOM element.
   *  - expression (String): A CSS selector.
   *
   *  Tests whether `element` matches the CSS selector.
  **/
  function match(element, expression) {
    return element.matches(expression);
  }

  /**
   *  Prototype.Selector.find(elements, expression[, index = 0]) -> Element
   *  - elements (Enumerable): a collection of DOM elements.
   *  - expression (String): A CSS selector.
   *  - index (Number): Numeric index of the match to return, defaults to 0.
   *
   *  Filters the given collection of elements with `expression` and returns the
   *  first matching element (or the `index`th matching element if `index` is
   *  specified).
  **/
  function find(elements, expression, index) {
    index = index || 0;
    const match = Prototype.Selector.match, length = elements.length;
    let matchIndex = 0;

    for (let i = 0; i < length; i++) {
      if (match(elements[i], expression) && index == matchIndex++) {
        return elements[i];
      }
    }
  }

  return {
    select: select,
    match: match,
    find: find
  };
})();
