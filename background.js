// not sure if necessary
'use strict';

// not sure if necessary
chrome.runtime.onInstalled.addListener(function() {
	return;
});


function addVidEndListener() {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
		// gets the current tab's integer ID
    	var tabID = t[0].id;
    	// inserts this code into the js of the current active tab
    	// the code gets the first video element running on the page, and adds a listener it.
    	// when the video ends it sends a message, bool true, back to the extension 
    	// (no need for extension ID because it isn't cross extension communication)
		chrome.tabs.executeScript(tabID, {code:
			"var vid = document.getElementsByTagName('video')[0]; \
			vid.onended = function() { \
				chrome.runtime.sendMessage(true); \
			};"
		});
	});
};


function actOnVidEnd() {
	// when the extension recieves the message that the video has ended (just true in this case)
	// (might need to be changed later to confirm sender), closes the current (streamplay) tab
	// hopefully later it will open the next video
	chrome.runtime.onMessage.addListener(function(message, sender, func){
		if (message == true) {
			// clicks all the links through until it gets to the next episode.
			chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
				// gets the current tab's integer ID, closes it
   				var tabID = t[0].id;
   				chrome.tabs.remove(tabID);
   			});
		};
	});
};




chrome.browserAction.onClicked.addListener(addVidEndListener);

actOnVidEnd();