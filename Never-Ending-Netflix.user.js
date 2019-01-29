// ==UserScript==
// @name        Never-ending Netflix
// @namespace   *://www.netflix.com
// @include     http://www.netflix.com/*
// @include     https://www.netflix.com/*
// @version     1.6.0
// @grant       none
// @description Automatically clicks "Continue Playing", "Skip Intro", and "Play Next Episode"
// ==/UserScript==

/**
 * Click the button if it is found
 */
function clickIfFound(button) {
  if (button) button.click();
}

setInterval(function() {
  clickIfFound(document.querySelector("[aria-label='Skip Intro']"));
  clickIfFound(document.querySelector("[aria-label='Continue Playing']"));
  clickIfFound(document.querySelector("[class='WatchNext-still-hover-container']"));
}, 33);
