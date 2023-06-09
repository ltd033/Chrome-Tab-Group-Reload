chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
      id: "1",
      title: "Reload Group",
      contexts: ["all"],
    });
  });
});

async function reloadGroup() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let { groupId } = tab;
  let tabs = await chrome.tabs.query({ groupId });
  for (let tab of tabs) {
    chrome.tabs.reload(tab.id);
  }
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "1") {
    // Reload all tabs in the current tab group
    reloadGroup();
  }
});
