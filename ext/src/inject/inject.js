"use strict";

//TODO: background.jsからurlの変更messageを受取る
//TODO: item_content数分のoriginal_urlを取得
//TODO: item_contentのitem_linkを書き換える
//TODO: item_linkのclickイベントを奪取

chrome.runtime.onMessage.addListener(function (req) {
  switch (req.type) {
    case "RUN":
      console.log('発火');
      run();
      break;
    default:
      console.log("Error: Unknown request. : ", req);
  }
});

const run = () => {
  let urls = document.getElementsByClassName('original_url');
  console.log(urls[0].href);

};
