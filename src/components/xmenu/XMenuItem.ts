class XMenuItem extends XComponent {
    constructor(type: XMenuType = XMenuType.TEXT, label:string = "", icon:string="") {
        super($(`<div class="xmenu-item"><div>`));

        switch(type) {
            case XMenuType.ICON:
                this.$element.append($(`<img src="${icon}.png" alt="">`));
                break;
            case XMenuType.TEXT:
                this.$element.append($(`<span>${label}</span>`));
                break;
            case XMenuType.ICON_TEXT:
                this.$element.append($(`<img src="${icon}.png" alt="">`));
                this.$element.append($(`<span>${label}</span>`));
                break;
            case XMenuType.TEXT_ICON:
                this.$element.append($(`<span>${label}</span>`));
                this.$element.append($(`<img src="${icon}.png" alt="">`));
                break;
            case XMenuType.LARGE_ICON_TEXT:
                this.$element.addClass('large-icon');
                this.$element.append($(`<img src="img/${icon}.png" alt="">`));
                this.$element.append($(`<span>${label}</span>`));
                break;
        }
    }
}