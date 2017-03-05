(function () {
  "use strict";

  chrome.runtime.onMessage.addListener(function (req) {
    switch (req.type) {
      case "RUN":
        setTimeout(run, 400);
        break;
      default:
        console.log("Error: Unknown request. : ", req);
    }
  });

  // '.original_url'を取得してurlの配列を返す
  function getOriginUrls() {
    let targetElms = Array.prototype.slice.call(document.getElementsByClassName('original_url'));
    return targetElms.map(item => item.href);
  }

  const MODE_CLASS = 'queue_list_mode_bulkedit'

  function run() {
    setTimeout(() => {
      const originalUrls = getOriginUrls();
      const $item_links = document.getElementsByClassName('item_link');
      Array.prototype.forEach.call($item_links, function (elm, idx) {
        elm.href = originalUrls[idx];
        elm.addEventListener('click', (e) => {
          if (!document.getElementById('queue').classList.contains(MODE_CLASS)) {
            e.stopImmediatePropagation();
          }
        });
      });
    }, 0);
  }

  /*------------------------
  * AutoScrollに対応
  * ------------------------
  * Scrollイベントでbodyの高さを監視して、高さが増えるとrun()を再実行する
  * */
  let offsetHeight = document.body.offsetHeight;
  window.addEventListener('scroll', () => {
    const hight = document.body.offsetHeight;
    if (offsetHeight < hight) {
      offsetHeight = hight;
      run();
    }
  })

})();
