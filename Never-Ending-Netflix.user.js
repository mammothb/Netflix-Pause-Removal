// ==UserScript==
// @name        Never-ending Netflix
// @namespace   *://www.netflix.com
// @include     http://www.netflix.com/*
// @include     https://www.netflix.com/*
// @version     1.6.0
// @grant       none
// @description Automatically clicks "Continue Playing", "Skip Intro",
//              and "Play Next Episode"
// ==/UserScript==

/**
 * Click the button if it is found
 */
function clickIfFound(button) {
  if (button) button.click();
}

setInterval(function () {
  clickIfFound(document.querySelector("[aria-label='Skip Intro']"));
  clickIfFound(document.querySelector("[aria-label='Continue Playing']"));
  clickIfFound(document.querySelector(
      "[class='WatchNext-still-hover-container']"));
  clickIfFound(document.querySelector("[aria-label^='Next episode in']"));
}, 33);

/*********************************************************************
 *            Implement additional seek functionality
 *********************************************************************/
let netflixSeeker = function () {
  // used when the user is spamming ctrl/shift+arrow
  let seekTime = {
    "from": null,
    "to": null
  };

  function showControls() {
    const scrubber = document.querySelector(".scrubber-bar");
    const eventOptions = {
      "bubbles": true,
      "button": 0,
      "currentTarget": scrubber
    };
    scrubber.dispatchEvent(new MouseEvent("mousemove", eventOptions));
  };

  function getCurrentTime() {
    return document.querySelector("video").currentTime;
  };

  function getDuration() {
    return document.querySelector("video").duration;
  };

  function seek(seconds) {
    seconds = Math.min(Math.max(seconds, 0), getDuration());
    console.log("seek from: ", getCurrentTime(), "to: ", seconds);
    showControls();

    const scrubber = document.querySelector(".scrubber-bar");
    const mouseX = Math.round(scrubber.getBoundingClientRect().x +
        scrubber.clientWidth * seconds / getDuration());
    const mouseY = Math.round(scrubber.getBoundingClientRect().y +
        scrubber.clientHeight / 2);
    const eventOptions = {
      "bubbles": true,
      "button": 0,
      "clientX": mouseX,
      "clientY": mouseY
    };
    scrubber.dispatchEvent(new MouseEvent("mouseover", eventOptions));
    window.setTimeout(function () {
      // simulate a click on the scrubber
      scrubber.dispatchEvent(new MouseEvent("mousedown", eventOptions));
      scrubber.dispatchEvent(new MouseEvent("mouseup", eventOptions));
      scrubber.dispatchEvent(new MouseEvent("mouseout", eventOptions));
    }, 10);
  }

  function incrementSeek(seconds) {
    const currentTime = getCurrentTime();
    let toTime = currentTime + seconds;
    if (currentTime === seekTime.from) {
      // user is probably spamming seek and the player hasn't had a
      // chance to update yet
      toTime = seekTime.to + seconds;
    }
    seekTime = {
      "from": currentTime,
      "to": toTime
    };
    seek(toTime);
  }

  function goToNext() {
    const nextEpisode = document.querySelector(
        "[aria-label='Next Episode']");
    if (nextEpisode) {
      nextEpisode.click();
    } else {
      seek(getDuration());
    }
  }

  function goToStart() {
    seek(-getDuration());
  }

  return {
    incrementSeek: incrementSeek,
    goToNext: goToNext,
    goToStart: goToStart
  }
}();

document.querySelector("body").addEventListener("keydown", function (e) {
  // Ctrl+arrow to skip 60sec and Shift+arrow to skip 5 mins
  let found = true;
  if (e.code === "ArrowRight" && e.shiftKey) {
    netflixSeeker.incrementSeek(5 * 60);
  } else if (e.code === "ArrowRight" && e.ctrlKey) {
    netflixSeeker.incrementSeek(60);
  } else if (e.code === "ArrowLeft" && e.shiftKey) {
    netflixSeeker.incrementSeek(-5 * 60);
  } else if (e.code === "ArrowLeft" && e.ctrlKey) {
    netflixSeeker.incrementSeek(-60);
  } else if (e.code === "KeyN") {
    netflixSeeker.goToNext();
  } else if (e.code === "KeyP") {
    netflixSeeker.goToStart();
  } else {
    found = false;
  }
  if (found) {
    e.stopPropagation();
    return false;
  }
});
