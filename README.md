AMD Rangy Inputs
============

A small Dojo/AMD module for selection and caret manipulation within textareas and text inputs.

AMD Rangy Inputs was created to be able to use Tim Down's great plug-in in a Dojo environment
where jQuery was not desired. The code in this module has only been changed a little bit from
the original plugin and basically just had jQuery removed and an AMD define function added.




Example
-------

Imagine a simple textarea such as:

    <textarea id="test">Foo bar</textarea>

You can get the user's selection using

    var elementId = document.getElementById("test");
    var sel = getSelection(elementId);
    alert(sel.start + ", " + sel.end);

To select the word "bar":

    setSelection(elementId, 4, 7);

Other methods are listed below. Example code refers to the example textarea above.

API
===

Note that in IE, the element must have the focus for any of the following methods to work, which can be achieved by calling its focus() method before calling the method.

###`getSelection(elementId)`

Returns an object representing the user selection within the text input or textarea element.

The object returned has the following properties:

* `start`: The character index of the start position of the selection
* `end`: The character index of the end position of the selection
* `length`: The number of characters selected
* `text`: The selected text

Note that in IE the textarea or text input must have the focus before calling this method. You can ensure this by calling the focus() method of the element.

**Example**

    elementId.focus();
    var sel = getSelection(elementId);
    alert(sel.start + ", " + sel.end);

###`setSelection(elementId, Number start[, Number end])`

Selects the text within the text input or textarea element between the specified start and end character indices.



**Example**

To select the word "bar":

    setSelection(elementId, 4, 7);
    
    
###`collapseSelection(elementId, Boolean toStart)`

Collapses the selection to an insertion point (caret) either at the start of the current selection if toStart is true or the end of the current selection otherwise.



**Example**

To collapse the selection to the start:

    collapseSelection(elementId, true);

###`deleteText(elementId, Number start, Number end, Boolean moveSelection)`

Deletes the text within the text input or textarea element between the specified start and end character indices and optionally places the caret at the position where the deleted text had been if moveSelection is true.

**Example**

To delete the word "foo" from the example and place the caret where "foo" had been:

    deleteText(elementId, 0, 3, true);

###`deleteSelectedText(elementId)`

Deletes the currently selected text within the text input or textarea element and places the caret at the position where the deleted text had been.


**Example**

    deleteSelectedText(elementId);

###`extractSelectedText(elementId)`

Deletes the currently selected text within the text input or textarea element, places the caret at the position where the deleted text had been and returns the text that was deleted.

**Example**

    var extracted = extractSelectedText(elementId);
    alert(extracted);

###`insertText(elementId, String text, Number pos[, String selectionBehaviour])`

Inserts the specified text at the specified character position within the text input or textarea element and optionally updates the selection depending on the value of selectionBehaviour. Possible values are:

* **"select"**: Selects the inserted text
* **"collapseToStart"**: Collapses the selection to a caret at the start of the inserted text
* **"collapseToEnd"**: Collapses the selection to a caret at the end of the inserted text 

If no value is supplied for `selectionBehaviour`, the selection is not changed and left at the mercy of the browser (placing the caret at the start is not uncommon when the textarea's value is changed). 


**Example**

To insert the word "baz" between "foo" and "bar" and place the caret immediately after "baz":

    insertText(elementId, " baz", 3, "collapseToEnd");

###`replaceSelectedText(elementId, String text[, String selectionBehaviour])`

Replaces the currently selected text in the text input or textarea element with the specified text and optionally updates the selection depending on the value of selectionBehaviour. Possible values are: 

* **"select"**: Selects the inserted text
* **"collapseToStart"**: Collapses the selection to a caret at the start of the inserted text
* **"collapseToEnd"**: Collapses the selection to a caret at the end of the inserted text 

If no value is supplied for `selectionBehaviour`, "collapseToEnd" is assumed.


**Example**

To replace the selection with the word "baz" (or insert "baz" at the the caret position if no text is selected):

    replaceSelectedText(elementId, "baz");

To do the same thing but select "baz" afterwards:

    replaceSelectedText(elementId, "baz", "select");

###`surroundSelectedText(elementId, String textBefore, String textAfter[, String selectionBehaviour])`

Surrounds the currently selected text in the text input or textarea element with the specified pieces of text and optionally updates the selection depending on the value of `selectionBehaviour`. Possible values are:

* **"select"**: Selects the text that was surrounded
* **"collapseToStart"**: Collapses the selection to a caret at the start of the surrounded text
* **"collapseToEnd"**: Collapses the selection to a caret at the end of the surrounded text

If no value is supplied for `selectionBehaviour`, "select" is assumed.


**Example**

To surround the selection with HTML &lt;b&gt; tags:

    surroundSelectedText(elementId, "<b>", "</b>");
