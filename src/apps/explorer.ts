$(() => {
  let frame = new XFrame({
    'title': 'Explorer',
    'icon': 'explorer',
    'size': [320, 240]
  });

  let pathLabel = new XLabel("My Computer");
  frame.add(pathLabel);

  let panel = new XPanel();
  frame.add(panel);

  pathLabel.css({
    'border': '1px inset #828282',
    'background-color': 'white',
    'margin': '2px',
    'padding': '2px',
    'position': 'absolute',
    'left': '0',
    'right': '0',
    'top': '0',
    'height': '20px',
    'box-sizing': 'border-box',
    'user-select': 'none'
  });

  panel.css({
    'border': '2px inset #C0C0C0',
    'background-color': 'white',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'align-content': 'start',
    'overflow-y': 'scroll', 
    'box-sizing': 'border-box',
    'position': 'absolute',
    'left': '0',
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

  getFolder('').then(d => navigate(d[0]));

  frame.start();
});