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
			chrome.tabs.query({'active': true, 'currentWindow': true}, function(watchTab) {
				// gets the current tab's integer ID, closes it
   				var watchTabID = watchTab[0].id;
   				chrome.tabs.remove(watchTabID);

   				chrome.tabs.query({'url': '*://*.swatchseries.to/episode*'}, function(lastEpTab) {
   					// gets the watchseries tab's integer ID, clicks next episode and streamplay link
   					// eventually change to whatever video domain you want.
   					// put that in the options at some point
   					var lastEpTabID = lastEpTab[0].id;
   					chrome.tabs.executeScript(lastEpTabID, {code:
   						"var nextButton = document.getElementsByClassName('npbutton button-next')[0]; \
   						nextButton.click();"
   					});

   					// when the tab is upadated to the new episode screen, clicks the link to 
   					// the first streamplay domain option.
   					var domainSelectTabUpdated = false;
   					chrome.tabs.onUpdated.addListener(function(domainSelectTabID, infoChange, domainSelectTab){
   						if (domainSelectTabUpdated == false) {
   							chrome.tabs.executeScript(domainSelectTabID, {code:
   								// here is where we'd change the option to choose a different domain.
   								"var domainSelectButton = document.querySelectorAll(\"[title = 'streamplay.to']\")[0]; \
   								domainSelectButton.click();"
   							});
   							domainSelectTabUpdated = true;
   						};
   					});

   					// here's my question, how do I identify the thisrd tab? is it always freecale?
   					// It looks like it is but we'll have to see if I'm allowed to do that in the url field.
   					// (Hopefully), gets the tab ID of the "click here to play" tab, and clicks here
   					// to play.
   					// so the problem here is that it's either checking for the new tab too fast and not getting it
   					// or it''s matching for the wrong url
   					// who fuckin knows
   					
   					setTimeout(function(test){500+200;}, 1000);

   					chrome.tabs.query({'url': ['*://*.swatchseries.to/freecale']}, function(newWatchTab) {
   						var newWatchTabID = newWatchTab[0].id;
   						chrome.tabs.executeScript(newWatchTabID, {code:
   							"var clickToWatch = document.getElementsByClassName('push_button blue')[0]; \
   							clickToWatch.click();"
   						});
   					});
   				});
   			});
		};
	});
};

chrome.browserAction.onClicked.addListener(addVidEndListener);

actOnVidEnd();