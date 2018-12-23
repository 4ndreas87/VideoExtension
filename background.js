// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
	return;
});

chrome.browserAction.onClicked.addListener(function() {
	/*document.getElementsByTagName('video')[0].addEventListener('ended',myHandler,false);
	// I think adds a listener for the end of the video?
    function myHandler(e) {
    	// Closes current tab
        chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
    		var tabID = t[0].id
    		chrome.tabs.remove(tabID)
		});
    }*/
});