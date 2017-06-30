console.log('content-script loaded!');

window.addEventListener('message', function (event) {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null ||
    !message.source === 'ngPulse') {
    return;
  }

  console.log('sending message:  ', message);
  chrome.runtime.sendMessage(message);
});

const contentScript = {};