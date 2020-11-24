// TODO make a submenu

type ContextMenuItems = Record<string, Function>

const XContextMenu = (function() {

    var $element, create, mouseInside, initialize;

    initialize = function() {
        $(document.body).on('mouseup', () => {
            if(!mouseInside && $element) {
                $element.remove();
                $element = undefined;
            }
        });
    }

    create = function(e: MouseEvent, data: ContextMenuItems) {
        if($element !== undefined) return false;
        if(!$element) $element = $('<div class="x-contextmenu">').contextmenu(e => e.preventDefault())
        $element.hide();
        $element.on('hover', () => mouseInside = true, () => mouseInside = false);

        let $list = $('<ul>');
        data.forEach(obj => {
            switch(typeof obj) {
                case "object":
                let $el = $(`<li class="x-contextmenuitem ${obj.disabled?'disabled':''}">${obj.label}</li>`);
                $el.on('click', obj.click);
                $list.append($el);
                break;
                case "string":
                $list.append($('<li class="spacer"></li>'))
                break;
            }
        });

        $element.css('left', `${e.clientX}px`);
        $element.css('top', `${e.clientY}px`);
        $element.append($list);
        return $element;
    }

    return {
        create: create,
        initialize: initialize
    }
    
})();

$(() => {
    XContextMenu.initialize();
});