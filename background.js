let data = {}; // x {"key": "value"}, o {key: "value"}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.cmd === 'get-msg') {
    console.log(message);
    sendResponse(data);
  } else if(message.cmd === 'set-msg') {
    //console.log(`message: ${message}`); // show in background.js
    console.log(sender);
    console.log(message);
    console.log(message.hrefs);
    data.hrefs = message.hrefs;
    sendResponse(data);
  }
});