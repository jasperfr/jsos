class XTree extends XComponent {
    
    constructor() {
        super($(`<div class="xtree"></div>`));
    }

    /**
     * Create a new subtree directly in the XTree.
     */
    addTree(name: string, icon: string): XTreeItem {
        let submenu = new XTreeItem(this, name, icon);
        this.$element.append(submenu.$element);
        return submenu;
    }
}