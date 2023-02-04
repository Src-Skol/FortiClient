/*
 * Copyright (c) 2015 Fortinet Technologies (Canada) Inc. All rights reserved.  
 *
 *   FortiClient Web Filter for google Chromebook
 *
 */
 
function save_options() 
{
  var select = document.getElementById("logging");
  var logging = select.children[select.selectedIndex].value;
  // localStorage["logging"] = logging;
  var message = {action:"setloglevel", level:""};
  message.level = logging;
  chrome.runtime.sendMessage(message, function(response) {
        console.log("loglevel message has been sent");
    }
  );
}

function clear_cache()
{
  var message = {action:"clearcache"};
  chrome.runtime.sendMessage(message, function(response) {
        console.log("clear cache message has been sent");
    }
  );
}

function set_mode()
{
  var select = document.getElementById("mode");
  var mode = select.children[select.selectedIndex].value;
  var rate_option = document.getElementById("rate_option");
  var safe_search_option = document.getElementById("safe_search_option");

  var message = {action:"setmode", mode:"", main_url_rate_only:false,safe_search:'0'};
  message.mode = mode;
  if (mode == "async"){
    if (rate_option.checked)
        message.main_url_rate_only = true;
  }
  
  if (safe_search_option.checked)
      message.safe_search = '1';
  
  chrome.runtime.sendMessage(message, function(response) {
        console.log("set rate mode message has been sent");
    }
  );
}

function display_webfilter_config(){
    var message = {action:"list_config_request"};
    chrome.runtime.sendMessage(message, function(response) {
        var webfilter_config = document.getElementById("webfilter_config");
        var responseStr;
        console.log("response:" + response);
        responseStr = JSON.stringify(response);
        webfilter_config.innerHTML = responseStr;
      }
    );
}

function refresh_token_revoke(){
    var message = {action:"refresh_token_revoke"};
    chrome.runtime.sendMessage(message, function(response) {
        console.log("revoke refresh token message has been sent");
      }
    );
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('save');
    var clear = document.getElementById('clearcache');
    var save_mode = document.getElementById('save_mode');
    var mode_list = document.getElementById('mode');
    var list_config = document.getElementById('list_config');
    var revoke = document.getElementById('revoke');

    link.addEventListener('click', function() {
        save_options();
    });
    clear.addEventListener('click', function() {
        clear_cache();
    });
    save_mode.addEventListener('click', function() {
        set_mode();
    });
    
    list_config.addEventListener('click', function() {
        display_webfilter_config();
    });
    
    revoke.addEventListener('click', function() {
        refresh_token_revoke();
    });

    
    mode_list.addEventListener('change', function() {
          var select = document.getElementById("mode");
          var mode = select.children[select.selectedIndex].value;
          var rate_option = document.getElementById("rate_option_div");
          //alert('mode:' + mode);
          if (mode == 'async')
              rate_option.style.visibility = "visible";
              //rate_option.style.display = "block";
          else
              rate_option.style.visibility = "hidden";
              //rate_option.style.display = "none";
    });
    
    var message = {action:"config_request"};
    chrome.runtime.sendMessage(message, function(response) {
        var select = document.getElementById('mode');
        var rate_option_div = document.getElementById("rate_option_div");
        var rate_option = document.getElementById("rate_option");
        var safe_search_option = document.getElementById("safe_search_option");        
        
        console.log("config request message has been sent");
        console.log("response:" + response);
        
        if (response.mode == "sync"){
            select.value = "sync";
            rate_option_div.style.visibility = "hidden";
        }
        else{
            select.value = "async";
            rate_option_div.style.visibility = "visible";
            if (response.main_url_rate_only)
                rate_option.checked = true;
            else
                rate_option.checked = false;
        }
        
        if (response.safe_search == '1')
            safe_search_option.checked = true;
        else
            safe_search_option.checked = false;
            

      }
    );
});
