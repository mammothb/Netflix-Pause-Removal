// ==UserScript==
// @name        Never-ending Netflix
// @namespace   *://www.netflix.com
// @include     http://www.netflix.com/*
// @include     https://www.netflix.com/*
// @version     1.5.0
// @grant       none
// @description Automatically clicks "Continue Playing", "Skip Intro", and "Play Next Episode"
// ==/UserScript==

// Dummy SetInterval (Gets cleared during netflix's load events)
setInterval(function() {}, 9999);
setInterval(function() {
  try {
    document.querySelector("[aria-label='Continue Playing']").click();
  }
  catch(e) {}
  try {
    document.querySelector("[aria-label='Skip Intro']").click();
  }
  catch(e) {}
  try {
    document.querySelector("[class='WatchNext-still-hover-container']").click();
  }
  catch(e) {}
}, 33);
