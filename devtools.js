// console.log('devtools loaded!');
// const test = {};

chrome.devtools.panels.create('Blueprint',
  null,
  'devpanel.html',
  function (panel) {
    console.log('panel created!');

  }
);
// // DevTools page -- devtools.js
// // Create a connection to the background page
// var backgroundPageConnection = chrome.runtime.connect({
//     name: "devtools-page"
// });

// backgroundPageConnection.onMessage.addListener(function (message) {
//     // Handle responses from the background page, if any
//     console.log('message received!', message);
// });

// // Relay the tab ID to the background page
// chrome.runtime.sendMessage({
//     tabId: chrome.devtools.inspectedWindow.tabId,
//     scriptToInject: "content-script.js"
// });

// backgroundPageConnection.postMessage({
//     name: 'init',
//     tabId: chrome.devtools.inspectedWindow.tabId
// });

