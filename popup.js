let g = document.getElementById('g');
let gs = document.getElementById('gs');

/*
let layout = {
  '1-1': {},
  '1-2': {},
  '1-3': {},
  '2-1': {},
  '2-2': {},
  '2-3': {},
  '2-4': {},
  '3-1': {},
  '3-2': {},
  '3-3': {},
  '3-4': {}
}
*/

g.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id }, // , allFrames: true
      func: getBackgroundMessage,
    },
    (results) => {
      //console.log('results: '); // show in popup.html
      console.log(results); // results do not contain data but only documentId
      console.log(results[0]);
      console.log(results[0].result);

      let firstHref;
      let secondHref;

      chrome.storage.sync.get('hrefs', ({hrefs}) => {
        firstHref = hrefs[0];
        secondHref = hrefs[1];
      });
      console.log(firstHref);
      console.log(secondHref);
      let a = document.createElement('a');
      a.href = 'https://www.google.com/'; // results[0];
      a.innerHTML = results[0];
      document.body.appendChild(a);
    }
  );
});

function getBackgroundMessage() {
  chrome.runtime.sendMessage({"cmd":"get-msg"}, (response) => {
    console.log('Received data(get-msg): ', response);  // show in index.html
    return response;
  });
}

gs.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id }, // , allFrames: true
      func: getSetATags,
    },
    (results) => {
      console.log('results: '); // show in popup.html
      console.log(results);
    }
  );
});

function getSetATags() {
  let articles = document.querySelectorAll('div#qurireco > article');
  let hrefs = [];
  for(let article of articles) {
    href = article.childNodes[0].href;
    hrefs.push(href);
  }
  console.log(hrefs); // show in index.html
  chrome.storage.sync.set({hrefs});

  chrome.runtime.sendMessage({"cmd":"set-msg","hrefs":hrefs}, (response) => {
    console.log('Received data(set-msg): ', response);  // show in index.html
  });
  return hrefs;
}


