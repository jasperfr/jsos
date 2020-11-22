$(() => {
  let frame = new XFrame({
    'title': 'Explorer',
    'icon': 'explorer',
    'size': [640, 480]
  });

  let menu = new XMenu();

  let mbar = new XMenubar();
  mbar.add(new XMenuItem(XMenuType.TEXT, "File"));
  mbar.add(new XMenuItem(XMenuType.TEXT, "Edit"));
  mbar.add(new XMenuItem(XMenuType.TEXT, "View"));
  mbar.add(new XMenuItem(XMenuType.TEXT, "Go"));
  mbar.add(new XMenuItem(XMenuType.TEXT, "Favorites"));
  mbar.add(new XMenuItem(XMenuType.TEXT, "Help"));
  menu.add(mbar);

  let bbar = new XMenubar();
  bbar.add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Back", 'gui/back'));
  bbar.add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Forward", 'gui/forward'));
  bbar.add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Up", 'gui/up'));
  bbar.add(new XMenuSpacer());
  bbar.add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Cut", 'gui/cut'));
  bbar.add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Copy", 'gui/copy'));
  bbar.add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Paste", 'gui/paste'));
  bbar.add(new XMenuSpacer());
  bbar.add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Undo", 'gui/undo'));
  menu.add(bbar);

  frame.setMenubar(menu);

  let status = new XStatusBar();
  let o = new XStatusBarItem();
  let l = new XLabel();
  o.add(l);
  status.add(o);
  frame.setStatusbar(status);

  l.text = "20 object(s)";

  let pathLabel = new XLabel("My Computer");
  frame.add(pathLabel);

  let panel = new XPanel();
  frame.add(panel);

  let tree = new XTree();
  frame.add(tree);

  tree.css({
    position: 'absolute',
    'box-sizing': 'border-box',
    border: '2px inset #C0C0C0',
    left: '2px', top: '2px', bottom: '0',
    width: '200px'
  });

  pathLabel.css({
    'border': '1px inset #828282',
    'background-color': 'white',
    'margin': '2px',
    'padding': '2px',
    'position': 'absolute',
    'left': '202px',
    'right': '0',
    'top': '0',
    'height': '20px',
    'box-sizing': 'border-box',
    'user-select': 'none'
  });

  panel.css({
    'background-color': 'white',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'align-content': 'start',
    'overflow-y': 'scroll', 
    'box-sizing': 'border-box',
    'position': 'absolute',
    'left': '204px',
    'right': '0',
    'bottom': '0',
    'top': '24px'
  });

  function run(item) {
    getFile(item.path).then(data => {
      eval(data);
    });
  }

  function runWithProgram(item) {
    console.log(item.path);
    console.log(item.type);
  }

  function navigate(directory) {
    pathLabel.text = directory.path;
    panel.clear();
    getFolder(directory.path).then(data => {
      if(directory.path != 'My Computer') {
        let topdirectory = new XFile('..', directory.path.split('/').slice(0,-1).join('/'), 'folder');
        let xicon = new XIcon(topdirectory);
        xicon.on('dblclick', (() => navigate(topdirectory)));
        panel.add(xicon);
      }

      for(let subdirectory of data) {
        let xicon = new XIcon(subdirectory);
        
        xicon.on('dblclick', function() {
          switch(subdirectory.type) {
            case 'folder': navigate(subdirectory); break;
            case 'shortcut': navigate(subdirectory); break;
            case 'exe': run(subdirectory); break;
            default: runWithProgram(subdirectory); break;
          }
        });
        panel.add(xicon);
      }
      panel.refresh();
    });
  };

  function makeSubDir(data, subtree, o) {
    let isFile = typeof data[o].content !== "object";
    let subsubtree = subtree.addTree(o, data[o].icon ? data[o].icon : data[o].type, isFile);
    if(isFile) return;
    for(let obj in data[o].content) {
        makeSubDir(data[o].content, subsubtree, obj);
    }
  }

  $.get('http://localhost:1337/tree').then(res => {
      let computer = tree.addTree(res.path, res.icon);
      console.log(res.content);
      for(let obj in res.content) {
          makeSubDir(res.content, computer, obj);
      }
  });

  getFolder('').then(d => navigate(d[0]));

  frame.start();
});