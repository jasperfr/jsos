class XIcon extends XComponent {
    file: XFile

    constructor(file: XFile) {
        super($(`
        <div class="xicon">
            <img src="img/types/32/${file.icon ? file.icon : file.type}.png">
            <img src="img/types/32/${file.type == 'shortcut' ? 'shortcut' : 'none'}.png" style="position:absolute;">
            <span>${file.name}</span>
        </div>`));

        this.$element.on('contextmenu', function(e) {
            console.log('oof')
            e.preventDefault();
            let el = XContextMenu.create(e, [
                { label: "Cut", icon: 'folder', 'click': function() { console.log('a'); } },
                { label: "Copy", icon: 'folder', 'click': function() { console.log('a'); } },
                { label: "Delete", icon: 'folder', 'click': function() { console.log('a'); } },
                "SPACER",
                { label: "Rename", icon: 'folder', 'click': function() { console.log('a'); } },
                "SPACER",
                { label: "Properties", icon: 'folder', 'click': function() { console.log('a'); } },
            ]);
            $(document.body).append(el);
            el.slideToggle('fast');
          });
    }
}