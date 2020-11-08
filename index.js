const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const md5 = require('md5');
const store = require('data-store')({ path: process.cwd() + '/drive.json'});
const store2 = require('data-store')({ path: process.cwd() + '/drive/C.json' });

/* =====================================
 * data-store function hacks
 * provides extra functionality
 * by overwriting the __proto__ object
 */
store.__proto__.first = function(lambda) {
    return store.find(lambda)[0];
}

store.__proto__.find = function(lambda) {
    return Object.keys(store.data)
        .filter(k => lambda(store.data[k]))
        .map(key => store.data[key]);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

function fail() {
    return res.status(403).send('Invalid.');
}

/* Drive API settings */
app.get('/open-directory', (req, res) => {
    let pathname = req.query.directoryTree; // C:/Desktop/
    // trim exit /
    if(pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
    }
    // split query
    let directoryTree = pathname.split('/');
    let obj = store2.data;

    // TODO might want to debug this function later...
    // Otherwise, it works perfectly.
    for(let i = 0; i < directoryTree.length; i++) {
        let directory = obj[directoryTree[i]];
        if(directory === undefined || directory.type !== 'folder') {
            return res.status(404).sendMessage(`${directory} is not a directory!`);
        }
        obj = directory.content;
    }

    return res.status(200).send(obj);
});

app.get('/get-file', (req, res) => {
    let filename = req.query.path;
    if(!filename) return res.status(404).send('');

    // might want to convert this to a function...
    // (and debug it, you idiot).
    if(!filename.startsWith('My Computer/')) filename = "My Computer/" + filename;
    if(filename.endsWith('/')) filename = filename.slice(0, -1);
    let directoryTree = filename.split('/');
    let obj = store2.data;

    for(let i = 0; i < directoryTree.length - 1; i++) {
        let directory = obj[directoryTree[i]];
        obj = directory.content;
    }

    let name = directoryTree.slice(-1)[0];
    let file = obj[name];
    file['name'] = name;

    return res.status(200).send(file);
});

app.get('/get-mime-ext', (req, res) => {
    let type = req.query.type;
    if (!type) return fail();

    let mimes = store2.data['$MIMES'];
    return res.status(200).send(mimes[type]);
});



app.get('/open-file', (req, res) => {
    
    let filename = req.query.filename;
    if(filename == "teapot") {
        return res.status(418).send(`
        ;,'
        _o_    ;:;'
    ,-.'---\`.__ ;
   ((j\`=====',-'
    \`-\\     /
       \`-=-'     
        `); 
    }

    if(!filename.match(/^[a-zA-Z\_\-]+$/g)) {
        return res.status(404).send('Invalid file name.');
    }

    let file = store.first(file => file.name == filename);
    if(file == undefined) {
        return res.status(404).send('File does not exist.');
    }

    res.status(200).send(file);
});

app.get('/glob', (req, res) => {
    res.status(200).send(store.data);
});

app.post('/save-file', (req, res) => {
    let filename = req.body.filename;
    let content = req.body.content;

    // Filename check
    if(filename == "" || filename == undefined || !filename.match(/^[a-zA-Z\_\-]+$/g)) {
        return res.status(406).send('Not a valid file name.');
    }

    // Content check - must be a valid BASE64 string
    if(content == undefined || !content.match(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/g)) {
        return res.status(406).send('Content is not a valid BASE64 encoded string.');
    }

    // If the file exists, overwrite it...
    let file = store.first(file => file.name == filename);
    if(file != undefined) {
        if(file.level == 'kernel') {
            return res.status(406).send('Kernel files can not be modified.');
        };

        let newFile = {
            '_id': file._id,
            'name': file.name,
            'level': file.level,
            'content': content
        }
        store.set(file._id, newFile);
        return res.status(200);
    }

    // ...Otherwise, create a new object.
    let id = md5(Date.now().toString());
    store.set(id, { '_id': id, 'name': filename, 'level': 'user', 'content': content });
    return res.status(200);
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});