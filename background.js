// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
	return;
});

// This is just for when I want the action to be done when you click the extension, rather than the popup.
// to change back and forth, delete '"default_popup": "popup.js"' from the browser action of the manifest.


function closeTab(ID) {
    // Closes current tab. This part works for sure, but nothing else does.
    chrome.tabs.remove(ID);
};

function actOnVidEnd(ID) {
	chrome.runtime.onMessage.addListener(function(message, sender, func){
		if (message == true) {
			console.log("ASDFASDFADSFGSDFGSFGHSERTA$EWTRHWSGH")
		}
	});
} 

// hopefully this works?
chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
	// gets the current tab's integer ID
   	var tabID = t[0].id;
   	actOnVidEnd(tabID);
});



/*
    	// Closes current tab
        chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
    		var tabID = t[0].id
    		chrome.tabs.remove(tabID)
		});
		var nextButton = document.querySelectorAll(".npbutton button-next")[0];
		nextButton.click();
    });

*/