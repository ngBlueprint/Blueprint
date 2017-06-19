console.log('devtools.js')

chrome.devtools.panels.create('Blueprint',
  null,
  'devpanel.html',
  () => {
  }
);