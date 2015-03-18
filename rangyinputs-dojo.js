/**
ORIGINAL RANGYINPUTS ATTRIBUTION

 * @license Rangy Inputs, a jQuery plug-in for selection and caret manipulation within textareas and text inputs.
 * 
 * https://github.com/timdown/rangyinputs
 *
 * For range and selection features for contenteditable, see Rangy.
 * http://code.google.com/p/rangy/
 *
 * Depends on jQuery 1.0 or later.
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: 1.2.0
 * Build date: 30 November 2014
 */

/**
MODIFIED RANGYINPUTS ATTRIBUTION

 * @license Rangy Inputs, a Dojo/AMD plug-in for selection and caret manipulation within textareas and text inputs.
 * 
 * https://github.com/MesaCountyGIS/AMDrangyinputs
 
 Ryan Davison - Mesa County

 * Licensed under the MIT license.
 * Version: 1.0
 * Build date: 18 March 2015
 */


function isHostMethod(e,t){var n=typeof e[t];return"function"===n||!("object"!=n||!e[t])||"unknown"==n}function isHostProperty(e,t){return typeof e[t]!=UNDEF}function isHostObject(e,t){return!("object"!=typeof e[t]||!e[t])}function fail(e){window.console&&window.console.log&&window.console.log("RangyInputs not supported in your browser. Reason: "+e)}function adjustOffsets(e,t,n){return 0>t&&(t+=e.value.length),typeof n==UNDEF&&(n=t),0>n&&(n+=e.value.length),{start:t,end:n}}function makeSelection(e,t,n){return{start:t,end:n,length:n-t,text:e.value.slice(t,n)}}function getBody(){return isHostObject(document,"body")?document.body:document.getElementsByTagName("body")[0]}function getValueAfterPaste(e,t){var n=e.value,o=getSelection(e),a=o.start;return{value:n.slice(0,a)+t+n.slice(o.end),index:a,replaced:o.text}}function pasteTextWithCommand(e,t){e.focus();var n=getSelection(e);return setSelection(e,n.start,n.end),""==t?document.execCommand("delete",!1,null):document.execCommand("insertText",!1,t),{replaced:n.text,index:n.start}}function pasteTextWithValueChange(e,t){e.focus();var n=getValueAfterPaste(e,t);return e.value=n.value,n}var UNDEF="undefined",getSelection,setSelection,deleteSelectedText,deleteText,insertText,replaceSelectedText,surroundSelectedText,extractSelectedText,collapseSelection,testTextArea=document.createElement("textarea");if(getBody().appendChild(testTextArea),isHostProperty(testTextArea,"selectionStart")&&isHostProperty(testTextArea,"selectionEnd"))getSelection=function(e){var t=e.selectionStart,n=e.selectionEnd;return makeSelection(e,t,n)},setSelection=function(e,t,n){var o=adjustOffsets(e,t,n);e.selectionStart=o.start,e.selectionEnd=o.end},collapseSelection=function(e,t){t?e.selectionEnd=e.selectionStart:e.selectionStart=e.selectionEnd};else if(isHostMethod(testTextArea,"createTextRange")&&isHostObject(document,"selection")&&isHostMethod(document.selection,"createRange")){getSelection=function(e){var t,n,o,a,c=0,l=0,r=document.selection.createRange();return r&&r.parentElement()==e&&(o=e.value.length,t=e.value.replace(/\r\n/g,"\n"),n=e.createTextRange(),n.moveToBookmark(r.getBookmark()),a=e.createTextRange(),a.collapse(!1),n.compareEndPoints("StartToEnd",a)>-1?c=l=o:(c=-n.moveStart("character",-o),c+=t.slice(0,c).split("\n").length-1,n.compareEndPoints("EndToEnd",a)>-1?l=o:(l=-n.moveEnd("character",-o),l+=t.slice(0,l).split("\n").length-1))),makeSelection(e,c,l)};var offsetToRangeCharacterMove=function(e,t){return t-(e.value.slice(0,t).split("\r\n").length-1)};setSelection=function(e,t,n){var o=adjustOffsets(e,t,n),a=e.createTextRange(),c=offsetToRangeCharacterMove(e,o.start);a.collapse(!0),o.start==o.end?a.move("character",c):(a.moveEnd("character",offsetToRangeCharacterMove(e,o.end)),a.moveStart("character",c)),a.select()},collapseSelection=function(e,t){var n=document.selection.createRange();n.collapse(t),n.select()}}else getBody().removeChild(testTextArea),fail("No means of finding text input caret position");getBody().removeChild(testTextArea);var pasteText=function(e,t){var n=getValueAfterPaste(e,t);try{var o=pasteTextWithCommand(e,t);if(e.value==n.value)return pasteText=pasteTextWithCommand,o}catch(a){}return pasteText=pasteTextWithValueChange,e.value=n.value,console.log(n),n};deleteText=function(e,t,n,o){t!=n&&(setSelection(e,t,n),pasteText(e,"")),o&&setSelection(e,t)},deleteSelectedText=function(e){console.log(e),setSelection(e,pasteText(e,"").index)},extractSelectedText=function(e){var t=pasteText(e,"");return setSelection(e,t.index),t.replaced};var updateSelectionAfterInsert=function(e,t,n,o){var a=t+n.length;if(o="string"==typeof o?o.toLowerCase():"",("collapsetoend"==o||"select"==o)&&/[\r\n]/.test(n)){var c=n.replace(/\r\n/g,"\n").replace(/\r/g,"\n");a=t+c.length;var l=t+c.indexOf("\n");"\r\n"==e.value.slice(l,l+2)&&(a+=c.match(/\n/g).length)}switch(o){case"collapsetostart":setSelection(e,t,t);break;case"collapsetoend":setSelection(e,a,a);break;case"select":setSelection(e,t,a)}};insertText=function(e,t,n,o){setSelection(e,n),pasteText(e,t),"boolean"==typeof o&&(o=o?"collapseToEnd":""),updateSelectionAfterInsert(e,n,t,o)},replaceSelectedText=function(e,t,n){var o=pasteText(e,t);updateSelectionAfterInsert(e,o.index,t,n||"collapseToEnd")},surroundSelectedText=function(e,t,n,o){typeof n==UNDEF&&(n=t);var a=getSelection(e),c=pasteText(e,t+a.text+n);updateSelectionAfterInsert(e,c.index+t.length,a.text,o||"select")},define({getSelection:getSelection,setSelection:setSelection,deleteSelectedText:deleteSelectedText,deleteText:deleteText,insertText:insertText,replaceSelectedText:replaceSelectedText,surroundSelectedText:surroundSelectedText,extractSelectedText:extractSelectedText,collapseSelection:collapseSelection});