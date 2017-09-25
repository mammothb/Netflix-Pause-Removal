// ==UserScript==
// @name        Netflix Pause Removal
// @namespace   *://www.netflix.com
// @match       *://www.netflix.com/watch/*
// @version     1.2.0
// @grant       none
// @description Automatically clicks "continue playing"
// ==/UserScript==
setInterval(function(){}, 9999); //Dummy SetInterval (Gets cleared during netflix's load events)
setInterval(function(){try {document.getElementsByClassName("button continue-playing")[0].click();}catch(e){}}, 33);
