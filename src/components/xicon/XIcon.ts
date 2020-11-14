class XIcon extends XComponent {
    file: XFile

    constructor(file: XFile) {
        super($(`
        <div class="xicon">
            <img src="img/types/32/${file.icon ? file.icon : file.type}.png">
            <img src="img/types/32/${file.type == 'shortcut' ? 'shortcut' : 'none'}.png" style="position:absolute;">
            <span>${file.name}</span>
        </div>`));
    }
}