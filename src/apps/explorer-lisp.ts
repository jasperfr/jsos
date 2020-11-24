$(() => {
  const xt: XMenuType = XMenuType.TEXT;

  let frame = new XFrame({
    'title': 'Explorer',
    'icon': 'explorer',
    'size': [640, 480]
  })
  .setMenubar(new XMenu()
    .add(new XMenubar()
      .add(new XMenuItem(xt, "File"))
      .add(new XMenuItem(xt, "Edit"))
      .add(new XMenuItem(xt, "View"))
      .add(new XMenuItem(xt, "Go"))
      .add(new XMenuItem(xt, "Favorites"))
      .add(new XMenuItem(xt, "Help"))
    )
    .add(new XMenubar()
      .add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Back", 'gui/back')
          .on('click', navigateBack))
      .add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Forward", 'gui/forward')
        .on('click', navigateForward))
      .add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Up", 'gui/up')
        .on('click', navigateUp))
      .add(new XMenuSpacer())
      .add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Cut", 'gui/cut'))
      .add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Copy", 'gui/copy'))
      .add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Paste", 'gui/paste'))
      .add(new XMenuSpacer())
      .add(new XMenuItem(XMenuType.LARGE_ICON_TEXT, "Undo", 'gui/undo'))
    )
  )
  .setStatusbar(new XStatusBar()
    .add(new XStatusBarItem()
      .add(new XLabel("20 objects"))
  ))

  frame.state.currentDirectory = 'My Computer';
  frame.state.history = [];
  frame.state.forward = [];

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

  panel.on('contextmenu', (e) => panelMenu(e));

  function panelMenu(e) {
    e.preventDefault();
    let el = XContextMenu.create(e, [
      { label: "Arrange Icons", icon: 'folder', 'click': function() { console.log('a'); } },
      { label: "Line Up Icons", icon: 'folder', 'click': function() { console.log('a'); } },
      "SPACER",
      { label: "Paste", icon: 'folder', disabled: 1, 'click': function() { console.log('a'); } },
      { label: "Paste Shortcut", icon: 'folder', disabled: 1, 'click': function() { console.log('a'); } },
      { label: "Undo", icon: 'folder', 'click': function() { console.log('a'); } },
      "SPACER",
      { label: "New Folder", icon: 'folder', 'click': () => newFolder(frame.state.currentDirectory) },
      { 
        label: "New Text File",
        icon: 'folder',
        'click': function() {
          newFile(frame.state.currentDirectory, 'txt')
            .then(d => navigate(frame.state.currentDirectory)
          )
        }
      },
      { 
        label: "New JS File",
        icon: 'folder',
        'click': function() {
          newFile(frame.state.currentDirectory, 'js')
            .then(d => navigate(frame.state.currentDirectory)
          )
        }
      },
      "SPACER",
      { label: "Properties", icon: 'folder', 'click': function() { console.log('a'); } },
    ]);
    if(!!el) {
      $(document.body).append(el);
      el.slideToggle('fast');
    }
  }

  function newFolder(path: string) {
    makeFolder(path).then(res => {
      navigate(path);
    })
  }

  function navigateUp() {
    frame.state.history.push(frame.state.currentDirectory);
    let path = frame.state.currentDirectory.split('/').slice(0,-1).join('/');
    frame.state.currentDirectory = path;
    frame.state.forward = [];
    navigate(path);
  }

  function navigateBack() {
    if(frame.state.history.length == 0) return false;
    let history: string = frame.state.history.pop();
    frame.state.forward.push(frame.state.currentDirectory);
    frame.state.currentDirectory = history;
    navigate(history);
  }

  function navigateForward() {
    if(frame.state.forward.length == 0) return false;
    let future: string = frame.state.forward.pop();
    frame.state.history.push(frame.state.currentDirectory);
    frame.state.currentDirectory = future;
    navigate(future);
  }

  function navigateTo(path: string): void {
    frame.state.history.push(frame.state.currentDirectory);
    frame.state.currentDirectory = path;
    frame.state.forward = [];
    navigate(path);
  }

  function navigate(dir: string) {
    pathLabel.text = dir;
    panel.clear();

    getFolder(dir).then(data => {
      data.forEach((xfile: XFile) => 
        panel.add(new XIcon(xfile)
          .on('dblclick', () => navigateTo(xfile.path))))
      panel.refresh();

      console.log(`${frame.state.history.join('-')} <<< ${frame.state.currentDirectory} >>> ${frame.state.forward.join('-')}`)
    });
  }

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

  getFolder('').then(d => navigate(d[0].path));

  frame.start();
});
        
/*

  function run(item) {
    getFile(item.path).then(data => {
      eval(data);
    });
  }

  function runWithProgram(item) {
    console.log(item.path);
    console.log(item.type);
  }
xicon.on('dblclick', function() {
  switch(subdir.type) {
    case 'folder': navigatepath(subdir.path); break;
    case 'shortcut': navigatepath(subdir.path); break;
    case 'exe': run(subdir); break;
    default: runWithProgram(subdir); break;
  }
});
  function navigate(directory) {
    pathLabel.text = directory.path;
    panel.clear();
    getFolder(directory.path).then(data => {
      frame.setState('top-directory', directory.path.split('/').slice(0,-1).join('/'));
      frame.setState('currentDirectory', directory.path);
      console.log(frame.state);

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
*/