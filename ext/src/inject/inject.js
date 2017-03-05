(function () {
  "use strict";

  const run = () => {
    setTimeout(() => {
      const originalUrls = getOriginalUrls();
      const $item_links = document.getElementsByClassName('item_link');

      Array.prototype.forEach.call($item_links, function (elm, idx) {
        elm.href = originalUrls[idx];
        elm.addEventListener('click', function (e) {
          if (document.getElementById('queue').classList.length !== 3) {
            e.stopImmediatePropagation();
          }
        });
      });
    }, 0);
  };

  // '.original_url'を取得してurlの配列を返す
  const getOriginalUrls = () => {
    let targetElms = Array.prototype.slice.call(document.getElementsByClassName('original_url'));
    return targetElms.map(item => item.href);
  };

  chrome.runtime.onMessage.addListener(function (req) {
    switch (req.type) {
      case "RUN":
        setTimeout(function () {
          run()
        }, 400);
        break;
      default:
        console.log("Error: Unknown request. : ", req);
    }
  });



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
      const _bodyHeight = document.body.offsetHeight;

      if (this.bodyHeight !== _bodyHeight) {
        run();
        this.bodyHeight = _bodyHeight;
      }
    });
  };

  const scrollWatcher = new ScrollWatcher();
  scrollWatcher.watch();
})();
