let page = document.getElementById('hrefs');

function constructOptions() {
  chrome.storage.sync.get("hrefs", (data) => {
    let hrefs = data.hrefs;

    for (let href of hrefs) {
      let a = document.createElement('a');
      a.href = href;
      a.innerHTML = href;
      page.appendChild(a);
    }
  });
}

constructOptions();