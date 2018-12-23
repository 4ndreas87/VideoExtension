// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let startService = document.getElementById('startService');


function closeTab(activeTabID) {
    // Closes current tab. This part works for sure, but nothing else does.
    chrome.tabs.remove(ActiveTabID);
};

function addVidEndListener() {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
		// gets the current tab's integer ID
    	var tabID = t[0].id;
    	// WHaTEVER YOU DO< DON"T USE DOCUMENT FOR SEARCHING THROUHG HTML because it'll only search the html of the 
    	// popup and background
    	// this is kinda a nonsense line
    	// injects the 'code' string into the js of the page I think.
    	// code string should get the first video element in the page, add a listener for it ending,
    	// and, when it ends, close the tab.
		chrome.tabs.executeScript(tabID, {code: 
			"var test = document.getElementsByTagName('video')[0]; \
			console.log(test) \
			test.addEventListener('ended', function() {return true})"},
			function(a) {
				// apparently the results of 'code' are returned in an array
				if(a[0] == true){
					closeTab(tabID)
				}
			}
		);
	});
};

startService.addEventListener("click", addVidEndListener)

