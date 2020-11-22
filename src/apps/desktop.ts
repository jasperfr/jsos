$(() => {
    let $desktop = $('#desktop');
    getFolder('My Computer/C:/Desktop').then(data => {
        for(let file of data) {
            let icon = new XIcon(file);
            icon.css({'color': 'white'});
            $desktop.append(icon.start());
        }
    });
});