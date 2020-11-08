async function openDir(directoryTree) {
    return await $.get('open-directory', { 'directoryTree': directoryTree });
}

// debug function
function openDirectory(directoryTree) {
    openDir(directoryTree).then(function(data) {
        console.log(data);
    });
}

/*
function exec(file) {
    $.get('open-file', { 'filename': file }, function (data) {
        eval(atob(data.content));
    });
}
*/

// file has a type
// check MIME.json for types
// then execute that file associated
// using this file's content as argument???

// only used for starting executables (.exes).
function startApplication(path) {
    $.get('get-file', { 'path' : path }).then(file => {
        eval(atob(file.content));
    })
}

function startFromConsole(path) {
    $.get('get-file', { 'path' : path }).then(file => {
        console.log('File is ' + file);
        console.log('File extension is ' + file.type);
        console.log('Getting MIME extension for this file...');
        $.get('get-mime-ext', { 'type' : file.type }).then(mime => {
            console.log(mime);
            console.log('Getting this file from the drive...');
            $.get('get-file', { 'path': mime }).then(executable => {
                console.log('File is ' + executable);
                console.log('File content is ' + executable.content);
                let code = `const args=["${file.path}"]; ${atob(executable.content)}`;
                console.log(`Code should now be executed as: ${code}`);
                eval(code);
            });
        });
    });
}

// when you click on a program icon? hmmm
// Test.txt -> ext = "txt", will call [txt => notepad] using icon.data??? uh
function startFromIcon(icon) {
    $.get('get-mime-association', { 'type' : icon.type }).then(program => {
        let data = `const args = [${args.split(' ').join(',')}]; ${program.content}`;
        eval(data);
    });
}

// Start from the console
// kinda like notepad Test.txt
// jesus this is hard my brain ugh...
function start(program, args) {
    $.get('get-program', { 'path': program }).then(program => {

    });
}

// TODO move this
class Icon {
    constructor(name, type, icon, shortcut) {
        this.name = name;
        this.type = type;
        this.icon = icon;
        this.shortcut = type == 'shortcut';
        this.$element = $(`
            <div class="desktop-icon">
                <img src="img/types/32/${this.icon ? icon : type}.png">
                <img src="img/types/32/${this.shortcut ? 'shortcut' : 'none'}.png" style="position:absolute;">
                <span>${name}</span>
            </div>
        `).draggable();
    }
}

const desktopName = "My Computer/C:/Desktop/";
function createDesktop() {
    openDir(desktopName).then(data => {
        for(let item in data) {
            let icon = new Icon(item, data[item].type, data[item].icon, data[item].type == "shortcut");
            $('#desktop').append(icon.$element);
        }
    });
}

// Document ready functions
$(() => createDesktop());