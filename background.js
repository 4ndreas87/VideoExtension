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
				chrome.runtime.sendMessage('test sequence for message 4443211'); \
			};"
		});
	});
};


function actOnVidEnd() {
	// when the extension recieves the message that the video has ended (just true in this case)
	// (might need to be changed later to confirm sender), closes the current (streamplay) tab
	// hopefully later it will open the next video
	chrome.runtime.onMessage.addListener(function(message, sender, func){
		if (message == 'test sequence for message 4443211') {
			// clicks all the links through until it gets to the next episode.
			chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
				// gets the current tab's integer ID, closes it
   				var tabID = t[0].id;
   				chrome.tabs.remove(tabID);
   				chrome.tabs.query({'url': '*://*.swatchseries.to/episode*'}, function(a) {
   					// gets the watchseries tab's integer ID, clicks next episode and streamplay link
   					// eventually change to whatever video domain you want.
   					// put that in the options at some point
   					var tabID1 = a[0].id;
   					chrome.tabs.executeScript(tabID1, {code:
   						"var nextButton = document.getElementsByClassName('npbutton button-next')[0]; \
   						nextButton.click();"
   					});

   					// when the tb is ub=padated to the new episode screen, clicks the link to 
   					// the first streamplay domain option.
   					var domainSelectTabUpdated = false;
   					chrome.tabs.onUpdated.addListener(function(tID, infoChange, b){
   						if (domainSelectTabUpdated == false) {
   							chrome.tabs.executeScript(tID, {code:
   								// here is where we'd change the option to choose a different domain.
   								"var watchButton = document.querySelectorAll(\"[title = 'streamplay.to']\")[0]; \
   								watchButton.click();"
   							});
   							domainSelectTabUpdated = true;
   						};
   					});

   					//here's my question, how do I identify the thisrd tab? is it always freecale?
   				});
   			});
		};
	});
};

chrome.browserAction.onClicked.addListener(addVidEndListener);

actOnVidEnd();