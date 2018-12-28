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

  /* so Here's why this is so long and so nestedly indented.
  Kip can't figure out how to take these snippets out into being their own functions
  because they all need to run after/as callbacks for the first one.
  there might be a way to write them to run whatever callback I write to them
  like 'closeWatchTab(callback = 
          clickNextEp(callback = 
            clickToPlayPage(callback = 
              watchvid(callback = something ))));'
  That's for later though. for now, lets just make it work.*/

	chrome.runtime.onMessage.addListener(function(message, sender, func){
		if (message == 'test sequence for message 4443211') {
			// clicks all the links through until it gets to the next episode.
			chrome.tabs.query({'active': true, 'currentWindow': true}, function(watchTab) {
				// gets the current tab's integer ID, closes it
 				var watchTabID = watchTab[0].id;
 				chrome.tabs.remove(watchTabID);

 				chrome.tabs.query({'url': '*://*.swatchseries.to/episode/*'}, function(lastEpTab) {
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
              chrome.tabs.executeScript(domainSelectTabID, 

                {code:
                  // here is where we'd change the option to choose a different domain.
                  "var domainSelectButton = document.querySelectorAll(\"[title = 'streamplay.to']\")[0]; \
                  domainSelectButton.click();"},

                // run this function after clicking the streamplay link
                function(test){
                  // so the reason this is here is because if I don't do it in a callback
                  // it will just return a random ass tab
                  // because javascript is asynchronous
                  chrome.tabs.query({'url': '*://*.swatchseries.to/freecale*'}, function(newWatchTab) {
                    // (Hopefully), gets the tab ID of the "click here to play" tab, and clicks here
                    // to play.
                    var newWatchTabID = newWatchTab[0].id;
                    // gets last tab with a watchseries url, which should be the click to play page
                    chrome.tabs.executeScript(newWatchTabID, 

                      {code:
                        "var clickToWatch = document.getElementsByClassName('push_button blue')[0]; \
                        clickToWatch.click();"},

                      // run this function after clicking the click here to play button.
                      function(test1){
                        11 + 5;
                      });
                  });
                });
              // here so that it only clicks the domain link once, rather than every time the tab is updated.
              domainSelectTabUpdated = true;

            };
          });
 				});
   		});
    };
	});
};

chrome.browserAction.onClicked.addListener(addVidEndListener);

actOnVidEnd();