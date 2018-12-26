let startService = document.getElementById('startService');

function addVidEndListener() {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
		// gets the current tab's integer ID
    	var tabID = t[0].id;
    	// inserts this code into the js of the current active tab
    	// the code gets the first video element running on the page, and adds a listener it.
    	// when the video ends it sends a message of bool true back to the extension 
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
			// sometimes there are problems with just closing the tab.
			chrome.tabs.query({'active': true, 'currentWindow': true}, function(a) {
				// gets the current tab's integer ID, closes it
   				var tabID1 = a[0].id;
   				// IMPORTANT ********* IMPORTANT ************* IMPORTANT ********** IMPORTANT
   				// The reason it wouldn't work is because this is in the popup file. 
   				// it seems like it stops working when the popup closes
   				// which is why it wouldn't close on video end.
   				// putting all this into background should hopefully fix it
   				// it may also fix the putting functions together.
   				// IMPORTANT ********* IMPORTANT ************* IMPORTANT ********** IMPORTANT
   				chrome.tabs.remove(tabID1, function(){});
   			});
		};
	});
};




startService.addEventListener('click', addVidEndListener);

actOnVidEnd();