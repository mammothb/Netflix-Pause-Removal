// ==UserScript==
// @name        Netflix Pause Removal
// @namespace   *://www.netflix.com
// @match       *://www.netflix.com/watch/*
// @version     1.3.0
// @grant       none
// @description Automatically clicks "continue playing"
// ==/UserScript==
setInterval(function() {}, 9999);  // Dummy SetInterval (Gets cleared during netflix's load events)
setInterval(function() {
  try {
    document.querySelector("[aria-label='Continue Playing']").click();
  }
  catch(e) {}
}, 33);
