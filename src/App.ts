async function openFile(path: string) {
    return $.get(`http://localhost:1337/file?path=${path}`);
}

async function newFile(path: string, type: string) {
    return $.post(`http://localhost:1337/touch?path=${path}&type=${type}`);
}

async function makeFolder(path: string) {
    return $.post(`http://localhost:1337/makedir?path=${path}`)
        .then(data => console.log(data));
}

// Get a folder from the server
async function getFolder(path: string) {
    return $.get(`http://localhost:1337/directory?path=${path}`)
    .then(function(data: Array<any>) {
        let files: Array<XFile> = [];
        for(let obj of data) {
            files.push(new XFile(obj.name, obj.path, obj.type, obj.icon));
        }
        return files;
    });
}

// Get a file from the server
async function getFile(path: string) {
    return $.get(`http://localhost:1337/file?path=${path}`)
    .then(function(data: string) {
        return atob(data);
    });
}