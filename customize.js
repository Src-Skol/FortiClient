/**
 * /*
 * Copyright (c) 2015 Fortinet Technologies (Canada) Inc. All rights reserved.
 *
 *   FortiClient Web Filter for google Chromebook
 *
 * @format
 */

document.addEventListener('DOMContentLoaded', _ => {
  const loadjscssfile = (filename, filetype) => {
    let fileref;
    if (filetype == 'js') {
      //if filename is a external JavaScript file
      fileref = document.createElement('script');
      fileref.setAttribute('type', 'text/javascript');
      fileref.setAttribute('src', filename);
    } else if (filetype == 'css') {
      //if filename is an external CSS file
      fileref = document.createElement('link');
      fileref.setAttribute('rel', 'stylesheet');
      fileref.setAttribute('type', 'text/css');
      fileref.setAttribute('href', filename);
    }
    if (fileref) {
      document.getElementsByTagName('head')[0].appendChild(fileref);
    }
  };

  // get information for this tab id(url, rate category name/group name, )
  const message = { action: 'get_customized_web_page' };

  chrome.runtime.sendMessage(message, response => {
    console.log('get_customized_web_page has been sent');

    console.log(response.customized_page);
    document.open();
    document.write(response.customized_page);
    document.close();

    // load customize_warning.js to deal the situation that on
    // customized warning page, there is a button called proceed
    if (response.action == 3) {
      loadjscssfile('customize_warning.js', 'js');
    }
  });
});
