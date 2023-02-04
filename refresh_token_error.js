function onlogin() {
    chrome.runtime.sendMessage({action: "loginagain"}, function(response) {
            console.log("message has been sent");  
        }
    );
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('loginagain');
    // onClick's logic below:
    link.addEventListener('click', function() {
        onlogin();
    });
});
