document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let currentTab = tabs[0];
    chrome.storage.sync.get({targetUrlTemplate: 'https://r.jina.ai/${targetUrl}'}, function(items) {
      let targetUrl = items.targetUrlTemplate.replace('${targetUrl}', currentTab.url);

      fetch(targetUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          navigator.clipboard.writeText(data).then(() => {
            let messageElement = document.getElementById("message");
            messageElement.innerHTML = `
              <a href="${targetUrl}" target="_blank">${targetUrl}</a>
              <br>has been copied to clipboard
            `;
            
            let linkElement = messageElement.querySelector('a');
            linkElement.style.color = '#0000EE';
            linkElement.style.textDecoration = 'underline';
            linkElement.style.wordBreak = 'break-all';
          });
        })
        .catch(error => {
          console.error('An error occurred:', error);
          document.getElementById("message").textContent = "An error occurred: " + error.message;
        });
    });
  });
});