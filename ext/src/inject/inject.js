"use strict";
chrome.runtime.onMessage.addListener(function (req) {
  switch (req.type) {
    case "RUN":
      setTimeout(function () {
        run()
      }, 700);
      break;
    default:
      console.log("Error: Unknown request. : ", req);
  }
});


const run = () => {
  let originalUrls = getOriginalUrls();
  let $item_links = document.getElementsByClassName('item_link');

  Array.prototype.forEach.call($item_links, function (elm, idx) {

    //.item_linkのhrefを書き換える
    elm.href = originalUrls[idx];

    // 他のイベントリスナの実行を中止する
    elm.addEventListener('click', function (e) {
      e.stopImmediatePropagation();
    })
  });
};

// '.original_url'を取得してurlの配列を返す
const getOriginalUrls = () => {
  let targetElms = Array.prototype.slice.call(document.getElementsByClassName('original_url'));
  return targetElms.map((item) => item.href);
};


/*------------------------
* AutoScrollに対応
* ------------------------
* Scrollイベントでbodyの高さを監視して、高さが増えるとrun()を再実行する
* */
function ScrollWatcher() {
  this.bodyHeight = document.body.offsetHeight;
}

ScrollWatcher.prototype.watch = function () {
  window.addEventListener('scroll', () => {
    let _bodyHeight = document.body.offsetHeight;

    if (this.bodyHeight !== _bodyHeight) {
      run();
      this.bodyHeight = _bodyHeight;
    }
  });
};

const scrollWatcher = new ScrollWatcher();
scrollWatcher.watch();
