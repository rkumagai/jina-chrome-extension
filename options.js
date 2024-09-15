const DEFAULT_TARGET_URL_TEMPLATE = 'https://r.jina.ai/${targetUrl}';

// Saves options to chrome.storage
function save_options() {
  var targetUrlTemplate = document.getElementById('targetUrlTemplate').value;
  chrome.storage.sync.set({
    targetUrlTemplate: targetUrlTemplate
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    targetUrlTemplate: DEFAULT_TARGET_URL_TEMPLATE
  }, function(items) {
    document.getElementById('targetUrlTemplate').value = items.targetUrlTemplate;
  });
}

// Resets options to default values
function reset_options() {
  document.getElementById('targetUrlTemplate').value = DEFAULT_TARGET_URL_TEMPLATE;
  save_options();
  var status = document.getElementById('status');
  status.textContent = 'Options reset to default.';
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);