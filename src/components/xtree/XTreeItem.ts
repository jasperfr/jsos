class XTreeItem extends XComponent {
    icon: string
    xtree: XComponent
    
    constructor(xtree: XComponent, name: string, icon?: string, isFile?: boolean) {
        super($(`<div class="xtree-item">
            <div class="xtree-item-wrapper">
                ${!isFile ? '<div class="xtree-button close"></div>' : '<div class="xtree-horizontal-spacer"></div>'}
                <img class="xtree-icon" src="img/types/16/${icon}.png" alt="">
                <label class="xtree-label">${name}</label>
            </div>
            <div class="xtree-item-subtree"></div>
        </div>`));

        this.icon = icon;
        this.xtree = xtree;

        let self: XTreeItem = this;
        this.$element.find('.xtree-button').on('click', function() {
            $(this).toggleClass('open');
            $(this).toggleClass('close');
            let parent = $(this).parent().parent();
            parent.find('.xtree-item-subtree').first().toggle();

            if(self.icon.startsWith('folder')) {
                this.icon = this.icon == 'folder-open' ? 'folder-closed' : 'folder-open';
                parent.find('.xtree-item-wrapper .xtree-icon').first().attr('src', `img/types/16/${this.icon}.png`);
            }
        });
    }

    /**
     * Create a new subtree inside the subtree.
     */
    addTree(name: string, icon: string, isFile: boolean): XTreeItem {
        let submenu = new XTreeItem(this, name, icon, isFile);
        this.$element.find('.xtree-item-subtree').first().append(submenu.$element);
        submenu.$element.css('margin-left', '16px');
        return submenu;
    }
}