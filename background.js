chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.contextMenus.removeAll(function() {
    console.log(3);
chrome.contextMenus.create({
  id: "parent",
  title: "Parent Menu",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "child1",
  title: "Child Menu 1",
  contexts: ["all"],
  parentId: "parent",
});

chrome.contextMenus.create({
  id: "child2",
  title: "Child Menu 2",
  contexts: ["all"],
  parentId: "parent",
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
