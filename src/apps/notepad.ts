$(() => {
    let notepad = new XFrame({
        'title': 'Notepad',
        'icon': 'notepad',
        'size': [320, 240]
    });

    // notepad.start();
});

function notepad(...args: any[]) {
    let filePath = args[0];
    let name = filePath.split('/').pop();
    
    if(filePath) {
        openFile(filePath).then(data => {
            console.log(data);
            textarea.text = data;
            nframe.title = `${name} - Notepad`;
        });
    }

    let nframe = new XFrame({
        'title': 'Notepad',
        'icon': 'notepad',
        'size': [320, 240]
    });
    nframe.setState('filepath', filePath);
    nframe.setState('filename', name);

    let textarea = new XTextArea();
    textarea.css({
        position: 'absolute',
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
        width: 'calc(-6px + 100%)',
        height: 'calc(-6px + 100%)',
        border: '1px solid',
        'border-color': 'black #828282 #828282 black'
    });
    nframe.add(textarea);

    const xt: XMenuType = XMenuType.TEXT;
    nframe.setMenubar(
    new XMenubar()
      .add(new XMenuItem(xt, "File"))
      .add(new XMenuItem(xt, "Edit"))
      .add(new XMenuItem(xt, "View"))
      .add(new XMenuItem(xt, "Go"))
      .add(new XMenuItem(xt, "Favorites"))
      .add(new XMenuItem(xt, "Help"))
    )

    textarea.on('keyup', function() {
        nframe.title = `${nframe.state.filename}* - Notepad`
    });

    nframe.start();
}

$(() => notepad('My Computer/C:/Untitled.txt'))