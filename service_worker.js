
/**
 * Whenever a new tab is created, close any extra new tabs.
 * https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onCreated
 * @param {Tab} tab The tab that was just created.
 */
chrome.tabs.onCreated.addListener((tab) => closeExtraNewTabs(tab)); // Pass the newly created tab to preserve, so we don't close ALL of them.

/**
 * Whenever a tab is closed, close any extra new tabs.
 * https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onRemoved
 */
chrome.tabs.onRemoved.addListener(closeExtraNewTabs);

/**
 * Close any new tabs beyond a single one.
 * @param {Tab} tabToPreserve If given, we'll never close this tab (on this call).
 */
async function closeExtraNewTabs(tabToPreserve = "") {
	const tabs = await chrome.tabs.query({ "currentWindow": true, "active": false, "url": "chrome://newtab/" });

	for (const tab of tabs) {
		if (tabToPreserve && (tabToPreserve.id == tab.id))
			continue;
		
		chrome.tabs.remove(tab.id);
	}
}
