/**
 *
 * Copyright (c) 2015 Fortinet Technologies (Canada) Inc. All rights reserved.
 *
 *   FortiClient Web Filter for google Chromebook
 *
 * @format
 */

function clear_cache() {
  var message = { action: 'clearcache' };
  chrome.runtime.sendMessage(message, function(response) {
    console.log('clear cache message has been sent');
  });
}
console.log('customize_warning.js is loaded');
(function customize_init() {
  // get information for this tab id(url, rate category name/group name, )
  const message = { action: 'get_warning_web_page_info' };

  chrome.runtime.sendMessage(message, (response) => {
    console.log('get_block_web_page_info has been sent');

    console.log('response.rating_url:' + response.rating_url);
    console.log('response.home_url:' + response.home_url);
    console.log('response.category:' + response.category);
    console.log('response.time:' + response.time);

    const proceedButton = document.getElementById('button_proceed');

    if (document.contains(proceedButton)) {
      proceedButton.addEventListener('click', (_) => {
        const request = { action: 'set_ignore_category' };

        chrome.runtime.sendMessage(request);
        location.assign(response.home_url);
        return false;
      });
    }
  });
})();
