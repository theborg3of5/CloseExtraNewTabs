var ChromeNewTabURL = "chrome://newtab/";


function closeExtraNewTabs(tabToPreserve = "") {
	chrome.tabs.query(
		{
			"currentWindow": true,
			"active":        false,
			"url":           ChromeNewTabURL
		},
		function(tabs) {
			for(var i = 0; i < tabs.length; i++) {
				if(tabsMatch(tabToPreserve, tabs[i]))
					continue;
				
				closeTab(tabs[i]);
			}
		}
	);
}

function tabsMatch(firstTab, secondTab) {
	if(!firstTab)
		return false;
	if(!secondTab)
		return false;
	
	return (firstTab.id == secondTab.id)
}

function closeTab(tab) {
	if(!tab)
		return;
	
	chrome.tabs.remove(
		tab.id,
		checkError
	);
}
function checkError() {
	var lastError = chrome.runtime.lastError; // Check lastError so Chrome doesn't output anything to the console.
	if(lastError)
		return false;
	
	return true;
}


// Schedule functions for events.
chrome.tabs.onCreated.addListener(closeExtraNewTabs);
chrome.tabs.onRemoved.addListener(closeExtraNewTabs);

