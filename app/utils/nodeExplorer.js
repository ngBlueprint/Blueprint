

class NodeExplorer {
  constructor() {
    // initialze node and probes;
    this.rootNode;
    this.rootProbe;
    // this.window = chrome.windows.getCurrent();
    console.log('Node explorer initialized!');
    if (this.isAngular()) {
      // this.setRootNode();
      // this.setRootProbe();
    } else {
      alert('Not angular!');
    }
    console.log('Root Node', this.rootNode);
  }

  isAngular() {
    return true;
  }

  setRootNode() {
    this.window.rootNode = window.getAllAngularRootElements()[0];
  }

  setRootProbe() {
    this.window.rootProbe = window.ng.probe(this.rootNode);
  }

};



/*
  RootNode
    childNodes
      DebugElements

      nativeElement = nativeNode = name + css selector
      context = binding

*/

/*
  Get Root Node
  Get child nodes
  Create dict of DebugElements
*/

// On change
// Re-read root node
// Build component tree
// Bindings

// Different contexts??

module.exports = NodeExplorer;