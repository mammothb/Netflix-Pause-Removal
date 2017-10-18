// ==UserScript==
// @name        Netflix Pause Removal
// @namespace   *://www.netflix.com
// @include     http://www.netflix.com/*
// @include     https://www.netflix.com/*
// @version     1.4.0
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
