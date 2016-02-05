"use strict";

// URLの推移(tabの更新)を検知してPocketの場合にContentScriptにmessage passing
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.match(/https:\/\/getpocket.com\//) && changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {type: 'RUN'})
  }
});