
var main = chrome.devtools.panels.create("ngBlueprint", false, "index.html", function (panel) {
    panel.elements.createSidebarPane("Data Chart",
        function (sidebar) {
            sidebar.setPage("index.html");
            sidebar.setHeight("8ex");
        }
    );
})

chrome.devtools.panels.elements.createSidebarPane("Data Chart",
    function (sidebar) {
        sidebar.setPage("index.html");
        sidebar.setHeight("8ex");
    }
);