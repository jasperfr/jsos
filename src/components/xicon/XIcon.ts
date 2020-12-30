class XIcon extends XComponent {
    file: XFile

    constructor(file: XFile) {
        super($(`
        <div class="xicon">
            <img src="img/types/32/${file.icon ? file.icon : file.type}.png">
            <img src="img/types/32/${file.type == 'shortcut' ? 'shortcut' : 'none'}.png" style="position:absolute;">
            <span>${file.name}</span>
        </div>`));

        this.file = file;
        let self = this;

        this.$element.on('contextmenu', function(e) {
            console.log('B');
            e.preventDefault();
            e.stopPropagation();
            let arr: Array<any> = [];
            switch(self.file.type) {
                case "js":
                    arr.push({ label: "Run", icon: "folder", "click": function() {
                        alert('try to run this file.')
                    }})
                case "txt":
                    arr.push({ label: "Edit", icon: "folder", "click": function() {
                        alert('try to edit this file.')
                    }})
                    arr.push("SPACER");
                    break;
            }
            arr = arr.concat([
                { label: "Cut", icon: 'folder', 'click': function() { console.log('a'); } },
                { label: "Copy", icon: 'folder', 'click': function() { console.log('a'); } },
                { label: "Delete", icon: 'folder', 'click': function() { console.log('a'); } },
                "SPACER",
                { label: "Rename", icon: 'folder', 'click': function() { console.log('a'); } },
                "SPACER",
                { label: "Properties", icon: 'folder', 'click': function() { console.log('a'); } },
            ]);

            XContextMenu.create(e, arr);
          });
    }
}