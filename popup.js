// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let startService = document.getElementById('startService');

startService.onclick = function(element) {
	// this and every other version of finding the video element always return undefined, so I can never add a listener to them
	// I have no idea if the video ended thing even works because I've never been able to get the video HTML element
    document.getElementsByTagName("video")[0].addEventListener('ended',myHandler,false);
	// I think adds a listener for the end of the video?
    function myHandler(e) {
    	// Closes current tab. This part works for sure, but nothing else does. 
        chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
    		var tabID = t[0].id
    		chrome.tabs.remove(tabID)
		});
    };
};
