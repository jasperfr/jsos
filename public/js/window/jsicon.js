class JSIcon extends Component {

    constructor(id, name, type, icon, path) {
        super(id, 'JSIcon', $(`
        <div class="desktop-icon js-icon">
            <img src="img/types/32/${icon ? icon : type}.png">
            <img src="img/types/32/${type == 'shortcut' ? 'shortcut' : 'none'}.png" style="position:absolute;">
            <span>${name}</span>
        </div>`));
        this.name = name;
        this.path = path;
        this.type = type;
        this.icon = icon;
        this.$element.css('position', 'static');
    }

    dblclick(func) { 
        this.$element.dblclick(func);
    }
}

function navigate(icon) {
    openDir(icon.path).then(data => {
    for(let item in data) {
      let icon = new JSIcon(
        Date.now().toString(),
        item,
        data[item].type,
        data[item].icon,
        data[item].path
      );
      icon.dblclick(() => navigate(icon));
      panel.add(icon);
    }
    panel.refresh();
  });
}