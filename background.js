// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
	return;
});

// This is just for when I want the action to be done when you click the extension, rather than the popup.
// to change back and forth, delete '"default_popup": "popup.js"' from the browser action of the manifest.


chrome.browserAction.onClicked.addListener(function() {
	// Here is where the checking to see if there is a video somethwere would go.
	// maybe there's some nonsense workaround I can do.
	//var vidElement = $('video')[0];
	//console.log(vidElement);
    //document.vidElement.addEventListener('ended',myHandler,false);
	// I think adds a listener for the end of the video?

    	// Closes current tab
        chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
    		var tabID = t[0].id
    		chrome.tabs.remove(tabID)
		});
		var nextButton = document.querySelectorAll(".npbutton button-next")[0];
		nextButton.click();
    });

