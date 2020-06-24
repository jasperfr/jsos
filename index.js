const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const store = require('data-store')({ path: process.cwd() + '/drive.json'})

function getDirectoryTree(parentID) {
    let directory = store.get(parentID);
    let output = { 'name' : directory.name, 'directories': [] };
    let subFolders = store.find(item => item.parent == parentID && item.type == 'directory');
    for(let subFolder of subFolders) {
        output.directories.push(getDirectoryTree(subFolder._id));
    }
    return output;
}

store.__proto__.find = function(lambda) {
    return Object.keys(store.data)
        .filter(k => lambda(store.data[k]))
        .map(key => store.data[key]);
}

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

/* Drive API settings */
app.get('/folder', (req, res) => {
    let id = req.query.id;
    let folder = store.get(id);
    let folderItems = store.find(item => item.parent == id);
    folder['content'] = folderItems;
    res.send(folder)
});

app.get('/folder-tree', (req, res) => {
    let arr = getDirectoryTree('0000');
    res.send(arr);
})

app.get('/executable-test', (req, res) => {
    let id = req.query.id;
    let file = store.get(id);
    if(file.type == 'exec/plain')
        res.send(file.content);
    else
        res.send(atob(file.content));
});

app.get('/', (req, res) => {
    res.render('index')
});

app.listen(port, () => {
    console.log('App listening on port ' + port)
})