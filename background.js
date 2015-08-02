

function closeExtraNewTabs() {
	chrome.windows.getAll({populate: true}, function(windows){
		// Snag the current window from the masses.
		var window;
		for(var i = 0; i < windows.length; i++) {
			if(windows[i].focused) {
				window = windows[i];
				break;
			}
		}
		
		// Close any new-page-tabs that are not the current one.
		chrome.tabs.getSelected(null, function(tab) {
			for(var i =  window.tabs.length - 1; i > 0; i--) {
				if(window.tabs[i].id !== tab.id && (firstTab.url.indexOf("chrome://newtab/") != -1)) {
					chrome.tabs.remove(window.tabs[i].id);
				}
			}
		});
	});
}

// Schedule functions for events.
chrome.tabs.onCreated.addListener(closeExtraNewTabs);
chrome.tabs.onRemoved.addListener(closeExtraNewTabs);

