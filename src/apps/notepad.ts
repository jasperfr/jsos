$(() => {
    let notepad = new XFrame({
        'title': 'Notepad',
        'icon': 'notepad',
        'size': [320, 240]
    });

    let tree = new XTree();
    tree.css({
        position: 'absolute',
        left: '2px', top: '2px', bottom: '2px',
        width: '256px'
    });

    /*
    let subtree = tree.addTree('My Computer', 'computer');
    let c = subtree.addTree('C:', 'drive');
    c.addTree('$RECYCLE_BIN', 'bin');
    c.addTree('Desktop', 'folder-closed');
    c.addTree('JSOS', 'folder-closed');
    subtree.addTree('D:', 'drive');
    */

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

    notepad.add(tree);

    notepad.start();
});