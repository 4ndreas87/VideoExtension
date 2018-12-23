

var vidElement = $("video")[0];
document.vidElement.addEventListener('ended',myHandler,false);
	// I think adds a listener for the end of the video?
function myHandler() {
    	// Closes current tab
chrome.tabs.query({'active': true, 'currentWindow': true}, function(t) {
	var tabID = t[0].id
    chrome.tabs.remove(tabID)
	});
};